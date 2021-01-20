//
//  Object3D.h
//  iosgl
//
//  Created by zhao on 30/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "Vector3D.h"

NS_ASSUME_NONNULL_BEGIN

@interface Object3D : Vector3D
{
float _rotationX;
float _rotationY;
float _rotationZ;
float _scaleX;
float _scaleY;
float _scaleZ;
 
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
-(void)updateMatrix;

@end

NS_ASSUME_NONNULL_END
