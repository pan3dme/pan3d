//
//  Display3D.m
//  iosgl
//
//  Created by zhao on 7/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//
#import "Scene3D.h"
#import "Display3D.h"
#import "Matrix3D.h"
#import "Scene3D.h"

@implementation Display3D
- (instancetype)init
{
    self = [super init];
    if (self) {
        _posMatrix3d=[[Matrix3D alloc]init];
    }
    return self;
}
-(void) upFrame  ;{
}
-(void) destory ;{
    
}
- (void)setRotationX:(float)value ;{
    _rotationX=value;
}
- (float)rotationX; {
    return _rotationX;
}
- (void)setRotationY:(float)value {
    _rotationY=value;
}
- (float)rotationY; {
    return _rotationY;
}
- (void)setRotationZ:(float)value ;{
    _rotationZ=value;
}
- (float)rotationZ; {
    return _rotationZ;
}

-(void)setX:(float)value; {
    _x=value;
}
-(void)setY:(float)value;{
    _y=value;
}
-(void)setZ:(float)value;{
    _z=value;
}
-(void)setW:(float)value;{
    _w=value;
}


- (void)setName:(NSString *)name;
{
    _name=name;
}
- (NSString *)name;
{
    return _name;
}
@end
