//
//  TokenSceneView.m
//  iosgl
//
//  Created by zhao on 21/2/2020.
//  Copyright © 2020 zhao. All rights reserved.
//
#import "GL_Header.h"
#import "AppWorldHeader.h"
#import "TokenSceneView.h"
#import "SceneView.h"
#import "GroupDataManager.h"
#import "SceneDisplay3DSprite.h"
#import "ObjDataManager.h"
#import "GroupItem.h"
#import "CombineParticle.h"
#import "ParticleManager.h"
#import "DisplayBaseSprite.h"
#import "LineDisplaySprite.h"
#import "GridLineSprite.h"
#import "DisplayBaseTriSprite.h"
#import "LoadManager.h"
#import "Scene_data.h"
#import "SceneChar.h"
#import "SkillManager.h"
#import "UIImageView+WebCache.h"
#import "Display3dMovie.h"
#import "DisplayTestSprite.h"
#import "Scene3D.h"
#import "TextureManager.h"


@interface TokenSceneView ()
@property (nonatomic, strong) SceneView *sceneView;
@property (nonatomic, assign) int lyfPlayIdx;
@property (nonatomic,strong) NSURLSession *session;
@end

@implementation TokenSceneView

- (void)viewDidLoad {
    [super viewDidLoad];
    
    self.lyfPlayIdx=0;
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
    /*
     NSMutableDictionary *mDict = [[NSMutableDictionary alloc]init];
     [mDict setObject:@"cctv"  forKey:@"data"];
     [[NSNotificationCenter defaultCenter]postNotificationName:@"loadScneInfo" object:mDict];
     [self.sceneView loadSeceneByUrl:@"5555_base.txt"];
     */
    [self playTypeBut:1];
}

- (IBAction)scene_but_2_clik:(id)sender {
    
    // [self.sceneView makeEemptyScene];
    self.sceneView.scene3D.camera3D.distance-=20;
    
}

- (IBAction)zoom_max_clik:(id)sender {
    self.sceneView.scene3D.camera3D.distance+=20;
    
    //    [self.sceneView makeEemptyScene];
    //     [self.sceneView.scene3D addDisplay:[[GridLineSprite alloc]init]];
    
    
    
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
    
    
    [self playTypeBut:4];
}

-(void)playTypeBut:(int)tabId;
{
    
    
    [self.sceneView makeEemptyScene];
    [self.sceneView.scene3D addDisplay:[[GridLineSprite alloc]init]];
    //     [self.sceneView.scene3D addDisplay:[[DisplayTestSprite alloc]init]] ;
    //http://jilioss.oss-cn-hongkong.aliyuncs.com/rb_ios/a/res/model/diamondseffect_base.txt
    //http://jilioss.oss-cn-hongkong.aliyuncs.com/rb_ios/a/res/model/levelup_base.txt
    //http://jilioss.oss-cn-hongkong.aliyuncs.com/rb_ios/a/res/model/reviveeff_base.txt
    
    NSMutableArray<NSString*>* lyfItem=[[NSMutableArray alloc]init];
    [lyfItem addObject:@"model/diamondseffect_lyf.txt"];
    [lyfItem addObject:@"model/levelup_lyf.txt"];
    [lyfItem addObject:@"model/reviveeff_lyf.txt"];
    //[lyfItem addObject:@"model/skin001_lyf.txt"];
    [lyfItem addObject:@"model/10017_lyf.txt"];
    [lyfItem addObject:@"model/10018_lyf.txt"];
    [lyfItem addObject:@"model/13012_lyf.txt"];
    
 
    
    switch (tabId) {
        case 1:
            self.lyfPlayIdx ++;
            if(self.lyfPlayIdx>=lyfItem.count){
                self.lyfPlayIdx=0;
            }
            [self playLyfByUrl:lyfItem[self.lyfPlayIdx]];
            
            break;
        case 2:
            if(!mainChar){
                mainChar=[[SceneChar alloc]init];
                [self.sceneView.scene3D addMovieDisplay:mainChar] ;
                [mainChar setRoleUrl:@"role/yingz.txt"];
            }
            break;
        case 3:
            
            break;
            
        case 4:
            
            if(!mainChar){
                mainChar=[[SceneChar alloc]init];
                [self.sceneView.scene3D addMovieDisplay:mainChar] ;
                //50001  5104
                [mainChar setRoleUrl: getRoleUrl(@"50001")];
                [mainChar addPart:SceneChar.WEAPON_PART bindSocket:SceneChar.WEAPON_DEFAULT_SLOT url:getModelUrl(@"50011")];
                [self.sceneView.scene3D.skillManager preLoadSkill:getSkillUrl(@"jichu_1")];
                
                [self makeRollAndMount];
                [self addRoleToScene:@"50003" pos:[[Vector3D alloc]x:-20 y:0 z:0]];
                [self addRoleToScene:@"50004" pos:[[Vector3D alloc]x:-40 y:0 z:0]];
                [self addRoleToScene:@"50005" pos:[[Vector3D alloc]x:-60 y:0 z:0]];
                [self addRoleToScene:@"50006" pos:[[Vector3D alloc]x:-80 y:0 z:0]];
            }else{
                
                Skill* skill= [self.sceneView.scene3D.skillManager getSkill: getSkillUrl(@"jichu_1") name:@"m_skill_01"];
                skill.scene3D=self.sceneView.scene3D;
                [skill reset];
                [skill configFixEffect:mainChar completeFun:nil posObj:nil ];
                [mainChar playSkill:skill];
                NSLog(@"播放技能");
                
            }
            break;
        default:
            break;
    }
    
    
    
}
-(void)makeRollAndMount;
{
    SceneChar* sc=[[SceneChar alloc]init];
    [self.sceneView.scene3D addMovieDisplay:sc] ;
    [sc setRoleUrl: getRoleUrl(@"50002")];
    [sc setMountById:@"5104"];
    [sc play:@"walk" completeState:0 needFollow:NO];
    [sc addPart:SceneChar.WEAPON_PART bindSocket:SceneChar.WEAPON_DEFAULT_SLOT url:getModelUrl(@"50011")];
    sc.x=50;
    
   
}
-(void)addRoleToScene:(NSString*)rolename pos:(Vector3D*)pos ;
{
    SceneChar* sc=[[SceneChar alloc]init];
    [self.sceneView.scene3D addMovieDisplay:sc] ;
    [sc setRoleUrl: getRoleUrl(rolename)];
    sc.x=pos.x;
    sc.y=pos.y;
    sc.z=pos.z;
}

SceneChar* mainChar;
-(void)playLyfByUrl:(NSString*)value
{
    ParticleManager* particleManager=  self.sceneView.scene3D.particleManager;
    NSString* modeurl =[[Scene_data default]getWorkUrlByFilePath:value];
    [[GroupDataManager default] getGroupData:modeurl Block:^(GroupRes *groupRes) {
        for (int i = 0; i < groupRes.dataAry.count; i++) {
            GroupItem *item = groupRes.dataAry[i];
            if (item.types ==SCENE_PARTICLE_TYPE) {
                CombineParticle*  particle =   [ParticleManager   getParticleByte: item.particleUrl];
                [particleManager addParticle:particle];
            } else {
                NSLog(@"播放的不是单纯特效");
            }
        }
        
        
        
    }];
}

@end
