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
#import "DynamicTexItem.h"
#import "Scene_data.h"
#import "DualQuatFloat32Array.h"
#import "MtlMoveDisplayType.h"

@interface MtkMoveDisplay3D ()

@property (nonatomic, strong) NSMutableArray<Vector3D *>*  linePointArr;
@property (nonatomic, strong) id<MTLTexture> texture;
@property (nonatomic, strong) MtkMoveDisplayShader* mtkMoveDisplayShader;
@property(nonatomic,assign)int  curentFrame;

@end
@implementation MtkMoveDisplay3D
- (instancetype)init:(Scene3D*)value
{
    self = [super init:value];
    if (self) {
        self.curentFrame=0;
        [self customInit];
    }
    return self;
}
- (void)customInit {
    self.mtkMoveDisplayShader=[[MtkMoveDisplayShader alloc] init:self.mtkScene3D];
    [self.mtkMoveDisplayShader mtlEncode];
    
    [self setRoleUrl:getRoleUrl(@"50001")];
//    [self setRoleUrl:getRoleUrl(@"yezhuz")];
    
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
    
    [renderEncoder setCullMode:0];
    
    [self setMeshVcMtk:mesh redEncoder:renderEncoder];
    
    [renderEncoder setVertexBuffer: mesh.mtkvertices  offset:0  atIndex:1];
    [renderEncoder setVertexBuffer: mesh.mtkuvs  offset:0  atIndex:2];
    [renderEncoder setVertexBuffer: mesh.mtkboneId  offset:0  atIndex:3];
    [renderEncoder setVertexBuffer: mesh.mtkboneWeight   offset:0   atIndex:4];
    
    
    [this setMaterialTexture:mesh.material mp:mesh.materialParam];
    
    
    [renderEncoder drawIndexedPrimitives:MTLPrimitiveTypeTriangle
                              indexCount: mesh.mtkindexCount
                               indexType:MTLIndexTypeUInt32
                             indexBuffer: mesh.mtkindexs
                       indexBufferOffset:0];
    
 
    
    
}
-(void)setMaterialTexture:(Material*)material  mp:(MaterialBaseParam*)mp;
{
 
    NSArray<TexItem*>* texVec  = mp.material.texList;
    TexItem* texItem;
    for (int i   = 0; i < texVec.count; i++) {
        texItem=texVec[i];
        if (texItem.isDynamic) {
            continue;
        }
        if (texItem.type == TexItem.LIGHTMAP) {
        }
        else if (texItem.type == TexItem.LTUMAP && [Scene_data default].pubLut ) {
            NSLog(@"TexItem.LTUMAP)");
        }
        else if (texItem.type == TexItem.CUBEMAP) {
            if (material.useDynamicIBL) {// && _reflectionTextureVo) {
                NSLog(@"TexItem.useDynamicIBL)");
            } else {
                if([Scene_data default].skyCubeTexture){
                  
                }
            }
        }
        else if (texItem.type == 0) {
         
            
        }
    }
    NSArray<DynamicTexItem*>* texDynamicVec  =( NSArray<DynamicTexItem*>*) mp.dynamicTexList;
    for (int i   = 0; i < texDynamicVec.count; i++) {
        texItem=texDynamicVec[i].target;
        if(texItem ){
            
            if(texItem.isMain){
                id<MTLRenderCommandEncoder> renderEncoder=self.mtkScene3D.context3D.renderEncoder;
                [renderEncoder setFragmentTexture:texDynamicVec[i].textureRes.mtlTexture
                                          atIndex:0];
                
              
            }
 
            
        }
    }
    
}
-(void)setVaCompress:(MeshData*)mesh;
{
  
    
}
- (void)setupMatrixWithEncoder:(id<MTLRenderCommandEncoder>)renderEncoder {
    Matrix3D* posMatrix =[[Matrix3D alloc]init];
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

    if(self.curentFrame++>=animData.boneQPAry[mesh.uid].count-1){
        self.curentFrame=0;
    }

    DualQuatFloat32Array* dualQuatFrame = animData.boneQPAry[mesh.uid][self.curentFrame];
  
    
    [renderEncoder setVertexBuffer: dualQuatFrame.mtkquatArr   offset:0   atIndex:5];
    [renderEncoder setVertexBuffer: dualQuatFrame.mtkposArr   offset:0   atIndex:6];
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

