//
//  Camera3D.h
//  base
//
//  Created by pan3dme on 2021/1/17.
//

#import "Vector3D.h"

NS_ASSUME_NONNULL_BEGIN

@interface Camera3D : Vector3D

@property (nonatomic, assign)  float   distance;
@property (nonatomic, assign)  float   sceneViewHW;
@property (nonatomic, assign)  float   fovw;
@property (nonatomic, assign)  float   fovh;

@end

NS_ASSUME_NONNULL_END
