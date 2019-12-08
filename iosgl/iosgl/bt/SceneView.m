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


//1、设置图层
-(void)setUpLayer
{
    //1、设置图层
    self.myEAGLayer = (CAEAGLLayer *)self.layer;
    
    //比例因子决定了内容如何从逻辑坐标空间(以点度量)映射到设备坐标空间(以像素度量)。这个值通常是1.0或2.0。更高的比例因子表明，
    //每一个点在屏幕上都有一个以上的像素表示。例如，如果比例因子为2.0，而绘制矩形的大小为50 x 50，则底层区域的大小为100 x 100像素。
    //2、设置比例因子
    [self setContentScaleFactor:[[UIScreen mainScreen] scale]];
    
    /**3、我们要绘制的东西是完全不透明的，所以可以去设置为YES
     一个布尔值，该值指示该层是否包含完全不透明的内容。
     此属性的默认值为NO。如果您的应用程序绘制了完全不透明的内容，填充了该层的边界，那么将该属性设置为YES，
     可以让系统优化该层的呈现行为。具体地说，当该层为您的绘图命令创建后备存储时，Core Animation会省略该后备存储器的alpha通道。
     这样做可以提高合成操作的性能。如果将此属性的值设置为YES，则必须使用不透明的内容填充该层的边界。
     设置此属性只影响由Core Animation管理的后台存储。如果将一个带有alpha通道的图像分配给该层的内容属性，则该图像保留其alpha通道，而不考虑该属性的值。
     */
    self.myEAGLayer.opaque=YES;
    
    
    
    //4、设置描述属性，
    /*
     kEAGLDrawablePropertyRetainedBacking 设置是否需要保留已经绘制到图层上面的内容 用NSNumber来包装，kEAGLDrawablePropertyRetainedBacking
     为FALSE，表示不想保持呈现的内容，因此在下一次呈现时，应用程序必须完全重绘一次。将该设置为 TRUE 对性能和资源影像较大，
     因此只有当renderbuffer需要保持其内容不变时，我们才设置 kEAGLDrawablePropertyRetainedBacking  为 TRUE。
     kEAGLDrawablePropertyColorFormat 设置绘制对象内部的颜色缓冲区的格式 32位的RGBA的形式
     包含的格式
     kEAGLColorFormatRGBA8; 32位RGBA的颜色 4x8=32
     kEAGLColorFormatRGB565; 16位的RGB的颜色
     kEAGLColorFormatSRGBA8 SRGB
     */
    self.myEAGLayer.drawableProperties = [NSDictionary dictionaryWithObjectsAndKeys:[NSNumber numberWithBool:false],
                                          kEAGLDrawablePropertyRetainedBacking,kEAGLColorFormatRGBA8,kEAGLDrawablePropertyColorFormat,nil];
    
}
-(void)setupContext
{
    //1、指定API版本 1.0-3.0
    /*
     kEAGLRenderingAPIOpenGLES1 = 1,
     kEAGLRenderingAPIOpenGLES2 = 2,
     kEAGLRenderingAPIOpenGLES3 = 3,
     */
    EAGLRenderingAPI api = kEAGLRenderingAPIOpenGLES2;
    
    //2、创建图形上下文
    EAGLContext * context = [[EAGLContext alloc]initWithAPI:api];
    
    //3、判断是否创建成功
    if(context==NULL)
    {
        NSLog(@"Create Context Failed!");
        return;
    }
    //4、设置图形上下文
    if(![EAGLContext setCurrentContext:context])
    {
        NSLog(@"setCurrentContext failed!");
        return;
    }
    //5、将局部的context 变成全局的
    self.myContext = context;
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
    [self.myContext renderbufferStorage:GL_RENDERBUFFER fromDrawable:self.myEAGLayer];
    
    
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

       glViewport(0, 0, self.frame.size.width*2.0, self.frame.size.height*2.0);
       //3、读取顶点、片元着色器程序
       //读取存储路径
 
    //6、加载并使用链接好的程序
    /*
    GLuint selectProgram;;
 
    
    if(_skipnum  %10==0){
        selectProgram= self.shaderOne.program;
        glUseProgram(selectProgram);
        glBindTexture(_textureResOne.texture.target,_textureResOne.texture.name);
        glBindBuffer(GL_ARRAY_BUFFER, _objDataOne.verticesBuffer);

    }else{
        selectProgram= self.shaderTwo.program;
        glUseProgram(selectProgram);
        glBindTexture(_textureResTwo.texture.target,_textureResTwo.texture.name);
        glBindBuffer(GL_ARRAY_BUFFER, _objDataTwo.verticesBuffer);
    }

    
    GLuint rotateID = glGetUniformLocation( selectProgram, "rotateMatrix");
      [self.posMatrix3d prependTranslation:0.001 y:0 z:0];
      glUniformMatrix4fv(rotateID, 1, GL_FALSE, self.posMatrix3d.m);
    
    GLuint position = glGetAttribLocation( selectProgram, "position");
    
    glEnableVertexAttribArray(position);
    
    glVertexAttribPointer(position, 3, GL_FLOAT, GL_FALSE,sizeof(GLfloat)*5, NULL);
    
    GLuint textCoor = glGetAttribLocation( selectProgram, "textCoordinate");
    
    glEnableVertexAttribArray(textCoor);
    
    glVertexAttribPointer(textCoor, 2, GL_FLOAT, GL_FALSE, sizeof(GLfloat)*5, (GLfloat *)NULL+3);
    // [self setupTexture:@"03"];
    
    
    glDrawArrays(GL_TRIANGLES, 0, 6);
    
    */
    
        [_dispOne upFrame ];
    
    [self.myContext presentRenderbuffer:GL_RENDERBUFFER];
    
    
}
-(void)layoutSubviews
{
    
   // Vector3D *a=[[Vector3D alloc]x:0 y:88 z:0 w:1];
    
    //1、设置图层
    [self setUpLayer];

    
    //2、创建上下文
    [self setupContext];
    
    _scene3D=[[Scene3D alloc]init];
    _scene3D.context3D=self.myContext;
    
    self.shaderOne= [[Shader3D alloc]init];
      [self.shaderOne encodeVstr:[[NSBundle mainBundle]pathForResource:@"shadertwo" ofType:@"vsh"] encodeFstr:[[NSBundle mainBundle]pathForResource:@"shadertwo" ofType:@"fsh"]];
      
      self.shaderTwo= [[Shader3D alloc]init];
      [self.shaderTwo encodeVstr:[[NSBundle mainBundle]pathForResource:@"shaderone" ofType:@"vsh"] encodeFstr:[[NSBundle mainBundle]pathForResource:@"shaderone" ofType:@"fsh"]];
    
    _objDataOne=[[ObjData alloc]init];
    [_objDataOne upToGpu];
    _objDataTwo=[[ObjData alloc]init];
       [_objDataTwo upToGpu];
    
    
    _textureResOne=[[MaterialManager default] getMaterialByUrl:@"xinshoupic.png"];
    _textureResTwo=[[MaterialManager default] getMaterialByUrl:@"brdf_ltu.jpg"];
    
   // [self renderLayer];
    
    
    _dispOne=[[Display3DSprite alloc]init];
    _dispOne.scene=_scene3D;
    
    
    //3、清空缓冲区
    [self deleteRenderAndFrameBuffer];
    
    //4、设置RenderBuffer
    [self setupRenderBuffer];
    
    //5、设置frameBuffer
    [self setupFrameBuffer];
    
    //6、开始绘制
 
    
    _skipnum=0;
    [NSTimer scheduledTimerWithTimeInterval:1.0/10.0 target:self selector:@selector(upFrame) userInfo:nil repeats:YES];
    
}


@end
