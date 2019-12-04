//
//  TwoPageView.m
//  iosgl
//
//  Created by zhao on 2/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "TwoPageView.h"
#import "MathCore.h"
#import <UIKit/UIKit.h>
#import <GLKit/GLKit.h>
#import "Base3dView.h"
#import "GlkView.h"

@interface TwoPageView ()
@property (nonatomic, strong) EAGLContext *eaglContext; // OpenGL context,管理使用opengl es进行绘制的状态,命令及资源
@property (nonatomic, strong) CAEAGLLayer *eaglLayer;
@property (nonatomic, assign) GLuint colorRenderBuffer; // 渲染缓冲区
@property (nonatomic, assign) GLuint frameBuffer; // 帧缓冲区
@property (nonatomic, strong) GlkView *glkView;
 
@end

@implementation TwoPageView




- (void)viewDidLoad {
    [super viewDidLoad];
    self.title=@"two";
}
- (void)initFWUI NS_REQUIRES_SUPER;
{
    [super initFWUI];
    self.view.frame= CGRectMake(0, 0, 400, 400);

  //   [NSTimer scheduledTimerWithTimeInterval:1.0/30.0 target:self selector:@selector(refreshTimeFun) userInfo:nil repeats:YES];
    
    //[self setUpConfig];
    
  
    
 
    
    
    
    
}
-(void)setUpConfig
{
    EAGLContext *context;
    //context
    //EAGLContent是苹果在ios平台下实现的opengles渲染层，用于渲染结果在目标surface上的更新
    //新建OpenGL ES上下文
    context = [[EAGLContext alloc] initWithAPI:kEAGLRenderingAPIOpenGLES3];//这里用的是opengles3.
    
    if (!context) {
        NSLog(@"Failed to create ES context");
    }
    
    //创建一个OpenGL ES上下文并将其分配给从storyboard加载的视图
    //注意：这里需要把stroyBoard记得添加为GLKView
    GLKView * view  = (GLKView *)self.view;
    view.context = context;
    
    //配置视图创建的渲染缓冲区：颜色缓冲区
    view.drawableColorFormat = GLKViewDrawableColorFormatRGBA8888;
  
     //配置视图创建的渲染缓冲区：深度缓冲区
    view.drawableDepthFormat = GLKViewDrawableDepthFormat24;
    
   //配置视图创建的渲染缓冲区：模板缓冲区
    // view.drawableStencilFormat = GLKViewDrawableStencilFormat8;
    
    //启用多重采样
    //view.drawableMultisample = GLKViewDrawableMultisample4X;
    
    [EAGLContext setCurrentContext:context];
    glEnable(GL_DEPTH_TEST); //开启深度测试，就是让离你近的物体可以遮挡离你远的物体。
    glClearColor(0.1, 0.2, 0.3, 1); //设置surface的清除颜色，也就是渲染到屏幕上的背景色。
}
-(void)refreshTimeFun{
    
    [self setupOpenGLContext];
    [self setupCAEAGLLayer];
    [self setupRenderBuffer];
    [self setupFrameBuffer];
    glClearColor(1.0f, 0.0f, 1.0f, 1.0f);
    glClear(GL_COLOR_BUFFER_BIT);
    
    
    NSLog(@"-------");
}

- (void)setupOpenGLContext {
    _eaglContext = [[EAGLContext alloc] initWithAPI:kEAGLRenderingAPIOpenGLES3]; //选择OpenGLES API版本
    [EAGLContext setCurrentContext:_eaglContext]; //设置为当前上下文。
}
- (void)setupCAEAGLLayer {
    _eaglLayer = [CAEAGLLayer layer];
    _eaglLayer.frame = CGRectMake(0, 0, 300, 300);
    _eaglLayer.opaque = YES; //CALayer默认是透明的
    _eaglLayer.drawableProperties = [NSDictionary dictionaryWithObjectsAndKeys:[NSNumber numberWithBool:NO],kEAGLDrawablePropertyRetainedBacking,kEAGLColorFormatRGBA8,kEAGLDrawablePropertyColorFormat, nil];
    [self.view.layer addSublayer:_eaglLayer];
}
- (void)setupRenderBuffer {
    if (_colorRenderBuffer) {
        glDeleteRenderbuffers(1, &_colorRenderBuffer);
        _colorRenderBuffer = 0;
    }
    // 生成一个renderBuffer，id是_colorRenderBuffer
    glGenRenderbuffers(1, &_colorRenderBuffer);
    // 设置为当前renderBuffer，则后面引用GL_RENDERBUFFER，即指的是_colorRenderBuffer
    glBindRenderbuffer(GL_RENDERBUFFER, _colorRenderBuffer);
    //为color renderbuffer 分配存储空间
    [_eaglContext renderbufferStorage:GL_RENDERBUFFER fromDrawable:_eaglLayer];
}
- (void)setupFrameBuffer {
    if (_frameBuffer) {
        glDeleteFramebuffers(1, &_frameBuffer);
        _frameBuffer = 0;
    }
    // FBO用于管理colorRenderBuffer，离屏渲染
    glGenFramebuffers(1, &_frameBuffer);
    //设置为当前framebuffer
    glBindFramebuffer(GL_FRAMEBUFFER, _frameBuffer);
    // 将 _colorRenderBuffer 装配到 GL_COLOR_ATTACHMENT0 这个装配点上
    glFramebufferRenderbuffer(GL_FRAMEBUFFER, GL_COLOR_ATTACHMENT0, GL_RENDERBUFFER, _colorRenderBuffer);
}


@end
