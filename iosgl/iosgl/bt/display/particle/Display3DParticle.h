//
//  Display3DParticle.h
//  iosgl
//
//  Created by zhao on 23/2/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Display3D.h"
#import "Matrix3D.h"
#import "Vector3D.h"
 

 @class  ParticleData;

NS_ASSUME_NONNULL_BEGIN

@interface Display3DParticle : Display3D
@property (nonatomic, assign)  BOOL  visible;
@property (nonatomic, assign)  int  timeline;
@property (nonatomic, assign)  int  _beginTime;

@property (nonatomic, assign)  Vector3D*  bindMatrix;
@property (nonatomic, assign)  Vector3D*  bindVecter3d;
@property (nonatomic, assign)  Vector3D*  bindScale;
@property (nonatomic, assign)  Matrix3D*  invertBindMatrix;
@property (nonatomic, assign)  Matrix3D*   groupMatrix;
 
 
@property (nonatomic, assign)  BOOL   isInGroup;
@property (nonatomic, assign)  Vector3D*   groupPos;
@property (nonatomic, assign)  Vector3D*   groupScale;
@property (nonatomic, assign)  Vector3D*   groupRotation;
@property (nonatomic, assign)  float  _time;
 @property (nonatomic, strong)  ParticleData*  data;
-(void)onCreated;
-(void)update;
-(void)updateTime:(float)t;
-(void)setVc;
-(void)setVa;
-(void)resetVa;
 
@end

NS_ASSUME_NONNULL_END
