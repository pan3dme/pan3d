//
//  Display3D.h
//  iosgl
//
//  Created by zhao on 7/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "Vector3D.h"
#import "Matrix3D.h"
#import "Scene3D.h"

NS_ASSUME_NONNULL_BEGIN

@interface Display3D : Vector3D
@property (nonatomic, assign)  float rotationX;
@property (nonatomic, assign)  float rotationY;
@property (nonatomic, assign)  float rotationZ;
@property (nonatomic, strong)  Matrix3D *posMatrix3d;
 @property (nonatomic, strong) Scene3D *scene; // OpenGL context,管理使用opengl
-(void) upFrame  ;
-(void) destory  ;
@end

NS_ASSUME_NONNULL_END
