//
//  Vector3D.m
//  iosgl
//
//  Created by zhao on 5/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//
#include <stdarg.h>
#import "Vector3D.h"
 

@implementation Vector3D
 

  
- (instancetype)x:(float)x y:(float)y z:(float)z w:(float)w;
{
    _x=x;
    _y=y;
    _z=z;
    _w=w;
    return self;
}
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
 
@end
