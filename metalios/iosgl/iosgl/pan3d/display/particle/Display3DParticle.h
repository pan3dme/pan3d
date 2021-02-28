//
//  Display3DParticle.h
//  iosgl
//
//  Created by zhao on 23/2/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Display3D.h"
#import "Matrix3D.h"
#import "Shader3D.h"
#import "Vector3D.h"
#import "TimeLine.h"
#import "Matrix3D.h"

@class  ParticleData;
@class TimeLine;
NS_ASSUME_NONNULL_BEGIN

@interface Display3DParticle : Display3D
@property (nonatomic, assign)  BOOL  visible;

@property (nonatomic, assign)  int  beginTime;
@property (nonatomic, assign)  BOOL   isInGroup;
@property (nonatomic, assign)  float  _time;

@property (nonatomic, strong) Shader3D* shader3d;
@property (nonatomic, assign)  Vector3D*  bindVecter3d;
@property (nonatomic, assign)  Vector3D*  bindScale;

@property (nonatomic, strong)  Matrix3D*  bindMatrix;
@property (nonatomic, strong)  Matrix3D*  invertBindMatrix;
@property (nonatomic, strong)  Matrix3D*   groupMatrix;

@property (nonatomic, strong)  Vector3D*   groupPos;
@property (nonatomic, strong)  Vector3D*   groupScale;
@property (nonatomic, strong)  Vector3D*   groupRotation;

@property (nonatomic, strong)  ParticleData*  data;
-(void)onCreated;
-(void)update;
-(void)updateTime:(float)t;
-(void)setVc;
-(void)setTimeLine:(TimeLine*)value;
-(TimeLine*)timeLine;
-(void)setVa;
-(void)resetVa;
-(void)setMaterialTexture;
-(void)setViewCamModeMatr3d;
-(void)inverBind;
-(void)reset;
-(NSUInteger)getFcDataIdx;
-(void)setBind:(Vector3D*)pos rotation:(Matrix3D*)rotation scale:(Vector3D*)scale invertRotation:(Matrix3D*)invertRotation groupMatrix:(Matrix3D*)groupMatrix;
@end

NS_ASSUME_NONNULL_END
