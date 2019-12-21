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
#import "SceneRes.h"
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
     self.numskip+=1;
    [self.scene3D.viewMatrix isIdentity];
    [self.scene3D.viewMatrix perspectiveFieldOfViewLH:1 aspectRatio:1 zNear:0.01 zFar:100];
 
    Matrix3D *m =[[Matrix3D alloc]init];
    
    [m appendRotation: self.numskip axis:Vector3D.Y_AXIS];
    [m appendTranslation: 0.0 y:0 z:10];
    [self.scene3D.viewMatrix prepend:m];
    
    
    
    [self.scene3D upFrame];
    [self.scene3D.context3D.gl presentRenderbuffer:GL_RENDERBUFFER];
    
}

-(void)initConfigScene
{
    self.scene3D=[[Scene3D alloc]init:self];
    
    
    Display3DSprite *tempDic=[[Display3DSprite alloc]init];
    [tempDic.posMatrix3d appendScale: 0.015 y:0.015 z:0.015];
    [tempDic loadShaderByUrl:@"shadertwo"];
    [tempDic loadTextureResByUrl:@"xinshoupic.png"];
    [tempDic loadObjDataByUrl:@"file:///D:/work/cannondemo/cannondemo/res/wudiqiuqiu/changjing/guankajibenmoxing/014/014_0.xml"];
    [self.scene3D addDisplay:tempDic];
    
    
    [NSTimer scheduledTimerWithTimeInterval:1.0/60.0 target:self selector:@selector(upFrame) userInfo:nil repeats:YES];
}
-(void)layoutSubviews
{
    SceneRes *sceneRes=[[SceneRes alloc]init];
    [sceneRes load:@"1001_base"  Block:^(NSDictionary *responseJson) {
         [self initConfigScene];
    }];
    
}


@end
