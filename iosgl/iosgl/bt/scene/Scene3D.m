//
//  Scene3D.m
//  iosgl
//
//  Created by zhao on 8/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//
#import <GLKit/GLKit.h>
#import "Display3D.h"
#import "Context3D.h"
#import "Scene3D.h"


@implementation Scene3D
- (instancetype)init:(UIView*)uiview;
{
    self = [super init];
    if (self) {
        self.uiView=uiview;
        [self setUpLayer];
        self.context3D=[[Context3D alloc]init];
        self.camera3D=[[Camera3D alloc]init];
        self.displayList=[[NSMutableArray alloc]init];
    
        self.viewRect=[[Rectangle alloc]x:0 y:0 width:300 height:500];

        self.sceneScale=1.0;
        [self.uiView setContentScaleFactor:1];
        [self resetViewport];
            
     
    }
    return self;
}
-(void)setSceneScale:(float)value;
{
    _sceneScale=value;
        [self.uiView setContentScaleFactor:_sceneScale];
}
-(float)sceneScale;
{
    return _sceneScale;
}
-(void) upFrame  ;
{
    [self.camera3D upFrame];
    for(int i=0;i<self.displayList.count;i++){
        Display3D *dis= self.displayList[i];
        [dis upFrame];
    }
}
-(void)resetViewport;
{
    [self setupDephtBuffer];
    [self setupRenderBuffer];
    [self setupFrameBuffer];
    glViewport(0,0,300,500);
    glFramebufferRenderbuffer(GL_FRAMEBUFFER, GL_COLOR_ATTACHMENT0, GL_RENDERBUFFER, self.myColorRenderBuffer);
    glFramebufferRenderbuffer(GL_FRAMEBUFFER, GL_DEPTH_ATTACHMENT, GL_RENDERBUFFER, self.mydepthRenderBuffer);
    glBindRenderbuffer(GL_RENDERBUFFER, self.myColorRenderBuffer);

}
-(void) addDisplay:(Display3D*)dis;
{
    dis.scene3d=self;
    [self.displayList addObject:dis];
}
-(void) clearAll;
{
    [self.displayList removeAllObjects];
}

-(void)setupRenderBuffer
{
    GLuint buffer;
    if(self.myColorRenderBuffer ){
        return;
    }
    glGenRenderbuffers(1, &buffer);
    self.myColorRenderBuffer = buffer;
    glBindRenderbuffer(GL_RENDERBUFFER, self.myColorRenderBuffer);
    [self.context3D.gl renderbufferStorage:GL_RENDERBUFFER fromDrawable:self.myEAGLayer];
    
    
}
-(void)setupDephtBuffer
{
    
  
    GLuint depthBuffer;
   if(self.mydepthRenderBuffer){
         depthBuffer=self.mydepthRenderBuffer;
    }
    GLint width=self.viewRect.weight*_sceneScale;
    GLint height=self.viewRect.height*_sceneScale;
    glGenRenderbuffers(1, &depthBuffer);
    glBindRenderbuffer(GL_RENDERBUFFER, depthBuffer);
    glRenderbufferStorage(GL_RENDERBUFFER, GL_DEPTH_COMPONENT16, width, height);
    self.mydepthRenderBuffer=depthBuffer;
    
}
-(void)setupFrameBuffer
{
    GLuint buffer;
    if(self.myColorFrameBuffer){
        return;
    }
    glGenFramebuffers(1, &buffer);
    self.myColorFrameBuffer = buffer;
    glBindFramebuffer(GL_FRAMEBUFFER, self.myColorFrameBuffer);
    glFramebufferRenderbuffer(GL_FRAMEBUFFER, GL_COLOR_ATTACHMENT0, GL_RENDERBUFFER, self.myColorRenderBuffer);
    
    
 
}


//1、设置图层
-(void)setUpLayer
{
    //1、设置图层
    self.myEAGLayer = (CAEAGLLayer *) self.uiView.layer;
    [self.uiView setContentScaleFactor:1.0];
    self.myEAGLayer.opaque=YES;
    self.myEAGLayer.drawableProperties = [NSDictionary dictionaryWithObjectsAndKeys:[NSNumber numberWithBool:false],
                                          kEAGLDrawablePropertyRetainedBacking,kEAGLColorFormatRGBA8,kEAGLDrawablePropertyColorFormat,nil];
 
    
    GLKView *dd=[[GLKView alloc]init];
     dd.drawableColorFormat = GLKViewDrawableColorFormatRGBA8888;  //颜色缓冲区格式
    [EAGLContext setCurrentContext:self.context3D.gl];
}


@end
