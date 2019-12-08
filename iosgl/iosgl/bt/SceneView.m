//
//  SceneView.m
//  iosgl
//
//  Created by zhao on 7/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "SceneView.h"
#import <GLKit/GLKit.h>
#import "Matrix3D.h"
#import "Vector3D.h"
#import "TextureRes.h"
#import "Scene3D.h"
#import "MaterialManager.h"

@implementation SceneView
   
@synthesize name = _name;
- (void)setName:(NSString *)name{
    _name = name;
}
-(NSString *)name{
    return _name;
}
+(Class)layerClass
{
    return [CAEAGLLayer class];
}
- (instancetype)init
{
    self = [super init];
    if (self) {
        self.posMatrix3d =  [[Matrix3D alloc]init];
      
    }
    return self;
}

 

//3、清空缓冲区
-(void)deleteRenderAndFrameBuffer
{
    /**
     buffer分为FrameBuffer和Render Buffer 两大类
     frameBuffer(FBO)相当于renderBuffer的管理者
     renderBuffer分为3类，一个是colorBuffer，depthBuffer,stencilBuffer
     删除缓存空间
     */
    glDeleteBuffers(1, &_myColorRenderBuffer);
    
    //为了安全释放，所以将myColorRenderBuffer置为0
    self.myColorRenderBuffer = 0;
    
    glDeleteBuffers(1, &_myColorFrameBuffer);
    self.myColorFrameBuffer=0;
    
}


-(void)setupRenderBuffer
{
    //1、定义一个缓冲区
    GLuint buffer;
    
    //2、申请一个缓冲区标记
    glGenRenderbuffers(1, &buffer);
    
    //3、赋值给全局属性
    self.myColorRenderBuffer = buffer;
    
    //4、将缓冲区绑定到指定的空间中，把colorRenderbuffer绑定在OpenGL ES的渲染缓存GL_RENDERBUFFER上
    glBindRenderbuffer(GL_RENDERBUFFER, self.myColorRenderBuffer);
    
    /*5、
     通过调用上下文的renderbufferStorage:fromDrawable:方法并传递层对象作为参数来分配其存储空间。宽度，高度和像素格式取自层，
     用于为renderbuffer分配存储空间*/
    [_scene3D.context3D renderbufferStorage:GL_RENDERBUFFER fromDrawable:_scene3D.myEAGLayer];
    
    
}
-(void)setupFrameBuffer
{
    //1、定义一个缓冲区标记
    
    GLuint buffer;
    
    //2、申请一个缓存区标记
    glGenFramebuffers(1, &buffer);
    
    //3、设置给全局属性
    self.myColorFrameBuffer = buffer;
    
    //4、将缓冲区绑定到指定的空间中
    glBindFramebuffer(GL_FRAMEBUFFER, self.myColorFrameBuffer);
    
    
    //5、把GL_RENDERBUFFER里的colorRenderbuffer附在GL_FRAMEBUFFER的GL_COLOR_ATTACHMENT0（颜色附着点0）上
    glFramebufferRenderbuffer(GL_FRAMEBUFFER, GL_COLOR_ATTACHMENT0, GL_RENDERBUFFER, self.myColorRenderBuffer);
    
}
 
  
 
-(void)upFrame{
    
   // NSLog(@"-----skipnum=>%d",_skipnum++);

    //1、开始写入顶点着色器、片元着色器
       //Vextex Shader
       //Fragment Shader
       
       //已经写好了顶点shaderv.vsh、片元着色器shaderf.fsh
       glClearColor(0.0f, 1.0f, 0.0f, 1.0f);
       //清除颜色缓冲区
       glClear(GL_COLOR_BUFFER_BIT);

       glViewport(0, 0, self.frame.size.width*1.0, self.frame.size.height*1.0);
     
    _dispOne.rotationZ=45;
    
        [_dispOne upFrame ];
         [_dispTwo upFrame ];
    
    [_scene3D.context3D presentRenderbuffer:GL_RENDERBUFFER];
    
    
}
-(void)layoutSubviews
{
    
   // Vector3D *a=[[Vector3D alloc]x:0 y:88 z:0 w:1];
    
    //1、设置图层
  //  [self setUpLayer];
 
    _scene3D=[[Scene3D alloc]init:self];
  
   // [self renderLayer];
    
    
    _dispOne=[[Display3DSprite alloc]init];
    _dispOne.scene=_scene3D;
    
    _dispTwo=[[Display3DSprite alloc]init];
    _dispTwo.scene=_scene3D;
    
    
    //3、清空缓冲区
   // [self deleteRenderAndFrameBuffer];
    
    //4、设置RenderBuffer
    [self setupRenderBuffer];
    
    //5、设置frameBuffer
     [self setupFrameBuffer];
    
    //6、开始绘制
 
    
    _skipnum=0;
    [NSTimer scheduledTimerWithTimeInterval:1.0/10.0 target:self selector:@selector(upFrame) userInfo:nil repeats:YES];
    
}


@end
