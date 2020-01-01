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
#import "SceneDisplay3DSprite.h"
#import "Scene3D.h"
#import "SceneRes.h"
#import "MaterialManager.h"


@interface SceneView ()
 
 
 
 
 
 
@end
@implementation SceneView


+(Class)layerClass
{
    return [CAEAGLLayer class];
}
- (instancetype)init
{
    self = [super init];
    if (self) {
  
    }
    return self;
}
-(void)upFrame{
    
    glClearColor(0.0f, 0.0f, 0.0f, 1.0f);
    
   
    
    // glDepthFunc(GL_LESS);
    /*
    glEnable(GL_CULL_FACE);
    glCullFace(GL_FRONT);
    glFrontFace(GL_CCW);
    glEnable(GL_DEPTH_TEST);

    glClear(GL_COLOR_BUFFER_BIT|GL_DEPTH_BUFFER_BIT|GL_STENCIL_BUFFER_BIT);
    */
   // glDisable(GL_DEPTH_TEST);
    // glDisable(GL_CULL_FACE);
    
    /*
     GLV.glDisable(GL_BLEND);
     GLV.glDisable(GL_ALPHA_TEST);
     GLV.glDisable(GL_DEPTH_TEST);
     */
    
    glClearColor(0.18f, 0.04f, 0.14f, 1.0f);
    //glDisable(GL_DEPTH_TEST); //开启深度测试
    //glEnable(GL_CULL_FACE); //正反面
    //glFrontFace(GL_CW); //绘制方向
    //glCullFace(GL_BACK); //证明踢出
    glClear(GL_COLOR_BUFFER_BIT  );
    

    
    //  glFramebufferRenderbuffer(GL_FRAMEBUFFER, GL_DEPTH_COMPONENT, GL_RENDERBUFFER,    self.scene3D.mydepthRenderBuffer);
    //  glBindRenderbuffer(GL_RENDERBUFFER, self.scene3D.myColorRenderBuffer);
     glViewport(0, 0, self.frame.size.width*1.0, self.frame.size.height*1.0);
    self.scene3D.camera3D.distance=300;
    [self.scene3D upFrame];
    [self.scene3D.context3D.gl presentRenderbuffer:GL_RENDERBUFFER];
    
}
 
- (void)touchesMoved:(NSSet *)touches withEvent:(UIEvent *)event {
    
    UITouch *touch = [touches anyObject];
    CGPoint currentPoint = [touch locationInView:self];
    CGPoint prePoint = [touch previousLocationInView:self];
    CGFloat offsetX = currentPoint.x - prePoint.x;
    CGFloat offsetY = currentPoint.y - prePoint.y;
 
 
    self.scene3D.camera3D.rotationX +=offsetY;
    self.scene3D.camera3D.rotationY -=offsetX;
    [self.scene3D.camera3D upFrame];
 
}

 
-(void)initConfigScene:(SceneRes *)sceneRes
{
    
    NSArray *buildItem=[sceneRes.sceneData objectForKey:@"buildItem"];
    self.scene3D=[[Scene3D alloc]init:self];
    for(int i=0;i<buildItem.count;i++){
        [self addBuildSprite:buildItem[i]];
    }

    [NSTimer scheduledTimerWithTimeInterval:1.0/60.0 target:self selector:@selector(upFrame) userInfo:nil repeats:YES];
}
-(void)addBuildSprite:(NSDictionary*)value
{
    SceneDisplay3DSprite *tempDis=[[SceneDisplay3DSprite alloc]init];
    [tempDis setInof:value];
    [self.scene3D addDisplay:tempDis];
}
-(void)layoutSubviews
{
    SceneRes *sceneRes=[[SceneRes alloc]init];
    //5555_base
    //1001_base
    [sceneRes load:@"1001_base"  Block:^(NSDictionary *responseJson) {
        [self initConfigScene:sceneRes];
    }];
    
}


@end
