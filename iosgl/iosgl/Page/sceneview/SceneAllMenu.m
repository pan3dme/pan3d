//
//  SceneAllMenu.m
//  iosgl
//
//  Created by zhao on 30/10/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "SceneAllMenu.h"
#import "GL_Header.h"
#import "SceneView.h"
#import "SceneChar.h"
#import "GroupItem.h"
#import "Scene_data.h"
#import "SceneRes.h"
#import "GroupDataManager.h"
#import "GridLineSprite.h"
#import <AlipaySDK/AlipaySDK.h>

@interface SceneAllMenu ()
@property (nonatomic, strong) SceneView *sceneView;
@property (nonatomic, strong) SceneChar *mainChar;
@property (nonatomic, strong) NSMutableArray<UIButton*>* butItems;
@property (nonatomic, assign) int lyfPlayIdx;
@end

@implementation SceneAllMenu

- (void)viewDidLoad {
    [super viewDidLoad];
    self.view.backgroundColor=[UIColor whiteColor];
    self.lyfPlayIdx=0;
    self.sceneView=[[SceneView alloc]init];
    self.sceneView.frame=CGRectMake(5, 100, 360, 360);
    [self.view addSubview:  self.sceneView];
    [self.sceneView makeEemptyScene];
    [self.sceneView.scene3D addDisplay:[[GridLineSprite alloc]init]];
    
    [self addMenuList];
}
-(void)addMenuList;
{
    NSMutableArray* arr=[[NSMutableArray alloc]init];
    [arr addObject:@"场景"];
    [arr addObject:@"角色"];
    [arr addObject:@"特效"];
    [arr addObject:@"技能"];
    [arr addObject:@"挂件"];
    [arr addObject:@"清理"];
    [arr addObject:@"网格"];
    [arr addObject:@"拉+"];
    [arr addObject:@"推-"];
    [self addButsByArr:arr  action: @selector(addMenuListClikEvent:)];
    
}
- (void) addMenuListClikEvent:(UIButton *) btn
{
    NSString* titleStr=btn.titleLabel.text;
    if([self selectBaseButByName:titleStr]){
        return;
    }
    if([titleStr isEqualToString:@"场景"]){
        [self addSceneMenuList];
    }else if([titleStr isEqualToString:@"角色"]){
        [self addRoleMenuList];
        
    }else if([titleStr isEqualToString:@"特效"]){
 
        
    }else if([titleStr isEqualToString:@"技能"]){
        
    }else if([titleStr isEqualToString:@"挂件"]){
    }
    
}
-(BOOL)selectBaseButByName:(NSString*)str;
{
    if([str isEqualToString:@"清理"]){
        [self.sceneView.scene3D clearAll];
        [self.sceneView.scene3D addDisplay:[[GridLineSprite alloc]init]];
    }else if([str isEqualToString:@"网格"]){
        [self.sceneView.scene3D addDisplay:[[GridLineSprite alloc]init]];
    }else if([str isEqualToString:@"拉+"]){
        self.sceneView.scene3D.camera3D.distance*=0.8;
    }else if([str isEqualToString:@"推-"]){
        self.sceneView.scene3D.camera3D.distance*=1.2;
    }else if([str isEqualToString:@"返回"]){
        [self addMenuList];
    }else{
        return false;
    }
    return  true;
}

-(void)addSceneMenuList;
{
    NSMutableArray* arr=[[NSMutableArray alloc]init];
    [arr addObject:@"2012"];
    [arr addObject:@"2013"];
    [arr addObject:@"2014"];
    [arr addObject:@"2015"];
    [arr addObject:@"清理"];
    [arr addObject:@"网格"];
    [arr addObject:@"拉+"];
    [arr addObject:@"推-"];
    [arr addObject:@"返回"];
    [self addButsByArr:arr  action: @selector(selectSceneClikEvent:)];
    
    
}
- (void) selectSceneClikEvent:(UIButton *) btn
{
    NSString* titleStr=btn.titleLabel.text;
    if([self selectBaseButByName:titleStr]){
        return;
    }
    [self.sceneView loadSeceneByUrl:titleStr];
}

-(void)addRoleMenuList;
{
    NSMutableArray* arr=[[NSMutableArray alloc]init];
    [arr addObject:@"50011"];
    [arr addObject:@"50013"];
    [arr addObject:@"50015"];
    [arr addObject:@"yezhuz"];
    [arr addObject:@"清理"];
    [arr addObject:@"网格"];
    [arr addObject:@"拉+"];
    [arr addObject:@"推-"];
    [arr addObject:@"返回"];
    [self addButsByArr:arr  action: @selector(selectRoleClikEvent:)];
    
    
}
- (void) selectRoleClikEvent:(UIButton *) btn
{
    NSString* titleStr=btn.titleLabel.text;
    if([self selectBaseButByName:titleStr]){
        return;
    }
    [self addRoleToScene:titleStr pos:[[Vector3D alloc]x:0 y:0 z:0]];
}

-(void)addButsByArr:(NSMutableArray*)arr action:(SEL)action
{
    self.butItems=[[NSMutableArray alloc]init];
    for(int i=0;i<arr.count;i++){
        UIButton* oneBut=[self makeButtion];
        [oneBut setTitle:arr[i] forState:UIControlStateNormal];
        [oneBut addTarget:self action:action forControlEvents:UIControlEventTouchUpInside] ;
        [self.butItems addObject:oneBut];
    }
}

-(void)addEventButBy:(NSString*)tittle;
{
    UIButton* oneBut=[self makeButtion];
    [oneBut setTitle:tittle forState:UIControlStateNormal];
    [oneBut addTarget:self action:@selector(oneButClikEvent:) forControlEvents:UIControlEventTouchUpInside] ;
    [self.butItems addObject:oneBut];
}

- (void)viewDidLayoutSubviews
{
    for (int i=0; i< self.butItems.count; i++) {
        double tx=    fmod (i, 5);
        int ty= float2int(i/5.0f);
        
        self.butItems[i].frame=CGRectMake(tx*75+10,  CGRectGetMaxY(self.sceneView.frame)+55+ty*50, 60, 30);
    }
}

-(void)showLyfItems;
{
    [self clearButs];
    [self addEventLyfButBy:@"10017"];
    [self addEventLyfButBy:@"10018"];
    [self addEventLyfButBy:@"13012"];
    [self addEventLyfButBy:@"levelup"];
    [self addEventButBy:@"清理"];
    [self addEventButBy:@"拉+"];
    [self addEventButBy:@"推-"];
    [self viewDidLayoutSubviews];
    
}

-(void)clearButs;
{
    while (self.butItems.count) {
        [self.butItems[0] removeFromSuperview];
        [self.butItems removeObjectAtIndex:0];
        
    }
}
-(void)addEventLyfButBy:(NSString*)tittle;
{
    UIButton* oneBut=[self makeButtion];
    [oneBut setTitle:tittle forState:UIControlStateNormal];
    [oneBut addTarget:self action:@selector(oneButLyfClikEvent:) forControlEvents:UIControlEventTouchUpInside] ;
    [self.butItems addObject:oneBut];
}
- (void) oneButLyfClikEvent:(UIButton *) btn;
{
    NSString* lyfStr=btn.titleLabel.text;
    
    [self.sceneView.scene3D clearAll];
    [self.sceneView.scene3D addDisplay:[[GridLineSprite alloc]init]];
    
    //            NSMutableArray<NSString*>* lyfItem=[[NSMutableArray alloc]init];
    //            [lyfItem addObject:@"model/diamondseffect_lyf.txt"];
    //            [lyfItem addObject:@"model/levelup_lyf.txt"];
    //            [lyfItem addObject:@"model/reviveeff_lyf.txt"];
    //            [lyfItem addObject:@"model/10017_lyf.txt"];
    //            [lyfItem addObject:@"model/10018_lyf.txt"];
    //            [lyfItem addObject:@"model/13012_lyf.txt"];
    
    [self playLyfByUrl:[NSString stringWithFormat:@"model/%@_lyf.txt",lyfStr]];
}

- (void) oneButClikEvent:(UIButton *) btn
{
    
    NSString* titleStr=btn.titleLabel.text;
    if([titleStr isEqualToString:@"角色"]){
        [self makeRollAndMount];
        [self addRoleToScene:@"yezhuz" pos:[[Vector3D alloc]x:-20 y:0 z:0]];
        [self addRoleToScene:@"50004" pos:[[Vector3D alloc]x:-40 y:0 z:0]];
        [self addRoleToScene:@"50005" pos:[[Vector3D alloc]x:-60 y:0 z:0]];
        [self addRoleToScene:@"50006" pos:[[Vector3D alloc]x:-80 y:0 z:0]];
    }
    if([titleStr isEqualToString:@"特效"]){
        
        //     Skill* skill= [self.sceneView.scene3D.skillManager getSkill: getSkillUrl(@"jichu_1") name:@"m_skill_01"];
        [self showLyfItems];
        
    }
    if([titleStr isEqualToString:@"技能"]){
        
        if(!self.mainChar){
            self.mainChar=[[SceneChar alloc]init];
            [self.sceneView.scene3D addMovieDisplay:self.mainChar] ;
            //50001
            [self.mainChar setRoleUrl: getRoleUrl(@"50001")];
            [self.mainChar addPart:SceneChar.WEAPON_PART bindSocket:SceneChar.WEAPON_DEFAULT_SLOT url:getModelUrl(@"50011")];
            [self.sceneView.scene3D.skillManager preLoadSkill:getSkillUrl(@"jichu_1")];
            
        }else{
            
            Skill* skill= [self.sceneView.scene3D.skillManager getSkill: getSkillUrl(@"jichu_1") name:@"m_skill_01"];
            skill.scene3D=self.sceneView.scene3D;
            [skill reset];
            [skill configFixEffect:self.mainChar completeFun:nil posObj:nil ];
            [self.mainChar playSkill:skill];
            NSLog(@"播放技能");
            
        }
        
    }
    if([titleStr isEqualToString:@"清理"]){
        [self.sceneView.scene3D clearAll];
        [self.sceneView.scene3D addDisplay:[[GridLineSprite alloc]init]];
    }
    if([titleStr isEqualToString:@"拉+"]){
        self.sceneView.scene3D.camera3D.distance-=20;
    }
    if([titleStr isEqualToString:@"推-"]){
        self.sceneView.scene3D.camera3D.distance+=20;
    }
    if([titleStr isEqualToString:@"新加"]){
        [self addRoleToScene:@"50001" pos:[[Vector3D alloc]x:-20 y:0 z:0]];
    }
    
    if([titleStr isEqualToString:@"场景"]){
        [self.sceneView loadSeceneByUrl:@"2012"];
    }
    
    if([titleStr isEqualToString:@"特别"]){
        [self addRoleToScene:@"50001" pos:[[Vector3D alloc]x:0 y:0 z:0]];
    }
    if([titleStr isEqualToString:@"野猪"]){
        [self addRoleToScene:@"yezhuz" pos:[[Vector3D alloc]x:0 y:0 z:0]];
    }
    
    //
}

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
/*
 武器，角色，坐骑
 */
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
/*
 角色
 */
-(void)addRoleToScene:(NSString*)rolename pos:(Vector3D*)pos ;
{
    SceneChar* sc=[[SceneChar alloc]init];
    [self.sceneView.scene3D addMovieDisplay:sc] ;
    [sc setRoleUrl: getRoleUrl(rolename)];
    sc.x=pos.x;
    sc.y=pos.y;
    sc.z=pos.z;
}
/*
 创建按钮
 */
-(UIButton*)makeButtion;
{
    UIButton* but=[[UIButton alloc]initWithFrame:CGRectMake(0, 0, 50, 30)];
    [but setTitle:@"1" forState:UIControlStateNormal];
    but.backgroundColor=[UIColor redColor];
    but.layer.cornerRadius = 15; // 圆角的弧度
    but.layer.masksToBounds = YES;
    [self.view addSubview:but];
    
    return but;
}

-(void)MakeUiViewShadow:(UIView *)value size:(CGFloat )size  color:(UIColor *)color   {
    UIView *myView= value;
    myView.layer.shadowColor = color.CGColor;
    myView.layer.shadowOffset = CGSizeMake(5,5);; //[水平偏移, 垂直偏移]
    myView.layer.shadowOpacity = 0.2f; // 0.0 ~ 1.0 的值
    myView.layer.shadowRadius = size; // 阴影发散的程度
    myView.layer.masksToBounds = NO;
}

@end
