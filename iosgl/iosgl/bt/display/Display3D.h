//
//  Display3D.h
//  iosgl
//
//  Created by zhao on 7/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//
 
#import "Vector3D.h"
#import "Matrix3D.h"
//#import "Scene3D.h"

@class Scene3D;
 

NS_ASSUME_NONNULL_BEGIN

@interface Display3D : Vector3D
 {
float _rotationX;
float _rotationY;
float _rotationZ;
 float _scaleX;
 float _scaleY;
 float _scaleZ;
 NSString *_name;
 }
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
  
 - (void)setName:(NSString *)name;
 - (NSString *)name;
 
@property (nonatomic, strong)  Matrix3D *posMatrix3d;
 @property (nonatomic, strong)  Scene3D *scene;
-(void) upFrame  ;
-(void) destory  ;
@end

NS_ASSUME_NONNULL_END
