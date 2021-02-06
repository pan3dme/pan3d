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
    
//    [self setRoleUrl:getRoleUrl(@"50001")];
    [self setRoleUrl:getRoleUrl(@"yezhuz")];
    
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
    
    [self setMeshVcMtk:mesh redEncoder:renderEncoder];
    
    [renderEncoder setVertexBuffer: mesh.mtkvertices  offset:0  atIndex:1];
    [renderEncoder setVertexBuffer: mesh.mtkboneId  offset:0  atIndex:2];
    [renderEncoder setVertexBuffer: mesh.mtkboneWeight   offset:0   atIndex:3];
    
    
    [renderEncoder drawIndexedPrimitives:MTLPrimitiveTypeTriangle
                              indexCount: mesh.mtkindexCount
                               indexType:MTLIndexTypeUInt32
                             indexBuffer: mesh.mtkindexs
                       indexBufferOffset:0];
    
    
    
}
-(void)setVaCompress:(MeshData*)mesh;
{
  
    
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
-(void)setMeshVcMtk:(MeshData*)mesh redEncoder:(id<MTLRenderCommandEncoder>)renderEncoder
{
    MtkMoveDisplay3D* this=self;
 
    AnimData* animData;
    if (this.animDic[this.curentAction]) {
        animData = this.animDic[this.curentAction];
    } else if (this.animDic[this.defaultAction]) {
        animData = this.animDic[this.defaultAction];
    } else {
        return;
    }
    vector_float4 boneQ[54];
    vector_float3 boneD[54];
    DualQuatFloat32Array* dualQuatFrame = animData.boneQPAry[mesh.uid][0];
    for (int i=0; i<dualQuatFrame.quatArr.count/4; i++) {
        boneQ[i]=simd_make_float4(1,0,0,1 );
    }
    for (int i=0; i<dualQuatFrame.posArr.count/3; i++) {
        boneD[i]=simd_make_float3(1,1,1 );
    }

    BoneQDrole* _boneQDrole={boneQ,boneD};
 
    [renderEncoder setVertexBytes:&_boneQDrole
                           length:sizeof(_boneQDrole)
                          atIndex:4];
    
    
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

