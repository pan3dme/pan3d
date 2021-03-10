//
//  Camera3D.m
//  iosgl
//
//  Created by zhao on 30/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "Camera3D.h"
#import "Matrix3D.h"

@implementation Camera3D
- (instancetype)init
{
    self = [super init];
    if (self) {
        self.camMatrix3D=[[Matrix3D alloc]init];
        self.viewMatrix =[[Matrix3D alloc]init];
        self.modelMatrix =[[Matrix3D alloc]init];
        self.distance=400;
        self.sceneViewHW=100;
        self.fovw=300;
        self.fovh=300;
        [self upFrame];
    }
    return self;
}
-(void) upFrame  ;
{
  
    [self.viewMatrix identity];
    [self.viewMatrix perspectiveFieldOfViewLH:1 aspectRatio:1 zNear:10 zFar:10000];
    [self.viewMatrix prependScale:self.fovh/self.fovw y:1 z:1];
   
     
    
    [self.camMatrix3D identity];
    [self.camMatrix3D appendRotation: self.rotationY axis:Vector3D.Y_AXIS];
    [self.camMatrix3D appendRotation: self.rotationX axis:Vector3D.X_AXIS];
    [self.camMatrix3D appendTranslation: 0.0 y:0.0 z:self.distance];

    
    Matrix3D* m=[self.camMatrix3D clone];
    [m Invert];
    Vector3D* p=  [m transformVector: [[Vector3D alloc]x:0 y:0 z:-self.distance] ];
    self.x=p.x;
    self.y=p.y;
    self.z=p.z;
    self.modelMatrix= [self.viewMatrix  clone];
    [self.modelMatrix prepend:  self.camMatrix3D];
    
    
  
 
 
}
 
@end
