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

@interface Display3DBallPartilce ()
@property (nonatomic, strong) ObjData* objData ;
@property (nonatomic, strong) Shader3D* shader3d;
@property (nonatomic, strong) TextureRes* textureRes;

@property (nonatomic, assign) GLuint  textBsetGLuint;


@end
@implementation Display3DBallPartilce

-(void)onCreated;
{
    [[ProgrmaManager default] registe:Display3DBallPartilceShader.shaderStr shader3d: [[Display3DBallPartilceShader alloc]init]];
    self.shader3d=  [[ProgrmaManager default] getProgram:Display3DBallPartilceShader.shaderStr];
    self.textureRes=[[MaterialManager default] getMaterialByUrl:@"tu001.jpg"];
    
}
- (void)update;
{
    [Scene_data default].frameTime=1;
    if(self.shader3d&&self.textureRes&&self.textureRes.textTureLuint ){
        glUseProgram(self.shader3d.program);
        [super update];
    }
    
}
-(void)setVc;
{
    Context3D *ctx=self.scene3d.context3D;
    
  
    [ctx setVcMatrix4fv:self.shader3d name:"viewMatrix" data:self.viewMatrix.m];
    [ctx setVcMatrix4fv:self.shader3d name:"posMatrix" data:self.posMatrix3d.m];
 
    [self setVcmat];
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
    [ctx setRenderTexture:self.shader3d name:"colorMap" texture: self.textureRes.textTureLuint];
    [ctx drawCall:self.particleBallGpuData.indexBuffer  numTril:6*self.ballData._totalNum ];
}
-(void)resetVa;
{
}
-(void)setVcmat;
{
    Display3DBallPartilce* this=self;
    
    Context3D *ctx=self.scene3d.context3D;
    //this._time / Scene_data.frameTime * this.balldata._playSpeed;
    Vector3D*  timeVec =   self.ballData._timeVec;
    timeVec.x=self._time/[Scene_data default].frameTime*self.ballData._playSpeed;
    
    // timeVec.x=50.0f;
    timeVec.x=self._time;
    [ctx setVcUniform4f:self.shader3d name:"vcmat50" x:timeVec.x y:timeVec.y z:timeVec.z w:timeVec.w];
    
    Vector3D*  scaleVec =   self.ballData._scaleVec;
    [ctx setVcUniform4f:self.shader3d name:"vcmat51" x:scaleVec.x y:scaleVec.y z:scaleVec.z w:scaleVec.w];
    
    Vector3D*  scaleCtrl =   self.ballData._scaleCtrlVec;
    [ctx setVcUniform4f:self.shader3d name:"vcmat52" x:scaleCtrl.x y:scaleCtrl.y z:scaleCtrl.z w:scaleCtrl.w];
    
    Vector3D*   addSpeedVec =   self.ballData._addSpeedVec;
    [ctx setVcUniform4f:self.shader3d name:"vcmat53" x:addSpeedVec.x y:addSpeedVec.y z:addSpeedVec.z w:addSpeedVec.w];
    
    
//    80: 0
//    81: -0.09000000357627869
//    82: 78
//    83: -1
//    84: 0.0044999998062849045
//    85: 0.5
//    86: 0.30000001192092896
//    87: 0
//    88: 1
//    89: 1
//    90: 99
//    91: -1
//    92: 0
//    93: -0.02500000037252903
    
    if(this.ballData._is3Dlizi){
        NSLog(@"_is3Dlizi");
    }
  //  NSLog(@"--timeVec.x----%f",timeVec.x);
    // public static shader_vec4 = {time:[5,0],scale:[5,1],scaleCtrl:[5,2],force:[5,3],worldPos:[6,0],camPos:[6,1],animCtrl:[6,2],uvCtrl:[6,3]};
    
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
