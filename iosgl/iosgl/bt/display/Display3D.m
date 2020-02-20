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
        self.posMatrix3d=[[Matrix3D alloc]init];
        self.modeMatrix=[[Matrix3D alloc]init];
    }
    return self;
}
-(void)updateMatrix;
{
    [self.posMatrix3d isIdentity];
    self.posMatrix3d=[[Matrix3D alloc]init];
    [self.posMatrix3d outString];
    
    [self.posMatrix3d appendScale:_scaleX y:_scaleY z:_scaleZ];
    [self.posMatrix3d appendRotation:_rotationX axis:Vector3D.X_AXIS];
    [self.posMatrix3d appendRotation:_rotationY axis:Vector3D.Y_AXIS];
    [self.posMatrix3d appendRotation:_rotationZ axis:Vector3D.Z_AXIS];
    [self.posMatrix3d appendTranslation:_x y: _y z:_z];
    
  
  

}
 
-(Matrix3D*)viewMatrix;
{
    if(self.scene3d){
        return self.scene3d.camera3D.modelMatrix;
    }else{
        return nil;
    }
}
-(void) upFrame  ;{
}
-(void) destory ;{
    
}
 

 
@end
