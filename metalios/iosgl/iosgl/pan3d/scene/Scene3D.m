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
#import "ObjDataManager.h"
#import "ProgrmaManager.h"
#import "MaterialManager.h"
#import "MeshDataManager.h"
#import "GroupDataManager.h"
#import "MeshToObjUtils.h"
#import "ResManager.h"
#import "AnimManager.h"
#import "TimeUtil.h"
#import "Scene_data.h"
#import "MtkBaseLine.h"
#import "BuildDisplay3DSprite.h"
#import "Display3dMovie.h"
#import "GroupItem.h"
#import "SceneRes.h"
#import "MtkBaseDis.h"
#import "SceneMenager.h"
@interface Scene3D ()
@property(nonatomic,strong)UILabel* fpsLabel;
@property(nonatomic,strong)SceneMenager* sceneMenager;
@end
@implementation Scene3D
- (instancetype)init:(UIView *)value
{
    self = [super init];
    if (self) {
        self.uiView=value;
        self.mtkView = [[MTKView alloc] initWithFrame:self.uiView.bounds];
        self.mtkView.device = MTLCreateSystemDefaultDevice();
        self.mtkView.depthStencilPixelFormat = MTLPixelFormatDepth32Float_Stencil8;
        self.mtkView.delegate = self;
        [self.uiView insertSubview:self.mtkView atIndex:0];
        [self initData];
 
    }
    return self;
}
-(void)showFpsLabel;
{
    if(self.fpsLabel==nil){
        self.fpsLabel=[[UILabel alloc]init];
        self.fpsLabel.frame=CGRectMake(0, 50, 100, 20);
        self.fpsLabel.text=@"60fps";
        self.fpsLabel.backgroundColor=[UIColor redColor];
        [self.uiView addSubview:self.fpsLabel];
    }

}
 
-(UIButton*)makeButtion;
{
    UIButton* but=[[UIButton alloc]initWithFrame:CGRectMake(0, 50, 50, 30)];
    [but setTitle:@"1" forState:UIControlStateNormal];
    but.backgroundColor=[UIColor redColor];
    but.layer.cornerRadius = 15; // 圆角的弧度
    but.layer.masksToBounds = YES;
    [self.uiView addSubview:but];
    
    return but;
}
-(void)initData
{
    self.sceneMenager=[[SceneMenager alloc]init:self];
    self.textureManager=[[TextureManager alloc] init:self];
    self.objDataManager=[[ObjDataManager alloc]init:self];
    self.materialManager=[[MaterialManager alloc]init:self];
    self.progrmaManager=[[ProgrmaManager alloc]init:self];
    self.meshDataManager=[[MeshDataManager alloc]init:self];
    self.groupDataManager=[[GroupDataManager alloc]init:self];
    self.particleManager=[[ParticleManager alloc]init:self];
    self.resManager=[[ResManager alloc]init:self];
    self.animManager=[[AnimManager alloc]init:self];
    self.meshToObjUtils=[[MeshToObjUtils alloc]init:self];
    self.camera3D=[[Camera3D alloc]init];
    self.camera3D.rotationX=-15;
    [self resieSize:self.mtkView.drawableSize];
    self.context3D=[[Context3D alloc] init:self.mtkView ];
    self.displayList=[[NSMutableArray alloc] init];
    self.displayRoleList=[[NSMutableArray alloc] init];
 
}
 
-(void) loadSceneByUrl:(NSString*)value;
{
    [self.sceneMenager loadSeceneByUrl:value];
}

-(void)playLyfByUrl:(NSString*)value
{

    ParticleManager* particleManager=  self.particleManager;
    NSString* modeurl =[[Scene_data default]getWorkUrlByFilePath:value];
    [self.groupDataManager getGroupData:modeurl Block:^(GroupRes *groupRes) {
        for (int i = 0; i < groupRes.dataAry.count; i++) {
            GroupItem *item = groupRes.dataAry[i];
            if (item.types ==SCENE_PARTICLE_TYPE) {
                CombineParticle*  particle =   [particleManager   getParticleByte: item.particleUrl];
                [particleManager addParticle:particle];
            } else {
                NSLog(@"播放的不是单纯特效");
            }
        }
    }];
}

- (void)drawInMTKView:(nonnull MTKView *)view {
    [self.context3D mtkclearColor:[[Vector3D alloc]x:0.16 y:0.16 z:0.16 w:1]];
 
    [self update];
    
    [self.context3D mtkpresent];
}

 
- (void)mtkView:(nonnull MTKView *)view drawableSizeWillChange:(CGSize)size {
    [self resieSize:size];
}
-(void)resieSize:(CGSize)size
{
    self.camera3D.fovw=size.width;
    self.camera3D.fovh=size.height;
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
-(void) update  ;
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
    [self.context3D setDepthTest:NO];
//    [self.skillManager update];
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
 
-(void) addDisplay:(Display3D*)dis;
{
    [self.displayList addObject:dis];
}
-(void) addMovieDisplay:(Display3dMovie*)dis;
{
 
    [self.displayRoleList addObject:dis];
}
-(void) clearAll;
{
    [self.displayList removeAllObjects];
    [self.displayRoleList removeAllObjects];
    [self.particleManager removeAll];
}
 


@end
