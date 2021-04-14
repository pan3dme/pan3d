//
//  ParticleFollowData.m
//  iosgl
//
//  Created by zhao on 15/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "ParticleFollowData.h"
#import "ProgrmaManager.h"
#import "Display3DFollowShader.h"
#import "Display3DFollowPartilce.h"
 

@implementation ParticleFollowData

- (Display3DParticle *)getParticle
{
      return [[Display3DFollowPartilce alloc]init];
}
-(void)regShader;
{
    if (!self.materialParam) {
        return;
    }
    //使用2进制着色器
    NSArray<NSNumber*>* shaderParameAry = [self getShaderParam];

    
//    self.materialParam.shader=  [ self.mtkScene3D.progrmaManager getMaterialProgram:Display3DFollowShader.shaderStr shaderCls: [[Display3DFollowShader alloc]init]  material:self.materialParam.material paramAry:shaderParameAry parmaByFragmet:NO];
 
}
-(NSArray<NSNumber*>*)getShaderParam;
{
    ParticleBallData* this=self;
    if (this._animRow != 1 || this._animLine != 1) {
        this._uvType = @1;
        this._animCtrlVec = [[Vector3D alloc]x:this._animLine y:this._animRow z:this._animInterval];
    } else if (this._uSpeed != 0 || this._vSpeed != 0) {
        this._uvType = @2;
        this._uvCtrlVec = [[Vector2D alloc]x:this._uSpeed y:this._vSpeed];
    } else {
        this._uvType = @0;
    }
    BOOL hasParticleColor= this.materialParam.material.hasParticleColor;
       this._needRandomColor = this.materialParam.material.hasVertexColor;
    
 
    NSNumber* hasParticle;
    if (hasParticleColor) {
        hasParticle = @1;
    } else {
        hasParticle = @0;
    }
    NSNumber* hasRandomClolr = this._needRandomColor ? @1 : @0;
    NSNumber* isMul = this._is3Dlizi ? @1 : @0;
    NSNumber* needRotation = this._needSelfRotation ? @1 : @0;
    NSNumber* needScale = this._needScale ? @1 : @0;
    NSNumber* needAddSpeed = this._needAddSpeed ? @1 : @0;
    
    NSArray<NSNumber*>* shaderParameAry = [[NSArray alloc] initWithObjects:hasParticle, hasRandomClolr, isMul, needRotation, needScale, needAddSpeed, this._uvType, nil];
     
    return shaderParameAry;
}
@end
