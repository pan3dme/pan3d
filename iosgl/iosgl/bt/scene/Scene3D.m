//
//  Scene3D.m
//  iosgl
//
//  Created by zhao on 8/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "Scene3D.h"
#import <GLKit/GLKit.h>
@implementation Scene3D
- (instancetype)init:(UIView*)uiview;
{
    self = [super init];
    if (self) {
        self.uiView=uiview;
        [self setUpLayer];
        [self setupContext];
 
    }
    return self;
}

 
//1、设置图层
-(void)setUpLayer
{
    //1、设置图层
    self.myEAGLayer = (CAEAGLLayer *) self.uiView.layer;
    
    //比例因子决定了内容如何从逻辑坐标空间(以点度量)映射到设备坐标空间(以像素度量)。这个值通常是1.0或2.0。更高的比例因子表明，
    //每一个点在屏幕上都有一个以上的像素表示。例如，如果比例因子为2.0，而绘制矩形的大小为50 x 50，则底层区域的大小为100 x 100像素。
    //2、设置比例因子
  //  [self setContentScaleFactor:[[UIScreen mainScreen] scale]];
    
   //   [self setContentScaleFactor:1.0];
    
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
    EAGLRenderingAPI api = kEAGLRenderingAPIOpenGLES2;
    EAGLContext * context = [[EAGLContext alloc]initWithAPI:api];
    if(context==NULL)
    {
        NSLog(@"Create Context Failed!");
        return;
    }
    if(![EAGLContext setCurrentContext:context])
    {
        NSLog(@"setCurrentContext failed!");
        return;
    }
    self.context3D=context;
   
}

@end
