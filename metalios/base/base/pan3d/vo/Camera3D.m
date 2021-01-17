//
//  Camera3D.m
//  base
//
//  Created by pan3dme on 2021/1/17.
//

#import "Camera3D.h"
#import "Matrix3D.h"

@implementation Camera3D

- (instancetype)init
{
    self = [super init];
    if (self) {
        [self initData];
    }
    return self;
}
-(void)initData
{
    self.camMatrix3D=[[Matrix3D alloc] init];
    self.viewMatrix=[[Matrix3D alloc] init];
   [self.viewMatrix perspectiveFieldOfViewLH:1 aspectRatio:1 zNear:1 zFar:1000];
 
    self.rotationX=-45;
    self.distance=100;
    
    [self.camMatrix3D identity];
    [self.camMatrix3D appendRotation: self.rotationY axis:Vector3D.Y_AXIS];
    [self.camMatrix3D appendRotation: self.rotationX axis:Vector3D.X_AXIS];
    [self.camMatrix3D appendTranslation: 0.0 y:0.0 z:self.distance];
 
     
    self.modelMatrix= [self.viewMatrix  clone];
    [self.modelMatrix prepend:  self.camMatrix3D];
    
    
    Matrix3D* m=[self.camMatrix3D clone];
    [m Invert];
    Vector3D* p=  [m transformVector: [[Vector3D alloc]x:0 y:0 z:-self.distance] ];
    self.x=p.x;
    self.y=p.y;
    self.z=p.z;
    
    
    
}
@end
