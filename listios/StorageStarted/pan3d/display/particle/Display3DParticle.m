//
//  Display3DParticle.m
//  iosgl
//
//  Created by zhao on 23/2/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Display3DParticle.h"
#import "ParticleData.h"
#import "DynamicConstItem.h"
#import "DynamicTexItem.h"
#import "Context3D.h"
#import "Shader3D.h"
#import "Scene3D.h"
#import "Scene_data.h"
#import "Vector3D.h"
#import "Matrix3D.h"
#import "ParticleMetalType.h"

@interface Display3DParticle()
@property (nonatomic, strong)  TimeLine*  timeline;
@end

@implementation Display3DParticle

- (instancetype)init:value
{
    self = [super init:value];
    if (self) {
        self._time=0;
        self.visible=YES;
    }
    return self;
}
-(void)onCreated;
{
}
 

-(void)setBind:(Vector3D*)pos rotation:(Matrix3D*)rotation scale:(Vector3D*)scale invertRotation:(Matrix3D*)invertRotation groupMatrix:(Matrix3D*)groupMatrix;
{
    self.bindVecter3d = pos;
    self.bindMatrix = rotation;
    self.bindScale = scale;
    self.invertBindMatrix = invertRotation;
    self.groupMatrix = groupMatrix;
}


-(void)updateTime:(float)t;
{
    Display3DParticle* this=self;
    this._time = t - this.beginTime;
    [this.timeline updateTime:t];
    this.visible = this.timeline.visible;
    [this.posMatrix3d identity];
    [this.posMatrix3d prependScale:this.scaleX*0.1* this.bindScale.x y:this.scaleY*0.1* this.bindScale.y z:_scaleZ*0.1* this.bindScale.z];
    [this.timeline updateMatrix:self.posMatrix3d particle:this];
    
 
}
-(void)updateMatrix;
{
    if (!self.bindMatrix){
        return;
    }
    [self.modeMatrix identity];
    [self.modeMatrix append:self.posMatrix3d];
    [self.modeMatrix append:self.bindMatrix];
    
 
    
    [self.modeMatrix appendTranslation:self.bindVecter3d.x y:self.bindVecter3d.y z:self.bindVecter3d.z];
}

-(void)update;
{
    if(self.visible ){
        if ( self.data.materialParam){
          
            self.shader3d=self.data.materialParam.shader;
            
            [self.shader3d mtlSetProgramShader];
          
            [self updateMatrix];
            [self setMaterialVc];
            [self setMaterialTexture];
            [self setVc];
            [self setVa];
            [self resetVa];
        }
        
    }
}
/*
 设置基础透视，镜头，模型矩阵
 */
-(void)setViewCamModeMatr3d;
{
  
}

-(void)setMaterialTexture;
{
    Context3D *ctx=self.scene3D.context3D;
    NSArray<TexItem*>* texVec  = self.data.materialParam.material.texList;
    for (int i   = 0; i < texVec.count; i++) {
        if (texVec[i].isDynamic) {
            continue;
        }
        [ctx setRenderTexture:self.data.materialParam.shader name:texVec[i].name texture:  texVec[i].textureRes.textTureLuint level:0];
    }
    NSArray<DynamicTexItem*>* texDynamicVec  =( NSArray<DynamicTexItem*>*) self.data.materialParam.dynamicTexList;
    for (int i   = 0; i < texDynamicVec.count; i++) {
        TexItem* texItem=texDynamicVec[i].target;
 
        id<MTLRenderCommandEncoder> renderEncoder=self.scene3D.context3D.renderEncoder;
        
      
        [renderEncoder setFragmentTexture:texDynamicVec[i].mtltexture
                                  atIndex:texItem.id];
    }
    
}
-(void)reset;
{
    [self.timeline reset];
    [self updateTime:0];
}
 
-(void)inverBind;
{
    if(self.invertBindMatrix){
        
    }
    
}
-(void)setVc;
{
}
-(TimeLine*)timeLine;
{
    return  _timeline;
}
-(void)setTimeLine:(TimeLine*)value;
{
    _timeline=value;
 
    self.beginTime=_timeline.beginTime;
  
}
-(void)setMaterialVc;
{
    Display3DParticle* this=self;
    if (!this.data.materialParam) {
        return;
    }
    NSMutableArray<DynamicConstItem*>* dynamicConstList= this.data.materialParam.dynamicConstList;
     float t= fmod (self._time , [Scene_data default].frameTime * this.data._life);
    for (int i = 0; i < dynamicConstList.count; i++) {
        [dynamicConstList[i] update:t];
    }
    if(this.data.materialParam.material.fcNum <= 0){
        return;
    }
    t = t * this.data.materialParam.material.timeSpeed;
    [this.data.materialParam.material update:t];
 
    NSMutableArray<NSNumber*>*   fcData= this.data.materialParam.material.fcData;
    GLfloat fcDataGlArr[fcData.count];
    for (int i=0; i<fcData.count; i++) {
        fcDataGlArr[i]=fcData[i].floatValue;
    }
 
    if(fcData.count!=4){
        NSLog(@"出错setMaterialVc%lu",fcData.count);
    }
    
 
    
    
    
    id<MTLRenderCommandEncoder> renderEncoder=self.scene3D.context3D.renderEncoder;
    [renderEncoder setFragmentBytes:fcDataGlArr length:sizeof(fcDataGlArr) atIndex:[self getFcDataIdx]];
}
-(NSUInteger)getFcDataIdx;
{
    return 1; //FC数据的位置，不同特效不一样
}

-(void)setVa;
{
}
-(void)resetVa;
{
}


@end
