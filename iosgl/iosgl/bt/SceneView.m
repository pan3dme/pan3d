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

@implementation SceneView

+(Class)layerClass
{
    return [CAEAGLLayer class];
}
-(void)upFrame{
    /*
     glClearColor(0.0f, 1.0f, 0.0f, 1.0f);
     glClearDepthf(1.0);
     glDepthFunc(GL_LESS);
     glEnable(GL_DEPTH_TEST);
     glDepthMask(YES);
     glEnable(GL_BLEND);
     glFrontFace(GL_CW);
     glCullFace(GL_CULL_FACE );
     glClear(GL_COLOR_BUFFER_BIT|GL_DEPTH_BUFFER_BIT);
     */
    
    
    glClearColor(0.0f, 0.0f, 0.0f, 1.0f);
    
    
    glDepthFunc(GL_LESS);
    
    glEnable(GL_CULL_FACE);
    glCullFace(GL_FRONT);
    
    
    glClear(GL_COLOR_BUFFER_BIT|GL_DEPTH_BUFFER_BIT);
    glViewport(0, 0, self.frame.size.width*1.0, self.frame.size.height*1.0);
     
  
    [self.scene3D upFrame];
    [self.scene3D.context3D.gl presentRenderbuffer:GL_RENDERBUFFER];
    
    [self addMouseEvents];
    
}
-(void)addMouseEvents
{
    
    UIView *flowView=self;
    //添加滑动手势事件
    UIPanGestureRecognizer *gestureRecognizer = [[UIPanGestureRecognizer alloc] initWithTarget:flowView action:@selector(handleGesture:)];
    [flowView addGestureRecognizer:gestureRecognizer];
      
    //添加点击手势事件
    flowView.userInteractionEnabled = YES;
    UITapGestureRecognizer *tap = [[UITapGestureRecognizer alloc] initWithTarget:flowView action:@selector(goBigImageView)];
    [flowView addGestureRecognizer:tap];
}
-(void)goBigImageView;
{
           NSLog(@"goBigImageView");
}

- (void)handleGesture:(UIPanGestureRecognizer *)recognizer {
    //UITapGestureRecognizer
   if (recognizer.state == UIGestureRecognizerStateChanged){
       NSLog(@"UIGestureRecognizerStateChanged");
   }else if(recognizer.state == UIGestureRecognizerStateEnded){
       NSLog(@"UIGestureRecognizerStateEnded");
   }else if(recognizer.state == UIGestureRecognizerStateBegan){
       NSLog(@"UIGestureRecognizerStateBegan");
   }else if(recognizer.state == UIGestureRecognizerStateCancelled){
       NSLog(@"UIGestureRecognizerStateCancelled");
   }else if(recognizer.state == UIGestureRecognizerStateFailed){
       NSLog(@"UIGestureRecognizerStateFailed");
   }else if(recognizer.state == UIGestureRecognizerStatePossible){
       NSLog(@"UIGestureRecognizerStatePossible");
   }else if(recognizer.state == UIGestureRecognizerStateRecognized){
       NSLog(@"UIGestureRecognizerStateRecognized");
   }
  
}
-(void)mouseDownClik
{
    NSLog(@"here");
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
    [sceneRes load:@"5555_base"  Block:^(NSDictionary *responseJson) {
        [self initConfigScene:sceneRes];
    }];
    
}


@end
