//
//  Context3D.h
//  iosgl
//
//  Created by zhao on 8/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "ResGC.h"
#import "Shader3D.h"
#import "Vector3D.h"
#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface Context3D : ResGC
@property (nonatomic, strong) EAGLContext *gl; // OpenGL context,管理使用opengl

-(void)setVc3fv:(Shader3D*)shader name:(GLchar*)name data:(float32x4_t)data;

@end

NS_ASSUME_NONNULL_END
