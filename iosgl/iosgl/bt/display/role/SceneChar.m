//
//  SceneChar.m
//  iosgl
//
//  Created by zhao on 18/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "SceneChar.h"
#import "Skill.h"
#import "SkillManager.h"
@interface SceneChar()
@property(nonatomic,strong)Skill* skillVo;
@end
@implementation SceneChar


-(void)playSkill:(Skill*)skill;
{
    [[SkillManager default] playSkill:skill];
    self.skillVo=skill;
 
}
@end
