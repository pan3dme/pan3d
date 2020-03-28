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
        self.distance=500;
        self.sceneViewHW=100;
        self.fovw=300;
        self.fovh=500;
        [self upFrame];
    }
    return self;
}
-(void) upFrame  ;
{
  
    [self.viewMatrix identity];
//    [self.viewMatrix perspectiveFieldOfViewLH:1 aspectRatio:1 zNear:0.01 zFar:1000];
//    [self.viewMatrix appendScale:  (self.sceneViewHW / self.fovw * 2) y:self.fovw / self.fovh * ( self.sceneViewHW / self.fovw * 2) z:1];
    [self.viewMatrix inputStrData:@"1.8304877281188965,0,0,0,0,1.8304877281188965,0,0,0,0,1.0016694068908691,1,0,0,-1.0016694068908691,0"];
   
    [self.camMatrix3D identity];
    [self.camMatrix3D appendRotation: self.rotationY axis:Vector3D.Y_AXIS];
    [self.camMatrix3D appendRotation: self.rotationX axis:Vector3D.X_AXIS];
    [self.camMatrix3D appendTranslation: 0.0 y:0.0 z:self.distance];
    [self.camMatrix3D appendTranslation: 0.0 y:-0.0 z:0.0];
    
    Matrix3D* m=[self.camMatrix3D Invert];
    Vector3D* p=  [m transformVector: [[Vector3D alloc]x:0 y:0 z:-self.distance] ];
    self.x=p.x;
    self.y=p.y;
    self.z=p.z;
    self.modelMatrix= [self.viewMatrix  clone];
    [self.modelMatrix prepend:  self.camMatrix3D];
    
    
  
 
 
}
 
@end
