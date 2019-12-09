//
//  Display3D.m
//  iosgl
//
//  Created by zhao on 7/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "Display3D.h"
#import "Matrix3D.h"

@implementation Display3D

- (instancetype)init
{
    self = [super init];
    if (self) {
        _posMatrix3d=[[Matrix3D alloc]init];
        _rotationX=0;
        _rotationY=0;
        _rotationZ=0;
    }
    return self;
}
-(void) upFrame  ;{
    
}
 -(void) destory  ;
{
    
}
@end
