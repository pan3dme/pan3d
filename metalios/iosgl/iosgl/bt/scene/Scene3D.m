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
#import "Display3dMovie.h"
#import "ParticleManager.h"
#import "TextureManager.h"
#import "TimeUtil.h"
#import "Scene_data.h"
@interface Scene3D ()
@property(nonatomic,strong)UILabel* fpsLabel;
@end
@implementation Scene3D
- (instancetype)init:(UIView*)uiview;
{
    self = [super init];
    if (self) {
        self.uiView=uiview;
        [self setUpLayer];
        self.context3D=[[Context3D alloc]init];
        self.camera3D=[[Camera3D alloc]init];
        self.displayRoleList=[[NSMutableArray alloc]init];
        self.displayList=[[NSMutableArray alloc]init];
        self.particleManager=[[ParticleManager alloc]init];
        self.skillManager=[[SkillManager alloc]init];
        self.viewRect=[[Rectangle alloc]x:0 y:0 width:360 height:360];
        self.time=[[TimeUtil default]getTimer];
        self.sceneScale=1.0;
        [self.uiView setContentScaleFactor:1];
        [self resetViewport];
        self.camera3D.rotationX=-45;
        
        self.fpsLabel=[[UILabel alloc]init];
        self.fpsLabel.frame=CGRectMake(0, 0, 100, 20);
        self.fpsLabel.text=@"60fps";
        self.fpsLabel.backgroundColor=[UIColor redColor];
        [self.uiView addSubview:self.fpsLabel];
        
        [[TextureManager default] loadCubeTexture:@"base/cube/f01.jpg" fun:^(GLuint cubeTexture) {
            [Scene_data default].skyCubeTexture=cubeTexture;
        }];
        
 
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
    [self updateFrameRole];
    [self.context3D setDepthTest:YES];
    for(int i=0;i<self.displayList.count;i++){
        [self.displayList[i] upFrame];
    }
    for(int i=0;i<self.displayRoleList.count;i++){
        [self.displayRoleList[i] upFrame];
    }
    self.particleManager.scene3d=self;
    [self.context3D setDepthTest:NO];
    [self.skillManager update];
    [self.particleManager update];
}
-(void)updateFrameRole;
{
    double _tempTime = [[TimeUtil default]getTimer];
    double delay =  _tempTime - self.time;
    self.fpsLabel.text=[NSString stringWithFormat:@"%d fps",(int)(1000/delay)];
    self.time=_tempTime;
    for(int i=0;i<self.displayRoleList.count;i++){
        [self.displayRoleList[i] updateFrame:delay];
    }
}
-(void)resetViewport;
{
 
}
-(void) addDisplay:(Display3D*)dis;
{
    dis.scene3d=self;
    [self.displayList addObject:dis];
}
-(void) addMovieDisplay:(Display3dMovie*)dis;
{
    dis.scene3d=self;
    [self.displayRoleList addObject:dis];
}
-(void) clearAll;
{
    [self.displayList removeAllObjects];
    [self.displayRoleList removeAllObjects];
    [self.particleManager removeAll];
}
/*
 设置渲染层Buff;
 */
-(void)setupRenderBuffer
{
}
/*
设置渲深度Buff;
*/
-(void)setupDephtBuffer
{
}
/*
设置渲FrameBuff;
*/
-(void)setupFrameBuffer
{
}
//1、设置图层
-(void)setUpLayer
{
 
   
}


@end
