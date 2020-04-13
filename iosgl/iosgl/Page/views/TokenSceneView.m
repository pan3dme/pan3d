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
#import "LineDisplaySprite.h"
#import "GridLineSprite.h"
#import "DisplayBaseTriSprite.h"
#import "LoadManager.h"
#import "Scene_data.h"
#import "UIImageView+WebCache.h"
#import "Display3dMovie.h"

@interface TokenSceneView ()
@property (nonatomic, strong) SceneView *sceneView;

@property (nonatomic,strong) NSURLSession *session;
@end

@implementation TokenSceneView

- (void)viewDidLoad {
    [super viewDidLoad];
    
    self.sceneView=[[SceneView alloc]init];
    self.sceneView.frame=CGRectMake(5, 100, 360, 360);
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
    
    [self.sceneView loadSeceneByUrl:@"5555_base.txt"];
}

- (IBAction)scene_but_2_clik:(id)sender {
    
   // [self.sceneView makeEemptyScene];
    self.sceneView.scene3D.camera3D.distance-=20;
   
}

- (IBAction)zoom_max_clik:(id)sender {
       self.sceneView.scene3D.camera3D.distance+=20;
 /*
    [self.sceneView makeEemptyScene];
    
    [[GroupDataManager default]getGroupData:[[Scene_data default]getWorkUrlByFilePath:@"model/baoxiang001_base.txt"] Block:^(GroupRes *groupRes) {
        
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
    
    */
    
}

- (IBAction)zoom_min_clik:(id)sender {
 
    [self.sceneView makeEemptyScene];
     [self.sceneView.scene3D addDisplay:[[GridLineSprite alloc]init]];
    
    
    //http://jilioss.oss-cn-hongkong.aliyuncs.com/rb_ios/a/res/model/diamondseffect_base.txt
    //http://jilioss.oss-cn-hongkong.aliyuncs.com/rb_ios/a/res/model/levelup_base.txt
    //http://jilioss.oss-cn-hongkong.aliyuncs.com/rb_ios/a/res/model/reviveeff_base.txt
    
 
      [Scene_data default].supportBlob=YES;
    BOOL isTrue=YES;
    
    if(isTrue){
       // [self playLyfByUrl:@"model/diamondseffect_lyf.txt"];
       [self playLyfByUrl:@"model/levelup_lyf.txt"];
       // [self playLyfByUrl:@"model/reviveeff_lyf.txt"];
    }else{
        
        
        if(!baseSc){
            Display3dMovie* sc=[[Display3dMovie alloc]init];
              [self.sceneView.scene3D addMovieDisplay:sc] ;
              //330013
              //yezhuz
              [sc setRoleUrl:@"role/yingz.txt"];
            baseSc=sc;
        }
  
    }
  
}
Display3dMovie* baseSc;
-(void)playLyfByUrl:(NSString*)value
{
    ParticleManager* particleManager=  self.sceneView.scene3D.particleManager;
    NSString* modeurl =[[Scene_data default]getWorkUrlByFilePath:value];
    [[GroupDataManager default] getGroupData:modeurl Block:^(GroupRes *groupRes) {
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

@end
