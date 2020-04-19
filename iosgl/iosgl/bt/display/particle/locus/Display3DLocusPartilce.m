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
 
@implementation Display3DLocusPartilce


-(ParticleLocusData*)locusdata;
{
    return (ParticleLocusData*)self.data;
}
-(ObjData*)particleGpuObjData;
{
    return self.locusdata.objData;
}
- (instancetype)init
{
    self = [super init];
    if (self) {
    }
    return self;
}
-(void)onCreated;
{
    
}
- (void)update;
{
   //  [super update];
}
- (void)setVc;
{
    [self setViewCamModeMatr3d];
    Context3D *ctx=self.scene3d.context3D;
    Camera3D* cam3D=self.scene3d.camera3D;
    [self updateUV];
    Vector3D*  scaleVec =   self.locusdata._resultUvVec;
    [ctx setVcUniform4f:self.shader3d name:"vcmat30" x:scaleVec.x y:scaleVec.y z:scaleVec.z w:scaleVec.w];
    if (self.data._watchEye) {
        Vector3D*  caramPosVec = [[Vector3D alloc]x:cam3D.x y:cam3D.y z:cam3D.z];
        [ctx setVcUniform4f:self.shader3d name:"vcmat31" x:caramPosVec.x y:caramPosVec.y z:caramPosVec.z w:caramPosVec.w];
    }
    
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
    Context3D *ctx=self.scene3d.context3D;
    ObjData* temp=self.particleGpuObjData;
    
    [ctx pushVa: temp.verticesBuffer];
    [ctx setVaOffset:self.shader3d name:"v3Position" dataWidth:3 stride:0 offset:0];
    [ctx pushVa:temp.uvBuffer];
    [ctx setVaOffset:self.shader3d name:"v2TexCoord" dataWidth:2 stride:0 offset:0];
    [ctx pushVa: temp.nrmsBuffer];
    [ctx setVaOffset:self.shader3d name:"v3Normal" dataWidth:4 stride:0 offset:0];
    [ctx drawCall:temp.indexBuffer  numTril:temp.trinum];
    
}
- (void)resetVa;
{
    
}
@end

