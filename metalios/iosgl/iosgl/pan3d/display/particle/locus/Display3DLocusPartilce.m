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
//      [super update];
    
    NSLog(@"规矩被屏蔽")
}
- (void)setVc;
{
    [self setViewCamModeMatr3d];
    
     
    Camera3D* cam3D=self.scene3D.camera3D;
    [self updateUV];
    Vector3D*  scaleVec =   self.locusdata._resultUvVec;
 
    Vector3D*  caramPosVec = [[Vector3D alloc]x:cam3D.x y:cam3D.y z:cam3D.z];
    if (self.data._watchEye) {
 
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
-(NSUInteger)getFcDataIdx;
{
    return 2; //FC数据的位置，不同特效不一样
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
 
    ObjData* temp=self.particleGpuObjData;
    
 
  
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

