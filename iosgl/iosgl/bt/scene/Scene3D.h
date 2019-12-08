//
//  Scene3D.h
//  iosgl
//
//  Created by zhao on 8/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "ResGC.h"
#import <UIKit/UIKit.h>
#import "Display3D.h"
 

NS_ASSUME_NONNULL_BEGIN

@interface Scene3D : ResGC
@property (nonatomic, strong) EAGLContext *context3D; // OpenGL context,管理使用opengl
@property (nonatomic, strong) CAEAGLLayer *myEAGLayer;

@property (nonatomic, assign) GLuint myColorRenderBuffer;
@property (nonatomic, assign) GLuint myColorFrameBuffer;

@property (nonatomic, copy) NSMutableArray   *displayList;    // 获取到的热门数据

@property (nonatomic, strong) UIView *uiView;
- (instancetype)init:(UIView*)uiview;
-(void) addDisplay:(NSObject*)dis; 
-(void) upFrame  ;
@end

NS_ASSUME_NONNULL_END
