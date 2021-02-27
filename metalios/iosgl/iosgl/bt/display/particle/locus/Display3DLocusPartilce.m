//
//  Display3DLocusPartilce.m
//  iosgl
//
//  Created by zhao on 25/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Display3DLocusPartilce.h"
#import "ParticleLocusData.h"
#import "Display3DLocusShader.h"
#import "Context3D.h"
#import "Scene3D.h"
#import "Scene_data.h"
#import "ProgrmaManager.h"
#import "Display3DSprite.h"
#import "ParticleMetalType.h"
 
@implementation Display3DLocusPartilce


-(ParticleLocusData*)locusdata;
{
    return (ParticleLocusData*)self.data;
}
-(ObjData*)particleGpuObjData;
{
    return self.locusdata.objData;
}
 
-(void)onCreated;
{
    
}
- (void)update;
{
      [super update];
}
- (void)setVc;
{
    [self setViewCamModeMatr3d];
    
     
    Camera3D* cam3D=self.scene3D.camera3D;
    [self updateUV];
    Vector3D*  scaleVec =   self.locusdata._resultUvVec;
//    [ctx setVcUniform4f:self.shader3d name:"vcmat30" x:scaleVec.x y:scaleVec.y z:scaleVec.z w:scaleVec.w];
    Vector3D*  caramPosVec = [[Vector3D alloc]x:cam3D.x y:cam3D.y z:cam3D.z];
    if (self.data._watchEye) {
       
//        [ctx setVcUniform4f:self.shader3d name:"vcmat31" x:caramPosVec.x y:caramPosVec.y z:caramPosVec.z w:caramPosVec.w];
    }
 
  
    id<MTLRenderCommandEncoder> renderEncoder=self.scene3D.context3D.renderEncoder;
    
 
    
    ParticleMetalLocusMatrixData matrixList = {[cam3D.viewMatrix getMatrixFloat4x4], [cam3D.camMatrix3D getMatrixFloat4x4], [self.modeMatrix getMatrixFloat4x4]};
  
   [renderEncoder setVertexBytes:&matrixList
                          length:sizeof(matrixList)
                         atIndex:3];
    
    ParticleMetalLocusVcmatData VcmatData = { (vector_float4){scaleVec.x,scaleVec.y,scaleVec.z,scaleVec.w} ,(vector_float4){caramPosVec.x,caramPosVec.y,caramPosVec.z,caramPosVec.w}};
     
   [renderEncoder setVertexBytes:&VcmatData
                          length:sizeof(VcmatData)
                         atIndex:4];
    
    
}
-(void)updateUV;
{
  
    float nowTime=self._time/[Scene_data default].frameTime;
    float  lifeRoundNum=self.data._life / 100.0f;
    float moveUv = self.locusdata._speed * nowTime / self.locusdata._density / 10.0f;
    if (self.locusdata._isEnd) {
        moveUv = MIN(1, moveUv);
    }
    if (self.locusdata._isLoop) {
        if (self.locusdata._life) {
            moveUv = moveUv- ceilf(moveUv/(lifeRoundNum+1))*(lifeRoundNum+1) ;
        } else {
            moveUv = moveUv- ceilf(moveUv/1)*1 ;
        }
    }
    self.locusdata._resultUvVec.x = moveUv;
    
}
- (void)setVa;
{
//    Context3D *ctx=self.scene3D.context3D;
    ObjData* temp=self.particleGpuObjData;
    
//    [ctx pushVa: temp.verticesBuffer];
//    [ctx setVaOffset:self.shader3d name:"v3Position" dataWidth:3 stride:0 offset:0];
//    [ctx pushVa:temp.uvBuffer];
//    [ctx setVaOffset:self.shader3d name:"v2TexCoord" dataWidth:2 stride:0 offset:0];
//    [ctx pushVa: temp.nrmsBuffer];
//    [ctx setVaOffset:self.shader3d name:"v3Normal" dataWidth:4 stride:0 offset:0];
//    [ctx drawCall:temp.indexBuffer  numTril:temp.trinum];
  
    id<MTLRenderCommandEncoder> renderEncoder=self.scene3D.context3D.renderEncoder;
    
    
     [renderEncoder setVertexBuffer: temp.mtkvertices
                             offset:0
                            atIndex:0];
    [renderEncoder setVertexBuffer: temp.mtkuvs
                            offset:0
                           atIndex:1];
    [renderEncoder setVertexBuffer: temp.mtknrms
                            offset:0
                           atIndex:2];
    
    
    
   [renderEncoder drawIndexedPrimitives:MTLPrimitiveTypeTriangle
                             indexCount: temp.mtkindexCount
                              indexType:MTLIndexTypeUInt32
                            indexBuffer: temp.mtkindexs
                      indexBufferOffset:0];
    


}
- (void)resetVa;
{
      Context3D *ctx=self.scene3D.context3D;
    [ctx clearVa:0];
    [ctx clearVa:1];
    [ctx clearVa:2];
}
@end

