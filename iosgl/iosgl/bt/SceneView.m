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
 
+(Class)layerClass
{
    return [CAEAGLLayer class];
}
-(void)upFrame{
    glClearColor(0.0f, 1.0f, 0.0f, 1.0f);
    glClear(GL_COLOR_BUFFER_BIT);
    glViewport(0, 0, self.frame.size.width*1.0, self.frame.size.height*1.0);
    [self.scene3D upFrame];
    [self.scene3D.context3D presentRenderbuffer:GL_RENDERBUFFER];
 
}
 
-(void)initConfigScene
{
    self.scene3D=[[Scene3D alloc]init:self];
    Display3DSprite *dispOne=[[Display3DSprite alloc]init];
    Display3DSprite *dispTwo=[[Display3DSprite alloc]init];
    dispTwo.rotationZ=45;
    [self.scene3D addDisplay:dispOne];
    [self.scene3D addDisplay:dispTwo];
 
    [NSTimer scheduledTimerWithTimeInterval:1.0/10.0 target:self selector:@selector(upFrame) userInfo:nil repeats:YES];
}
-(void)layoutSubviews
{
    
      [self initConfigScene];

    
}


@end
