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
    [self.scene3D.context3D.gl presentRenderbuffer:GL_RENDERBUFFER];
    
}

-(void)initConfigScene
{
    self.scene3D=[[Scene3D alloc]init:self];
    
    
    Display3DSprite *dispOne=[[Display3DSprite alloc]init];
    Display3DSprite *dispTwo=[[Display3DSprite alloc]init];
    
    
    [dispOne.posMatrix3d prependScale:0.75 y:0.1 z:1];
    [dispTwo.posMatrix3d prependScale:0.1 y:0.75 z:1];
    
   //     [dispTwo.posMatrix3d prependRotation:45 axis: ];
    
 
    
    [self.scene3D addDisplay:dispOne];
    [self.scene3D addDisplay:dispTwo];
    
    [NSTimer scheduledTimerWithTimeInterval:1.0/60.0 target:self selector:@selector(upFrame) userInfo:nil repeats:YES];
}
-(void)layoutSubviews
{
    
    [self initConfigScene];
    
    
}


@end
