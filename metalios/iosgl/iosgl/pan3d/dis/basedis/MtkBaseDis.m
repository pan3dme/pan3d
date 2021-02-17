//
//  MtkBaseLine.m
//  iosgl
//
//  Created by pan3dme on 2021/1/23.
//  Copyright © 2021 zhao. All rights reserved.
//

#import "MtkBaseDis.h"
 
#import "MtkBaseDisShader.h"
 
#import "MtlBaseDisType.h"
 
@interface MtkBaseDis ()

@property (nonatomic, strong) NSMutableArray<Vector3D *>*  linePointArr;
@property (nonatomic, strong) id<MTLTexture> texture;
@property (nonatomic, strong) MtkBaseDisShader* mtkBaseLineShader;
  
@end

@implementation MtkBaseDis
- (instancetype)init:(Scene3D*)value
{
    self = [super init:value];
    if (self) {
        [self customInit];
    }
    return self;
}
- (void)customInit {
    self.mtkBaseLineShader=[[MtkBaseDisShader alloc] init:self.scene3D];
    [self.mtkBaseLineShader mtlEncode];
    
    self.objData=[[ObjData alloc] init:self.scene3D];
 
    
    
    [self clearLine];
    self.colorV3d=[[Vector3D alloc]x:1 y:0 z:0];
    [self addLineA2B:[[Vector3D alloc]x:0 y:0 z:0] b:[[Vector3D alloc]x:100 y:0 z:0]];
    [self addLineA2B:[[Vector3D alloc]x:100 y:0 z:0] b:[[Vector3D alloc]x:100 y:0 z:100]];
    [self refrishLineDataToGpu];
  
    
    [self makeGridLine];
    
}
-(void)makeGridLine;
{
    [self clearLine];
    float w=30;
    float n=10;
    float skeep=w/n;
    Vector3D* a;
    Vector3D* b;
    
    a=[[Vector3D alloc]x:0 y:0 z:+w];
    b=[[Vector3D alloc]x:0 y:0 z:-w];
    self.colorV3d = [[Vector3D alloc]x:0 y:0 z:1];
    [self addLineA2B:a b:b];
    a=[[Vector3D alloc]x:+w y:0 z:0];
    b=[[Vector3D alloc]x:-w y:0 z:0];
    self.colorV3d = [[Vector3D alloc]x:1 y:0 z:0];
    [self addLineA2B:a b:b];
    
    self.colorV3d = [[Vector3D alloc]x:128.0f / 255.0f y:128.0f / 255.0f z:128.0f / 255.0f];
    for (int i = 1; i <= n; i++) {
        
        a=[[Vector3D alloc]x:+i * skeep y:0 z:+w];
        b=[[Vector3D alloc]x:+i * skeep y:0 z:-w];
        [self addLineA2B:a b:b];
        a=[[Vector3D alloc]x:-i * skeep y:0 z:+w];
        b=[[Vector3D alloc]x:-i * skeep y:0 z:-w];
        [self addLineA2B:a b:b];
        
        a=[[Vector3D alloc]x:+w y:0 z:+i * skeep];
        b=[[Vector3D alloc]x:-w y:0 z:+i * skeep];
        [self addLineA2B:a b:b];
        a=[[Vector3D alloc]x:+w y:0 z:-i * skeep];
        b=[[Vector3D alloc]x:-w y:0 z:-i * skeep];
        [self addLineA2B:a b:b];
    }
    [self refrishLineDataToGpu];
}
-(void)clearLine;
{
    if(self.linePointArr&&self.linePointArr.count){
        [self.linePointArr removeAllObjects];
        self.objData.compressBuffer=false;
    }
}
-(void)addLineA2B:(Vector3D*)a b:(Vector3D*)b color:(Vector3D*)color;
{
    self.colorV3d=color;
    [self addLineA2B:a b:b];
}
-(void)addLineA2B:(Vector3D*)a b:(Vector3D*)b;
{
    if(!self.linePointArr ){
        self.linePointArr  =[[NSMutableArray alloc]init];
    }
    [self.linePointArr addObject:a];
    [self.linePointArr addObject:[[Vector3D alloc]x:self.colorV3d.x y:self.colorV3d.y z:self.colorV3d.z]];
    [self.linePointArr addObject:b];
    [self.linePointArr addObject:[[Vector3D alloc]x:self.colorV3d.x y:self.colorV3d.y z:self.colorV3d.z]];
}
-(void)refrishLineDataToGpu;
{
    if(self.linePointArr&&self.linePointArr.count){
        VertexDis quarr[self.linePointArr.count];
        int idxs[self.linePointArr.count];
        for (int i=0; i<self.linePointArr.count/2; i++) {
            Vector3D* pos=  self.linePointArr[i*2+0];
            Vector3D* color=  self.linePointArr[i*2+1];
            quarr[i]=(VertexDis){{pos.x,pos.y,pos.z,1},      (vector_float3){color.x,color.y,color.z},       {0.0f, 1.0f}};
       
        }
        for (int i=0; i<self.linePointArr.count ; i++) {
            idxs[i]=i;
        }
        
        self.objData.mtkvertices = [self.scene3D.mtkView.device newBufferWithBytes:quarr
                                                     length:sizeof(quarr)
                                                    options:MTLResourceStorageModeShared];
   
        self.objData.mtkindexs = [self.scene3D.mtkView.device newBufferWithBytes:idxs
                                                         length:sizeof(idxs)
                                                        options:MTLResourceStorageModeShared];
        self.objData.mtkindexCount = self.linePointArr.count/2;
        
        self.objData.compressBuffer=YES;
    }
    
  

}
- (void)setupMatrixWithEncoder:(id<MTLRenderCommandEncoder>)renderEncoder {
   
   
   static float y = 0.0 ;
//   y-=0.05;
   Matrix3D* posMatrix =[[Matrix3D alloc]init];
   [posMatrix appendScale:1 y:1 z:1];
   [posMatrix appendRotation:y axis:Vector3D.Y_AXIS];
 
    
    DisMatrixView matrix = {[self.scene3D.camera3D.modelMatrix getMatrixFloat4x4], [posMatrix getMatrixFloat4x4]};
  
   [renderEncoder setVertexBytes:&matrix
                          length:sizeof(matrix)
                         atIndex:1];
}
-(void)upFrame  {
    if( !self.objData||!self.objData.compressBuffer){
        return;
    }
   
   id<MTLRenderCommandEncoder> renderEncoder=self.scene3D.context3D.renderEncoder;
    
   [self.mtkBaseLineShader mtlSetProgramShader];
   
   [self setupMatrixWithEncoder:renderEncoder];
   
   [renderEncoder setVertexBuffer: self.objData.mtkvertices
                           offset:0
                          atIndex:0];
   
   [renderEncoder setFragmentTexture:self.texture
                             atIndex:0];
   
   [renderEncoder drawIndexedPrimitives:MTLPrimitiveTypeLine
                             indexCount: self.objData.mtkindexCount
                              indexType:MTLIndexTypeUInt32
                            indexBuffer: self.objData.mtkindexs
                      indexBufferOffset:0];
}

@end
