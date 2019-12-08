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
    
    [self.scene3D upFrame];
    
    [_scene3D.context3D presentRenderbuffer:GL_RENDERBUFFER];
    
    
}
-(void)layoutSubviews
{
 
 
    _scene3D=[[Scene3D alloc]init:self];
    _dispOne=[[Display3DSprite alloc]init];
 //   _dispOne.scene=_scene3D;
    _dispTwo=[[Display3DSprite alloc]init];
  //  _dispTwo.scene=_scene3D;

    [NSTimer scheduledTimerWithTimeInterval:1.0/10.0 target:self selector:@selector(upFrame) userInfo:nil repeats:YES];
    
}


@end
