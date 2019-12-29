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
    
    self.numskip=self.numskip+0.51;
    
    [self.scene3D.viewMatrix isIdentity];
    [self.scene3D.viewMatrix perspectiveFieldOfViewLH:1 aspectRatio:1 zNear:0.01 zFar:1000];
    
    Matrix3D *m =[[Matrix3D alloc]init];
    [m appendRotation: self.numskip axis:Vector3D.Y_AXIS];
    [m appendTranslation: 0.0 y:0 z:100];
    [self.scene3D.viewMatrix prepend:m];
    
    [self.scene3D upFrame];
    [self.scene3D.context3D.gl presentRenderbuffer:GL_RENDERBUFFER];
    
}

-(void)initConfigScene:(SceneRes *)sceneRes
{
  
       NSArray *buildItem=[sceneRes.sceneData objectForKey:@"buildItem"];
   // [0]    (null)    @"buildItem" : @"6 elements"
    self.scene3D=[[Scene3D alloc]init:self];
    
    for(int i=0;i<buildItem.count;i++){
         
            
       
          
       

    }
          [self addBuildSprite:buildItem[0]];
    /*
    Display3DSprite *tempDis=[[Display3DSprite alloc]init];
    tempDis.x=0;
    tempDis.y=0;
    tempDis.z=0;
    tempDis.scaleX=0.15;
    tempDis.scaleY=0.15;
    tempDis.scaleZ=0.15;
    [tempDis loadShaderByUrl:@"shadertwo"];
    [tempDis loadTextureResByUrl:@"xinshoupic.png"];
    [tempDis loadObjDataByUrl:@"file:///D:/work/cannondemo/cannondemo/res/wudiqiuqiu/changjing/guankajibenmoxing/014/014_0.xml"];
    [self.scene3D addDisplay:tempDis];
    */
    
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
    //1001_base
   //5555_base
    
    [sceneRes load:@"5555_base"  Block:^(NSDictionary *responseJson) {
        [self initConfigScene:sceneRes];
    }];
    
}


@end
