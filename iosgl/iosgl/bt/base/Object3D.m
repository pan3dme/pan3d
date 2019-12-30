//
//  Object3D.m
//  iosgl
//
//  Created by zhao on 30/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "Object3D.h"

@implementation Object3D
- (instancetype)init
{
    self = [super init];
    if (self) {
        _rotationX=0;
        _rotationY=0;
        _rotationZ=0;
        _scaleX=1;
        _scaleY=1;
        _scaleZ=1;
 
    }
    return self;
}
-(void)updateMatrix;
{
 
}
- (void)setRotationX:(float)value ;{
    _rotationX=value;
    [self updateMatrix];
}
- (float)rotationX; {
    return _rotationX;
}
- (void)setRotationY:(float)value {
    _rotationY=value;
     [self updateMatrix];
}
- (float)rotationY; {
    return _rotationY;
}
- (void)setRotationZ:(float)value ;{
    _rotationZ=value;
     [self updateMatrix];
}
- (float)rotationZ; {
    return _rotationZ;
}

-(void)setScaleX:(float)value;{
   _scaleX=value;
      [self updateMatrix];
}
-(float)scaleX;{
    return _scaleX;
}
-(void)setScaleY:(float)value;{
   _scaleY=value;
      [self updateMatrix];
}
-(float)scaleY;{
    return _scaleY;
}
-(void)setScaleZ:(float)value;{
     _scaleZ=value;
      [self updateMatrix];
}
-(float)scaleZ;{
    return _scaleZ;
}

-(void)setX:(float)value; {
    _x=value;
     [self updateMatrix];
}
-(void)setY:(float)value;{
    _y=value;
     [self updateMatrix];
}
-(void)setZ:(float)value;{
    _z=value;
     [self updateMatrix];
}
-(void)setW:(float)value;{
    _w=value;
     [self updateMatrix];
}

@end
