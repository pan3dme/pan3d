//
//  CombineParticle.h
//  iosgl
//
//  Created by zhao on 23/2/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "EventDispatcher.h"
#import "CombineParticle.h"
#import "CombineParticleData.h"
#import "Display3DParticle.h"
#import "Matrix3D.h"
#import "IBind.h"

@class Display3DParticle;

NS_ASSUME_NONNULL_BEGIN

@interface CombineParticle : EventDispatcher


-(void)setX:(float)value;
-(float)x;
-(void)setY:(float)value;
-(float)y;
-(void)setZ:(float)value;
-(float)z;

-(void)setRotationX:(float)value;
-(float)rotationX;
-(void)setRotationY:(float)value;
-(float)rotationY;
-(void)setRotationZ:(float)value;
-(float)rotationZ;
-(void)setScaleX:(float)value;
-(float)scaleX;
-(void)setScaleY:(float)value;
-(float)scaleY;
-(void)setScaleZ:(float)value;
-(float)scaleZ;


@property (nonatomic, assign)float  rotationX;
@property (nonatomic, assign)float  rotationY;
@property (nonatomic, assign)float  rotationZ;

 
@property (nonatomic, strong)NSMutableArray<Display3DParticle*>*  _displayAry ;
@property (nonatomic, strong)  NSString*  url;
@property (nonatomic, assign)  int  type; //类型
@property (nonatomic, assign)  BOOL  hasMulItem;
@property (nonatomic, assign)  BOOL  sceneVisible;
@property (nonatomic, assign)  BOOL  dynamic;
@property (nonatomic, assign)  BOOL  hasDestory;
@property (nonatomic, assign)  float  maxTime;

@property (nonatomic, strong)  Scene3D *scene3d;
@property (nonatomic, strong)  CombineParticleData* sourceData;
 
@property (nonatomic, strong)  Matrix3D*  bindMatrix;
@property (nonatomic, strong)  Vector3D*  bindVecter3d;
@property (nonatomic, strong)  Vector3D*   bindScale;
@property (nonatomic, strong)  Matrix3D*  invertBindMatrix;
@property (nonatomic, strong)  Matrix3D*  groupMatrix;
@property (nonatomic, strong)  Matrix3D*  groupRotationMatrix;
@property (nonatomic, strong)NSString*  bindSocket;

-(id<IBind>)bindTarget;
-(void)setBindTarget:(id<IBind>)value;
 
 

-(void)addPrticleItem:(Display3DParticle*)dic;
-(void)updateTime:(float)t;
-(void)update;
-(void)updateItem:(int)idx;
-(void)reset;

@end

NS_ASSUME_NONNULL_END
