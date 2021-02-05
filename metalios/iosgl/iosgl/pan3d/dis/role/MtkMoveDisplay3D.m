//
//  MtkMoveDisplay3D.m
//  iosgl
//
//  Created by pan3dme on 2021/2/2.
//  Copyright © 2021 zhao. All rights reserved.
//

#import "MtkMoveDisplay3D.h"
#import "MtkMoveDisplayShader.h"
#import "MeshDataManager.h"
#import "SkinMesh.h"
#import "AnimData.h"
#import "DualQuatFloat32Array.h"
#import "MtlMoveDisplayType.h"

@interface MtkMoveDisplay3D ()

@property (nonatomic, strong) NSMutableArray<Vector3D *>*  linePointArr;
@property (nonatomic, strong) id<MTLTexture> texture;
@property (nonatomic, strong) MtkMoveDisplayShader* mtkMoveDisplayShader;
  
@end
@implementation MtkMoveDisplay3D
- (instancetype)init:(Scene3D*)value
{
    self = [super init:value];
    if (self) {
        [self customInit];
    }
    return self;
}
- (void)customInit {
    self.mtkMoveDisplayShader=[[MtkMoveDisplayShader alloc] init:self.mtkScene3D];
    [self.mtkMoveDisplayShader mtlEncode];
    
    self.objData=[[ObjData alloc] init:self.mtkScene3D];
 
    
    
    [self clearLine];
    self.colorV3d=[[Vector3D alloc]x:1 y:0 z:0];
    [self addLineA2B:[[Vector3D alloc]x:0 y:0 z:0] b:[[Vector3D alloc]x:100 y:0 z:0]];
    [self addLineA2B:[[Vector3D alloc]x:100 y:0 z:0] b:[[Vector3D alloc]x:100 y:0 z:100]];
    [self refrishLineDataToGpu];
  
    
    [self makeGridLine];
    
    [self setRoleUrl:getRoleUrl(@"50001")];
    
}
-(void)updateMaterialMesh:(MeshData*)mesh;
{
    MtkMoveDisplay3D* this=self;
    if (!mesh.material) {
        return;
    }
    self.objData=mesh;
    
    id<MTLRenderCommandEncoder> renderEncoder=this.mtkScene3D.context3D.renderEncoder;
     
    [self.mtkMoveDisplayShader mtlSetProgramShader];
    
    [self setupMatrixWithEncoder:renderEncoder];
    
    [renderEncoder setVertexBuffer: this.objData.mtkvertices
                            offset:0
                           atIndex:0];
     
    
    [renderEncoder drawIndexedPrimitives:MTLPrimitiveTypeTriangle
                              indexCount: this.objData.mtkindexCount
                               indexType:MTLIndexTypeUInt32
                             indexBuffer: this.objData.mtkindexs
                       indexBufferOffset:0];
    

    
}
-(void)setVaCompress:(MeshData*)mesh;
{
    Display3dMovie* this=self;
    
    Context3D *ctx=this.mtkScene3D.context3D;
    [ctx pushVa:mesh.verticesBuffer];
    [ctx setVaOffset:this.shader3d name:"pos" dataWidth:3 stride:0 offset:0];
    [ctx pushVa:    mesh.uvBuffer];
    [ctx setVaOffset:this.shader3d name:"v2Uv" dataWidth:2 stride:0 offset:0];
    [ctx pushVa: mesh.boneIdBuffer];
    [ctx setVaOffset:this.shader3d name:"boneID" dataWidth:4 stride:0 offset:0];
    [ctx pushVa: mesh.boneWeightBuffer];
    [ctx setVaOffset:this.shader3d name:"boneWeight" dataWidth:4 stride:0 offset:0];
  
    
}
-(void)setMeshVc:(MeshData*)mesh;
{
    MtkMoveDisplay3D* this=self;
    Context3D *context3D=self.mtkScene3D.context3D;
    AnimData* animData;
    if (this.animDic[this.curentAction]) {
        animData = this.animDic[this.curentAction];
    } else if (this.animDic[this.defaultAction]) {
        animData = this.animDic[this.defaultAction];
    } else {
        return;
    }
    DualQuatFloat32Array* dualQuatFrame = animData.boneQPAry[mesh.uid][0];
    GLfloat boneQarr[dualQuatFrame.quatArr.count];
    for (int i=0; i<dualQuatFrame.quatArr.count; i++) {
        boneQarr[i]=dualQuatFrame.quatArr[i].floatValue;
    }
    GLfloat boneDarr[dualQuatFrame.posArr.count];
    for (int i=0; i<dualQuatFrame.posArr.count; i++) {
        boneDarr[i]=dualQuatFrame.posArr[i].floatValue;
    }
    [context3D setVc4fv:self.shader3d name:"boneQ" data:boneQarr len:54];
    [context3D setVc3fv:self.shader3d name:"boneD" data:boneDarr len:54];
    
}
 
 
-(void)makeGridLine;
{
     [self clearLine];
    float w=30;
    float n=30;
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
        VertexRoleLine quarr[self.linePointArr.count];
        int idxs[self.linePointArr.count];
        for (int i=0; i<self.linePointArr.count/2; i++) {
            Vector3D* pos=  self.linePointArr[i*2+0];
            Vector3D* color=  self.linePointArr[i*2+1];
            quarr[i]=(VertexRoleLine){{pos.x,pos.y,pos.z} };
       
        }
        for (int i=0; i<self.linePointArr.count ; i++) {
            idxs[i]=i;
        }
        
        self.objData.mtkvertices = [self.mtkScene3D.mtkView.device newBufferWithBytes:quarr
                                                     length:sizeof(quarr)
                                                    options:MTLResourceStorageModeShared];
   
        self.objData.mtkindexs = [self.mtkScene3D.mtkView.device newBufferWithBytes:idxs
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
 
    
    LineMatrixRoleView matrix = {[self.mtkScene3D.camera3D.modelMatrix getMatrixFloat4x4], [posMatrix getMatrixFloat4x4]};
  
   [renderEncoder setVertexBytes:&matrix
                          length:sizeof(matrix)
                         atIndex:1];
}
-(void)upTrice
{
    if( !self.objData||!self.objData.compressBuffer){
        return;
    }
   
   id<MTLRenderCommandEncoder> renderEncoder=self.mtkScene3D.context3D.renderEncoder;
    
   [self.mtkMoveDisplayShader mtlSetProgramShader];
   
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
-(void)updata  {
 
    
//    [self upTrice];
    [self upFrame];
}
- (void)upFrame
{
    [super upFrame];
    
}
 

@end

