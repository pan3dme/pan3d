//
//  SceneChar.m
//  iosgl
//
//  Created by zhao on 18/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "SceneChar.h"
#import "Skill.h"
#import "Scene3D.h"
#import "SkillManager.h"
@interface SceneChar()
@property(nonatomic,strong)Skill* skillVo;
@end
@implementation SceneChar


-(void)playSkill:(Skill*)skill;
{
    [self.scene3d.skillManager  playSkill:skill];

    self.skillVo=skill;
 
}
- (void)upFrame;
{
     [super upFrame];
}
@end

