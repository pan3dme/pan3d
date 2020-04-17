//
//  Skill.m
//  iosgl
//
//  Created by zhao on 17/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Skill.h"
#import "SkillType.h"
#import "SkillData.h"
#import "SkillMulTrajectory.h"
#import "SkillTrajectoryTargetKeyVo.h"
#import "SkillFixEffect.h"

@implementation Skill


-(void)reset;
{
    
}
/*
 public reset(): void {
 this.time = 0;
 this.completeNum = 0;
 this.active = null;
 this.completeFun = null;
 this.targetFlag = 0;
 this.soundPlay = false;
 this.needSound = false;
 }
 */


-(void)setData:(NSMutableDictionary*)data skillData:(SkillData*)skillData;
{
    Skill* this=self;
    this.skillVo=[[SkillVo alloc]init];
    [this.skillVo setData:data];
    [self setKeyAry];
    
}
-(void)setKeyAry;
{
    Skill* this=self;
    this.keyAry = [[NSMutableArray alloc]init];
    if (this.skillVo.types == SkillType.FixEffect) {
        for (int i    = 0; i < this.skillVo.keyAry.count; i++) {
            SkillFixEffect* keySkill =[[SkillFixEffect alloc]init];
            [keySkill setInfo:this.skillVo.keyAry[i]];
            keySkill.removeCallFun=^(SkillKey * _Nonnull key) {
                [this removeKey:key];
            };
            keySkill.active = this.active;
            [this.keyAry addObject:keySkill];
        }
    } else if (this.skillVo.types == SkillType.TrajectoryDynamicTarget || this.skillVo.types == SkillType.TrajectoryDynamicPoint) {
        for (int i = 0; i < this.skillVo.keyAry.count; i++) {
            SkillTrajectory* trajectory  ;
            SkillTrajectoryTargetKeyVo* tkv = this.skillVo.keyAry[i];
            if (tkv.multype == 1) {
                trajectory = [[SkillMulTrajectory alloc]init];
            } else {
                trajectory = [[SkillTrajectory alloc]init];
            }
            [trajectory setInfo:this.skillVo.keyAry[i]];
            
            [this.keyAry addObject:trajectory];
            
        }
    }
}

-(void)removeKey:(SkillKey*)key;
{
    
}

 

@end
