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
       NSLog(@"不应该到这")
    }
    return self;
}
- (instancetype)init:(Scene3D*)value;
{
    self = [super init];
    if (self) {
        self.scene3D=value;
        self.posMatrix3d=[[Matrix3D alloc]init];
        self.modeMatrix=[[Matrix3D alloc]init];
        self.rotationMatrix3D=[[Matrix3D alloc]init];
    }
    return self;
}
-(void)updateMatrix;
{
 
    [self.posMatrix3d identity];
    [self.posMatrix3d appendScale:_scaleX y:_scaleY z:_scaleZ];
    [self.posMatrix3d appendRotation:_rotationX axis:Vector3D.X_AXIS];
    [self.posMatrix3d appendRotation:_rotationY axis:Vector3D.Y_AXIS];
    [self.posMatrix3d appendRotation:_rotationZ axis:Vector3D.Z_AXIS];
    [self.posMatrix3d appendTranslation:_x y: _y z:_z];
    
    
    [self.rotationMatrix3D identity];
    [self.rotationMatrix3D appendRotation:_rotationX axis:Vector3D.X_AXIS];
    [self.rotationMatrix3D appendRotation:_rotationY axis:Vector3D.Y_AXIS];
    [self.rotationMatrix3D appendRotation:_rotationZ axis:Vector3D.Z_AXIS];
 

}
 
-(Matrix3D*)viewMatrix;
{
    if(self.scene3D){
        return self.scene3D.camera3D.modelMatrix;
    }else{
        return nil;
    }
}
-(void) upFrame  ;{
}
-(void) destory ;{
    
}
 

 
@end
