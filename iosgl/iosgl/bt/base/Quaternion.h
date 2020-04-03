//
//  Quaternion.h
//  iosgl
//
//  Created by zhao on 1/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "Vector3D.h"
#import "Matrix4x4.h"
#import "Matrix3D.h"

NS_ASSUME_NONNULL_BEGIN

@interface Quaternion : NSObject
{
float _x;
float _y;
float _z;
float _w;
 
 }
-(void)setX:(float)value;
-(float)x;
-(void)setY:(float)value;
-(float)y;
-(void)setZ:(float)value;
-(float)z;
-(void)setW:(float)value;
-(float)w;
- (instancetype)x:(float)x y:(float)y z:(float)z w:(float)w;
- (instancetype)x:(float)x y:(float)y z:(float)z;

-(void)fromAxisAngle:(Vector3D*)axis angle:(double)angle;
-(void) normalize:(double)val;


-(Matrix3D*)toMatrix3D;
-(Matrix3D*)toMatrix3D:(Matrix3D*)value;

-(void)setMd5W;

@end

NS_ASSUME_NONNULL_END
