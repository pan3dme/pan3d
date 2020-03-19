//
//  Display3DBallPartilce.m
//  iosgl
//
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

@interface Display3DBallPartilce ()
@property (nonatomic, strong) ObjData* objData ;
@property (nonatomic, strong) Shader3D* shader3d;
@property (nonatomic, strong) TextureRes* textureRes;
@property (nonatomic, assign) GLuint  textBsetGLuint;
@end
@implementation Display3DBallPartilce

-(void)onCreated;
{
    self.textureRes=[[MaterialManager default] getMaterialByUrl:@"tu001.jpg"];
    [Scene_data default].frameTime=1;
}
- (void)update;
{
    if(self.textureRes&&self.textureRes.textTureLuint ){
        self.shader3d=self.data.materialParam.shader;
        [super update];
    }
    
}
-(void)setVc;
{
    Context3D *ctx=self.scene3d.context3D;
    Camera3D* cam3D=self.scene3d.camera3D;
    
    [ctx setVcMatrix4fv:self.shader3d name:"viewMatrix" data:cam3D.viewMatrix.m];
    [ctx setVcMatrix4fv:self.shader3d name:"camMatrix" data:cam3D.camMatrix3D.m];
    [ctx setVcMatrix4fv:self.shader3d name:"posMatrix" data:self.posMatrix3d.m];
    
    
    [self updateWatchCaramMatrix];
    [ctx setVcMatrix4fv:self.shader3d name:"rotMatrix" data:self.rotationMatrix3D.m];
    [self setVcmat];
}
-(void)setVcmat;
{
    Display3DBallPartilce* this=self;
    
    Context3D *ctx=self.scene3d.context3D;
    //this._time / Scene_data.frameTime * this.balldata._playSpeed;
    Vector3D*  timeVec =   self.ballData._timeVec;
    timeVec.x=self._time/[Scene_data default].frameTime*self.ballData._playSpeed;
    timeVec.x=self._time/2.0f;
    // timeVec.x=50.0f;
    /*timeVec
     _x    float    1020.5
     _y    float    -0.0900000035
     _z    float    78
     _w    float    -1
     */
    [ctx setVcUniform4f:self.shader3d name:"vcmat50" x:timeVec.x y:timeVec.y z:timeVec.z w:timeVec.w];
    
    Vector3D*  scaleVec =   self.ballData._scaleVec;
    /*
     _x    float    0.00449999981
     _y    float    0.5
     _z    float    0.300000012
     _w    float    0
     */
    [ctx setVcUniform4f:self.shader3d name:"vcmat51" x:scaleVec.x y:scaleVec.y z:scaleVec.z w:scaleVec.w];
    
    Vector3D*  scaleCtrl =   self.ballData._scaleCtrlVec;
    /*scaleCtrl
     _x    float    1
     _y    float    1
     _z    float    99
     _w    float    -1
     */
    [ctx setVcUniform4f:self.shader3d name:"vcmat52" x:scaleCtrl.x y:scaleCtrl.y z:scaleCtrl.z w:scaleCtrl.w];
    
    Vector3D*   addSpeedVec =   self.ballData._addSpeedVec;
    /*addSpeedVec
     _x    float    0
     _y    float    -0.0250000004
     _z    float    0
     _w    float    1
     */
    [ctx setVcUniform4f:self.shader3d name:"vcmat53" x:addSpeedVec.x y:addSpeedVec.y z:addSpeedVec.z w:addSpeedVec.w];
    
    
    
    if(this.ballData._is3Dlizi){
        NSLog(@"_is3Dlizi");
    }
    
}
-(void)setVa;
{
    Context3D *ctx=self.scene3d.context3D;
    [ctx pushVa:self.particleBallGpuData.verticesBuffer];
    [ctx setVaOffset:self.shader3d name:"vPosition" dataWidth:4 stride:0 offset:0];
    [ctx pushVa:self.particleBallGpuData.uvBuffer];
    [ctx setVaOffset:self.shader3d name:"texcoord" dataWidth:3 stride:0 offset:0];
    [ctx pushVa: self.particleBallGpuData.basePosBuffer];
    [ctx setVaOffset:self.shader3d name:"basePos" dataWidth:4 stride:0 offset:0];
    [ctx pushVa: self.particleBallGpuData.speedBuffer];
    [ctx setVaOffset:self.shader3d name:"speed" dataWidth:3 stride:0 offset:0];
    
   // [ctx setRenderTexture:self.shader3d name:"fs0" texture: self.textureRes.textTureLuint];
  //  [ctx setRenderTexture:self.shader3d name:"fs1" texture: self.textureRes.textTureLuint];
    
    // [ctx setRenderTexture:self.data.materialParam.shader name:"fs0"  texture:self.textureRes.textTureLuint];
    
   
    
    [ctx drawCall:self.particleBallGpuData.indexBuffer  numTril:6*self.ballData._totalNum ];
    
    [self setMaterialTexture];
}
-(void)resetVa;
{
}

-(void)updateWatchCaramMatrix;
{
    Display3DBallPartilce* this=self;
    [this.rotationMatrix3D identity];
    Camera3D* cam3d=self.scene3d.camera3D;
    [cam3d upFrame];
    if (this.ballData.facez) {
        [this.rotationMatrix3D prependRotation:90.0f axis:Vector3D.Y_AXIS];
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
