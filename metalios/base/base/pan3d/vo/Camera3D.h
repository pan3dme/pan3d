//
//  Camera3D.h
//  base
//
//  Created by pan3dme on 2021/1/17.
//

#import "Object3D.h"
#import "Matrix3D.h"

NS_ASSUME_NONNULL_BEGIN

@interface Camera3D : Object3D
 
@property (nonatomic, strong)  Matrix3D*   viewMatrix;
@property (nonatomic, strong)  Matrix3D*   camMatrix3D;
@property (nonatomic, strong)  Matrix3D*   modelMatrix;


@property (nonatomic, assign)  float   distance;
@property (nonatomic, assign)  float   sceneViewHW;
@property (nonatomic, assign)  float   fovw;
@property (nonatomic, assign)  float   fovh;

@end

NS_ASSUME_NONNULL_END
