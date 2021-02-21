//
//  Display3DBallPartilce.m
//  iosgl
//  Created by zhao on 25/2/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Scene_data.h"
#import "Display3DBallPartilce.h"
#import "ObjData.h"
#import "ParticleData.h"
#import "ProgrmaManager.h"
#import "Display3DBallPartilceShader.h"
#import "ParticleBallGpuData.h"
#import "Context3D.h"
#import "ParticleBallData.h"
#import "MaterialManager.h"
#import "TextureRes.h"
#import "TimeUtil.h"
#import "Scene3D.h"
#import "DynamicTexItem.h"
#import "Camera3D.h"
#import "ParticleMetalType.h"
#import "MtkBaseDis.h"


@interface Display3DBallPartilce ()
@property (nonatomic, strong) ObjData* objData ;
@property (nonatomic, assign) GLuint  textBsetGLuint;
@property (nonatomic, strong) MtkBaseDis* mtkBaseDis;
@end
@implementation Display3DBallPartilce
-(void)onCreated;
{
}
- (instancetype)init:value
{
    self = [super init:value];
    if (self) {
        self.mtkBaseDis=[[MtkBaseDis alloc]init:self.scene3D];
 
    }
    return self;
}
- (void)update;
{
     [super update];
    [self upFrameCopy];
}
-(void)upFrameCopy  {
 
    if( !self.mtkBaseDis.objData||!self.mtkBaseDis.objData.compressBuffer||!self.shader3d){
        return;
    }
   
   id<MTLRenderCommandEncoder> renderEncoder=self.scene3D.context3D.renderEncoder;
    
    
    
   [self.shader3d mtlSetProgramShader];
   
 
   
    [renderEncoder setVertexBuffer: self.particleBallGpuData.mtkvertices
                            offset:0
                           atIndex:0];
    
    [renderEncoder setVertexBuffer: self.particleBallGpuData.mtkbasePos
                            offset:0
                           atIndex:1];
    [renderEncoder setVertexBuffer: self.particleBallGpuData.mtkspeed
                            offset:0
                           atIndex:2];
    
    [renderEncoder setVertexBuffer: self.particleBallGpuData.mtkuvs
                            offset:0
                           atIndex:3];
    
    if (self.ballData._needSelfRotation) {
        [renderEncoder setVertexBuffer: self.particleBallGpuData.mtkbaseRotation
                                offset:0
                               atIndex:6]; //需要处理排序
    }
    
 
 
   
   [renderEncoder drawIndexedPrimitives:MTLPrimitiveTypeTriangle
                             indexCount: self.particleBallGpuData.mtkindexCount
                              indexType:MTLIndexTypeUInt32
                            indexBuffer: self.particleBallGpuData.mtkindexs
                      indexBufferOffset:0];
}
 
-(void)setViewCamModeMatr3d;
{
 
    Camera3D* cam3D=self.scene3D.camera3D;
     
 

    id<MTLRenderCommandEncoder> renderEncoder=self.scene3D.context3D.renderEncoder;
    
 
    
    ParticleMetalBallMatrixData matrixList = {[cam3D.viewMatrix getMatrixFloat4x4], [cam3D.camMatrix3D getMatrixFloat4x4], [self.modeMatrix getMatrixFloat4x4],[self.rotationMatrix3D getMatrixFloat4x4]};
  
   [renderEncoder setVertexBytes:&matrixList
                          length:sizeof(matrixList)
                         atIndex:4];
    

    
 
   
    

}

-(void)setVc;
{
    [self updateWatchCaramMatrix];
    [self setViewCamModeMatr3d];
    Context3D *ctx=self.scene3D.context3D;
    
    [ctx setVcMatrix4fv:self.shader3d name:"rotMatrix" data:self.rotationMatrix3D.m];
    
    Vector3D*  timeVec =   self.ballData._timeVec;
    timeVec.x=self._time/[Scene_data default].frameTime*self.ballData._playSpeed;
    
    [ctx setVcUniform4f:self.shader3d name:"vcmat50" x:timeVec.x y:timeVec.y z:timeVec.z w:timeVec.w];
    Vector3D*  scaleVec =   self.ballData._scaleVec;
    [ctx setVcUniform4f:self.shader3d name:"vcmat51" x:scaleVec.x y:scaleVec.y z:scaleVec.z w:scaleVec.w];
    Vector3D*  scaleCtrl =   self.ballData._scaleCtrlVec;
    [ctx setVcUniform4f:self.shader3d name:"vcmat52" x:scaleCtrl.x y:scaleCtrl.y z:scaleCtrl.z w:scaleCtrl.w];
    Vector3D*   addSpeedVec =   self.ballData._addSpeedVec;
    [ctx setVcUniform4f:self.shader3d name:"vcmat53" x:addSpeedVec.x y:addSpeedVec.y z:addSpeedVec.z w:addSpeedVec.w];
    
    if(self.ballData._is3Dlizi){
       // NSLog(@"_is3Dlizi");
    }
 
    ParticleMetalBallVcmatData matrixList = { (vector_float4){timeVec.x,timeVec.y,timeVec.z,timeVec.w},(vector_float4){scaleVec.x,scaleVec.y,scaleVec.z,scaleVec.w},(vector_float4){scaleCtrl.x,scaleCtrl.y,scaleCtrl.z,scaleCtrl.w},(vector_float4){addSpeedVec.x,addSpeedVec.y,addSpeedVec.z,addSpeedVec.w}};
    
    
    id<MTLRenderCommandEncoder> renderEncoder=self.scene3D.context3D.renderEncoder;
 
   [renderEncoder setVertexBytes:&matrixList
                          length:sizeof(matrixList)
                         atIndex:5];
   
}
 
-(void)setVa;
{
    
    Context3D *ctx=self.scene3D.context3D;
    [ctx pushVa:self.particleBallGpuData.verticesBuffer];
    [ctx setVaOffset:self.shader3d name:"vPosition" dataWidth:4 stride:0 offset:0];
    [ctx pushVa:self.particleBallGpuData.uvBuffer];
    [ctx setVaOffset:self.shader3d name:"texcoord" dataWidth:3 stride:0 offset:0];
    [ctx pushVa: self.particleBallGpuData.basePosBuffer];
    [ctx setVaOffset:self.shader3d name:"basePos" dataWidth:4 stride:0 offset:0];
    [ctx pushVa: self.particleBallGpuData.speedBuffer];
    [ctx setVaOffset:self.shader3d name:"speed" dataWidth:3 stride:0 offset:0];
    
    [ctx drawCall:self.particleBallGpuData.indexBuffer  numTril:6*self.ballData._totalNum ];
    
    
}
- (void)resetVa;
{
   Context3D *ctx=self.scene3D.context3D;
    [ctx clearVa:0];
    [ctx clearVa:1];
    [ctx clearVa:2];
    [ctx clearVa:3];
}
-(void)updateWatchCaramMatrix;
{
    Display3DBallPartilce* this=self;
    [this.rotationMatrix3D identity];
    Camera3D* cam3d=self.scene3D.camera3D;
    [cam3d upFrame];
    if (this.ballData.facez) {
        [this.rotationMatrix3D prependRotation:90.0f axis:Vector3D.X_AXIS];
    } else if (this.ballData._is3Dlizi) {
    } else if (this.ballData._watchEye) {
        [this.rotationMatrix3D prependRotation:cam3d.rotationX axis:Vector3D.X_AXIS];
        [this.rotationMatrix3D prependRotation:cam3d.rotationY axis:Vector3D.Y_AXIS];
    
       
    }
    
}
-(ParticleBallData*)ballData;
{
    return ((ParticleBallData*)(self.data));
}
-(ParticleBallGpuData*)particleBallGpuData;
{
    return self.ballData.particleGpuData;
}
@end


