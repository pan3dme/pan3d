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
    
  
    [self setRoleUrl:getRoleUrl(@"yezhuz")];
    
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
                        atIndex:0];
}
-(void)updateMaterialMesh:(MeshData*)mesh;
{
    MtkMoveDisplay3D* this=self;
    if (!mesh.material) {
        return;
    }
 
    
    id<MTLRenderCommandEncoder> renderEncoder=this.mtkScene3D.context3D.renderEncoder;
     
    [self.mtkMoveDisplayShader mtlSetProgramShader];
    
    [self setupMatrixWithEncoder:renderEncoder];
    
    [renderEncoder setVertexBuffer: mesh.mtkvertices
                            offset:0
                           atIndex:1];
     
    
    [renderEncoder drawIndexedPrimitives:MTLPrimitiveTypeTriangle
                              indexCount: mesh.mtkindexCount
                               indexType:MTLIndexTypeUInt32
                             indexBuffer: mesh.mtkindexs
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
 
 
-(void)updata  {
 
    
//    [self upTrice];
    [self upFrame];
}
- (void)upFrame
{
    [super upFrame];
    
}
 

@end
