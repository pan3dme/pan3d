//
//  MtlModelDisplaySprite.m
//  iosgl
//
//  Created by pan3dme on 2021/1/24.
//  Copyright © 2021 zhao. All rights reserved.
//

#import "MtlModelDisplaySprite.h"
#import "MtlModelDisplayShader.h"
#import "MtlModelDisplayType.h"
#import "ObjData.h"
#import "BuildSceneVo.h"
#import "ObjDataManager.h"

@interface MtlModelDisplaySprite ()

@property(nonatomic,strong)BuildSceneVo* buildSceneVo;
@property (nonatomic, strong) id<MTLTexture> texture;
@property (nonatomic, strong) MtlModelDisplayShader* rotationShaderA;
  
@end

@implementation MtlModelDisplaySprite
- (instancetype)init:(MtkScene3D*)val
{
    self = [super init];
    if (self) {
        self.mtkScene3D=val;
        [self customInit];
    }
    return self;
}
- (void)customInit {
    self.rotationShaderA=[[MtlModelDisplayShader alloc] init:self.mtkScene3D];
    [self.rotationShaderA encode];
    
 
 
}
-(void) setInfo:(NSDictionary*)value;
{
    self.buildSceneVo=[[BuildSceneVo alloc]init];
    [self.buildSceneVo preshValue:value];
    self.x=self.buildSceneVo.x;
    self.y=self.buildSceneVo.y;
    self.z=self.buildSceneVo.z;
    self.scaleX=self.buildSceneVo.scaleX;
    self.scaleY=self.buildSceneVo.scaleY;
    self.scaleZ=self.buildSceneVo.scaleZ;
    self.rotationX=self.buildSceneVo.rotationX;
    self.rotationY=self.buildSceneVo.rotationY;
    self.rotationZ=self.buildSceneVo.rotationZ;
 
    
    [self setObjUrl:self.buildSceneVo.objsurl];
}
-(void)setObjUrl:(NSString*)value;
{
  
    [[ObjDataManager default]getObjData:value fun:^(ObjData * obj) {
        
    
        [self changeObjData:obj];
        
        
    }];
}
-(void)changeObjData:(ObjData*)value;
{
    ModelVertex quarr[value.vertices.count/3];
    int idxs[value.indexs.count];
    for (int i=0; i<value.vertices.count/3; i++) {
        Vector3D* pos=  [[Vector3D alloc]x:[value.vertices[i*3+0] floatValue] y:[value.vertices[i*3+1] floatValue] z:[value.vertices[i*3+2] floatValue]];
        Vector3D* color=  [[Vector3D alloc]x:1 y:0 z:0];
        quarr[i]=(ModelVertex){{pos.x,pos.y,pos.z,1},      (vector_float3){color.x,color.y,color.z},       {0.0f, 1.0f}};
   
    }
    for (int i=0; i<value.indexs.count ; i++) {
        idxs[i]=[value.indexs[i] intValue];
    }
    value.mtkvertices = [self.mtkScene3D.mtkView.device newBufferWithBytes:quarr
                                                 length:sizeof(quarr)
                                                options:MTLResourceStorageModeShared];

    value.mtkindexs = [self.mtkScene3D.mtkView.device newBufferWithBytes:idxs
                                                     length:sizeof(idxs)
                                                    options:MTLResourceStorageModeShared];
    value.mtkindexCount = value.indexs.count;
    self.objData=value;
}

 

- (void)setupMatrixWithEncoder:(id<MTLRenderCommandEncoder>)renderEncoder {
   
   
   static float y = 0.0 ;
   y+=10;
   Matrix3D* posMatrix =[[Matrix3D alloc]init];
   [posMatrix appendScale:0.5 y:0.5 z:0.5];
   [posMatrix appendRotation:y axis:Vector3D.Y_AXIS];

    
 
    
    ModelMatrixView matrix = {[self.mtkScene3D.camera3D.modelMatrix getMatrixFloat4x4], [posMatrix getMatrixFloat4x4]};
  
   [renderEncoder setVertexBytes:&matrix
                          length:sizeof(matrix)
                         atIndex:1];
}
-(void)updata  {
    if(self.objData==nil){
        return;
    }
   
   id<MTLRenderCommandEncoder> renderEncoder=self.mtkScene3D.context3D.renderEncoder;
    
   [self.rotationShaderA setProgramShader];
   
   [self setupMatrixWithEncoder:renderEncoder];
   
   [renderEncoder setVertexBuffer: self.objData.mtkvertices
                           offset:0
                          atIndex:0];
   
   [renderEncoder setFragmentTexture:self.texture
                             atIndex:0];
   
   [renderEncoder drawIndexedPrimitives:MTLPrimitiveTypeTriangle
                             indexCount: self.objData.mtkindexCount
                              indexType:MTLIndexTypeUInt32
                            indexBuffer: self.objData.mtkindexs
                      indexBufferOffset:0];
}

@end
