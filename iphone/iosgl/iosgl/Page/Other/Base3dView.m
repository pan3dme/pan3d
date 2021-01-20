//
//  Base3dView.m
//  iosgl
//
//  Created by zhao on 3/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//
#import <UIKit/UIKit.h>
#import <GLKit/GLKit.h>
#import "Base3dView.h"


@implementation Base3dView
EAGLContext *_eaglContext; // OpenGL context,管理使用opengl es进行绘制的状态,命令及资源
CAEAGLLayer *_eaglLayer;

GLuint _colorRenderBuffer; // 渲染缓冲区
GLuint _frameBuffer; // 帧缓冲区


- (void)setupOpenGLContext {
    _eaglContext = [[EAGLContext alloc] initWithAPI:kEAGLRenderingAPIOpenGLES2]; //选择OpenGLES API版本
    [EAGLContext setCurrentContext:_eaglContext]; //设置为当前上下文。
}
- (void)setupCAEAGLLayer {
    _eaglLayer = [CAEAGLLayer layer];
    _eaglLayer.frame = CGRectMake(0, 0, 100, 100);
    _eaglLayer.opaque = YES; //CALayer默认是透明的
    
    // 描绘属性：这里不维持渲染内容
    // kEAGLDrawablePropertyRetainedBacking:若为YES，则使用glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA)计算得到的最终结果颜色的透明度会考虑目标颜色的透明度值。
    // 若为NO，则不考虑目标颜色的透明度值，将其当做1来处理。
    // 使用场景：目标颜色为非透明，源颜色有透明度，若设为YES，则使用glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA)得到的结果颜色会有一定的透明度（与实际不符）。若未NO则不会（符合实际）。
    _eaglLayer.drawableProperties = [NSDictionary dictionaryWithObjectsAndKeys:[NSNumber numberWithBool:NO],kEAGLDrawablePropertyRetainedBacking,kEAGLColorFormatRGBA8,kEAGLDrawablePropertyColorFormat, nil];
    [self.layer addSublayer:_eaglLayer];
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


- (instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        
        self.backgroundColor=[UIColor yellowColor];
        
        [self setupOpenGLContext];
        [self setupCAEAGLLayer];
        [self setupRenderBuffer];
        [self setupFrameBuffer];
        
        glClearColor(1.0f, 0.0f, 1.0f, 1.0f);
        
        glClear(GL_COLOR_BUFFER_BIT);
        
        _refreshTime = [NSTimer scheduledTimerWithTimeInterval:1.0/30.0 target:self selector:@selector(refreshTimeFun) userInfo:nil repeats:YES];
    }
    return self;
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


//重写绘图，调用刚才绘图的方法

-(void)drawRect:(CGRect)rect
{
    /*
     [self setupOpenGLContext];
     [self setupCAEAGLLayer];
     [self setupRenderBuffer];
     [self setupFrameBuffer];
     
     glClearColor(0.0f, 0.0f, 1.0f, 1.0f);
     
     glClear(GL_COLOR_BUFFER_BIT);
     */
    
    
    /*
     [self drawArrowRectangleTwo:rect];
     self.layer.shadowColor =[ [UIColor grayColor] CGColor];;
     self.layer.shadowOffset = CGSizeZero; //[水平偏移, 垂直偏移]
     self.layer.shadowOpacity = 0.5; // 0.0 ~ 1.0 的值
     self.layer.shadowRadius = 1.0; // 阴影发散的程度
     
     */
}


@end
