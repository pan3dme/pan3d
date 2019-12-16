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
    Vector3D *v=[[Vector3D alloc]init];
    v.x=1;
    v.y=0;
    v.z=0;
    return v;
}
+ (Vector3D *)Y_AXIS;
{
    Vector3D *v=[[Vector3D alloc]init];
    v.x=0;
    v.y=1;
    v.z=0;
    return v;
}
+ (Vector3D *)Z_AXIS;
{
    Vector3D *v=[[Vector3D alloc]init];
    v.x=0;
    v.y=0;
    v.z=1;
    return v;
}
 
@end
