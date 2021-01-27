//
//  Display3D.h
//  iosgl
//
//  Created by zhao on 7/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//
 
#import "Vector3D.h"
#import "Object3D.h"
#import "Matrix3D.h"


@class Scene3D;
 

NS_ASSUME_NONNULL_BEGIN

@interface Display3D : Object3D
  
@property (nonatomic, strong)  Matrix3D *posMatrix3d;
@property (nonatomic, strong)  Matrix3D *modeMatrix;
@property (nonatomic, strong)  Matrix3D *rotationMatrix3D;
@property (nonatomic, strong)  Scene3D *scene3d;
@property (nonatomic, assign)  BOOL  sceneVisible;
-(void) upFrame  ;
-(void) destory  ;
-(Matrix3D*)viewMatrix;
- (instancetype)init;
- (instancetype)init:(Scene3D*)value;
@end

NS_ASSUME_NONNULL_END
