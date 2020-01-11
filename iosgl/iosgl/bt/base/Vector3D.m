//
//  Vector3D.m
//  iosgl
//
//  Created by zhao on 5/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//
#include <stdarg.h>
#import "Vector3D.h"
 
@interface Vector3D()
 
@end
@implementation Vector3D
  + (Vector3D *)X_AXIS;
  {
      return  [[Vector3D alloc]x:1 y:0 z:0 w:1];;
  }
  + (Vector3D *)Y_AXIS;
  {
      return  [[Vector3D alloc]x:0 y:1 z:0 w:1];;
  }
  + (Vector3D *)Z_AXIS;
  {
      return  [[Vector3D alloc]x:0 y:0 z:1 w:1];;
  }
- (instancetype)init
{
    self = [super init];
    if (self) {
         _x=0;
         _y=0;
         _z=0;
         _w=1;
    }
    return self;
}
- (instancetype)x:(float)x y:(float)y z:(float)z w:(float)w;
{
    _x=x;
    _y=y;
    _z=z;
    _w=w;
    return self;
}
-(void)setX:(float)value; {
    _x=value;
}
-(float)x;{
    return _x;
}
-(void)setY:(float)value;{
      _y=value;
}
-(float)y;{
       return _y;
}
-(void)setZ:(float)value;{
      _z=value;
}
-(float)z;{
       return _z;
}
-(void)setW:(float)value;{
      _w=value;
}
-(float)w;{
       return _w;
}
 
-(float)length;
{
      return sqrt(_x * _x + _y * _y + _z * _z);
}
-(void)scaleBy:(float)value;
{
    _x *= value;
    _y *= value;
    _z *= value;
    _w *= value;
}
-(void)normalize;
{
    float le = [self length];
    if (le == 0) {
        return;
    }
    [self scaleBy:(1 / le)];
}

@end
