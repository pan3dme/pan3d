//
//  SkillUiViewController.m
//  iosgl
//
//  Created by pan3dme on 2021/3/8.
//  Copyright © 2021 zhao. All rights reserved.
//

#import "SkillUiViewController.h"
#import "Scene3D.h"
#import "Display3dMovie.h"
#import "MtkBaseLine.h"

@interface SkillUiViewController ()
@property (nonatomic, strong)Display3dMovie* mainChar;
@end

@implementation SkillUiViewController

- (void)viewDidLoad {
    [super viewDidLoad];
 
    self.mainChar=[[Display3dMovie alloc]init: self.scene3D];
    [self.mainChar setRoleUrl:getRoleUrl(@"50011")];
    [ self.scene3D addMovieDisplay:self.mainChar];
    self.scene3D.camera3D.rotationY=45;
    [self.scene3D.skillManager  preLoadSkill: getSkillUrl(@"jichu_1")];
}
-(void)addMenuList;
{
    self.butItems=[[NSMutableArray alloc]init];
    NSMutableArray* arr=[[NSMutableArray alloc]init];
    [arr addObject:@"m_skill_01"];
    [arr addObject:@"m_skill_02"];
    [arr addObject:@"m_skill_03"];
 
    [self addButsByArr:arr ];
    
    
    [self viewDidLayoutSubviews];
  
}
- (BOOL) addMenuListClikEvent:(UIButton *) btn;
{
    BOOL isCanNext= [super addMenuListClikEvent:btn];
    if(!isCanNext){
        return isCanNext;
    }
//    var skill: Skill = sceneView.scene3D.skillManager.getSkill("skill/" + filename + "_byte.txt", skillname, null);
    NSString* titleStr=btn.titleLabel.text;
    if( self.mainChar){
      
        Skill* skill= [self.scene3D.skillManager getSkill: getSkillUrl(@"jichu_1") name:titleStr];
        skill.scene3D=self.scene3D;
        [skill reset];
        [skill configFixEffect:self.mainChar completeFun:nil posObj:nil ];
        [self.mainChar playSkill:skill];
    }
    return  false;
 
}



@end
