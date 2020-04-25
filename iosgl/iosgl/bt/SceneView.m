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
#import "BuildDisplay3DSprite.h"
#import "Scene3D.h"
#import "SceneRes.h"
#import "MathCore.h"
#import "Scene_data.h"
#import "MaterialManager.h"
#import "GL_Header.h"


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
        [NSTimer scheduledTimerWithTimeInterval:1.0/60.0 target:self selector:@selector(upFrame) userInfo:nil repeats:YES];
    }
    return self;
}

-(void)upFrame{
    
    if(self.scene3D){
        
        glClearColor(0.18f, 0.04f, 0.14f, 1.0f);
        glFrontFace(GL_CW); //绘制方向
        glDepthFunc(GL_LESS);
        glCullFace(GL_FRONT); //正面踢出
        glClear(GL_COLOR_BUFFER_BIT|GL_DEPTH_BUFFER_BIT);
        glBlendFunc(GL_ONE, GL_ONE_MINUS_SRC_ALPHA);
        glEnable(GL_DEPTH_TEST);
        
        [self.scene3D upFrame];
        [self.scene3D.context3D.gl presentRenderbuffer:GL_RENDERBUFFER];
        
    }
    
}
- (void)layoutSubviews
{
    [super layoutSubviews];
    NSLog(@"--->%f--->%f" ,self.frame.size.width,self.frame.size.height);
    [MathCore traceTmNow];
    if(self.scene3D){
        self.scene3D.camera3D.fovw=self.frame.size.width;
        self.scene3D.camera3D.fovh=self.frame.size.height;
        [self.scene3D.camera3D upFrame];
    }
}
- (void)touchesMoved:(NSSet *)touches withEvent:(UIEvent *)event {
    
    if(self.scene3D){
        UITouch *touch = [touches anyObject];
        CGPoint currentPoint = [touch locationInView:self];
        CGPoint prePoint = [touch previousLocationInView:self];
        CGFloat offsetX = currentPoint.x - prePoint.x;
        CGFloat offsetY = currentPoint.y - prePoint.y;
        
        self.scene3D.camera3D.rotationX +=offsetY;
        self.scene3D.camera3D.rotationY -=offsetX;
        [self.scene3D.camera3D upFrame];
    }
}
-(void)makeEemptyScene;
{
    if(!self.scene3D){
        self.scene3D=[[Scene3D alloc]init:self];
    }
}
-(void)parsingBuildItem:(NSDictionary*)value;
{
    
    int type=   [value[@"type"]intValue];
    switch (type) {
        case 1:
            [self addBuildDisplay3DSprite:value];
            break;
            
        default:
            break;
    }
    
}
-(void)addBuildDisplay3DSprite:(NSDictionary*)value;
{
    BuildDisplay3DSprite *tempDis=[[BuildDisplay3DSprite alloc]init];
    [tempDis setInfo:value];
    [self.scene3D addDisplay:tempDis];
}
- (void)loadSeceneByUrl:(NSString *)url
{
    NSString* webUrl=[[Scene_data default]getWorkUrlByFilePath:getMapUrl(url)];
    SceneRes *sceneRes=[[SceneRes alloc]init];
    [sceneRes load:webUrl  bfun:^(NSString *value) {
        NSArray *buildItem=[sceneRes.sceneData objectForKey:@"buildItem"];
        [self makeEemptyScene];
        for(int i=0;i<buildItem.count;i++){
       
            if( [buildItem[i][@"id"]intValue]==58){
                 [self parsingBuildItem:buildItem[i]];
            }
            
            
        }
        NSLog(@"--");
    }];
}


@end

