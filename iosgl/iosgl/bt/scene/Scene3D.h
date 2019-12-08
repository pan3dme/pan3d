//
//  Scene3D.h
//  iosgl
//
//  Created by zhao on 8/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "ResGC.h"
#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface Scene3D : ResGC
@property (nonatomic, strong) EAGLContext *context3D; // OpenGL context,管理使用opengl
@property (nonatomic, strong) CAEAGLLayer *myEAGLayer;
@property (nonatomic, strong) UIView *uiView;
- (instancetype)init:(UIView*)uiview;
@end

NS_ASSUME_NONNULL_END
