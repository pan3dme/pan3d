//
//  TokenSceneView.m
//  iosgl
//
//  Created by zhao on 21/2/2020.
//  Copyright © 2020 zhao. All rights reserved.
//
#import "AppWorldHeader.h"
#import "TokenSceneView.h"
#import "SceneView.h"
#import "GroupDataManager.h"
#import "SceneDisplay3DSprite.h"
#import "ObjDataManager.h"
#import "GroupItem.h"
#import "CombineParticle.h"
#import "ParticleManager.h"
#import "Display3DSprite.h"
@interface TokenSceneView ()
@property (nonatomic, strong) SceneView *sceneView;
@end

@implementation TokenSceneView

- (void)viewDidLoad {
    [super viewDidLoad];
    
    self.sceneView=[[SceneView alloc]init];
    self.sceneView.frame=CGRectMake(10, 100, 300, 300);
    [self.view addSubview:  self.sceneView];
    [self addLisienEvent];
 
    
    NSLog(@"%@",AppName);
    
}
-(void)addLisienEvent{
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(loadSceneEvent:) name:@"loadScneInfo" object:nil];
    
}
-(void)loadSceneEvent:(NSNotification *)notification{
    NSLog(@"here");
}

- (IBAction)scene_but_1_clik:(id)sender {
    NSMutableDictionary *mDict = [[NSMutableDictionary alloc]init];
    [mDict setObject:@"cctv"  forKey:@"data"];
    [[NSNotificationCenter defaultCenter]postNotificationName:@"loadScneInfo" object:mDict];
    
     [self.sceneView loadSeceneByUrl:@"5555_base"];
}

- (IBAction)scene_but_2_clik:(id)sender {
     //[self.sceneView loadSeceneByUrl:@"1001_base"];
    [self.sceneView makeEemptyScene];
    
  
     // [self.scene3D addDisplay:tempDis];
}

- (IBAction)zoom_max_clik:(id)sender {
    
    /*
    [UIView beginAnimations:nil context:nil];
    [UIView setAnimationDuration:0.5];
    [UIView setAnimationDelegate:self];
    self.sceneView.frame =CGRectMake(20, 120, 300, 500);
    [UIView commitAnimations];
    */
    
 
       [self.sceneView makeEemptyScene];
    [[GroupDataManager default]getGroupData:@"baoxiang001_base" Block:^(GroupRes *groupRes) {
  
        for(int i=0;i<groupRes.dataAry.count;i++){
            GroupItem *groupItem= groupRes.dataAry[i];
            NSMutableDictionary *infodic=[[NSMutableDictionary alloc]init];
            [infodic setValue:  groupItem.objUrl forKey:@"objsurl"];
            [infodic setValue:@"1" forKey:@"scaleX"];
            [infodic setValue:@"1" forKey:@"scaleY"];
            [infodic setValue:@"1" forKey:@"scaleZ"];
            SceneDisplay3DSprite *tempDis=[[SceneDisplay3DSprite alloc]init];
            [tempDis setInof:infodic];
            [self.sceneView.scene3D addDisplay:tempDis];
        }
    }];
 
}

- (IBAction)zoom_min_clik:(id)sender {
    /*
    [UIView beginAnimations:nil context:nil];
    [UIView setAnimationDuration:0.5];
    self.sceneView.frame =CGRectMake(20, 120, 300, 300);
    [UIView commitAnimations];
    */
     [self.sceneView makeEemptyScene];
    //     [self.sceneView.scene3D addDisplay:[[Display3DSprite alloc]init]];
    ParticleManager* particleManager=  self.sceneView.scene3D.particleManager;
    [[GroupDataManager default] getGroupData:@"levelup_base" Block:^(GroupRes *groupRes) {
        for (int i = 0; i < groupRes.dataAry.count; i++) {
            GroupItem *item = groupRes.dataAry[i];
            if (item.types ==SCENE_PARTICLE_TYPE) {
                CombineParticle*  particle =  [[ParticleManager default] getParticleByte: item.particleUrl];
                [particleManager addParticle:particle];
            } else {
                NSLog(@"播放的不是单纯特效");
            }
        }
        
    }];
}
/*
 for (var i: number = 0; i < groupRes.dataAry.length; i++) {
     var item: Pan3d.GroupItem = groupRes.dataAry[i];
     if (item.types == Pan3d.BaseRes.SCENE_PARTICLE_TYPE) {
         var $particle: Pan3d.CombineParticle = $scene.particleManager.getParticleByte(Pan3d.Scene_data.fileRoot + item.particleUrl);
         $particle.x = $pos.x;
         $particle.y = $pos.y;
         $particle.z = $pos.z;
         $particle.scaleX = 3;
         $particle.scaleY = 3;
         $particle.scaleZ = 3;
         $particle.rotationY = $r;
         $scene.particleManager.addParticle($particle);
         $particle.addEventListener(Pan3d.BaseEvent.COMPLETE, this.onPlayCom, this);
     } else {
         console.log("播放的不是单纯特效");
     }
 }
 */
@end
