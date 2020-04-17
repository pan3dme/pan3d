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
+(float)MaxTime;
{
    return 5*1000;
}
-(void)reset;
{
    
}
-(void)setData:(NSMutableDictionary*)data skillData:(SkillData*)skillData;
{
    Skill* this=self;
    this.skillVo=[[SkillVo alloc]init];
    [this.skillVo setData:data];
    [self setKeyAry];
    
    this.trajectoryAry =[[NSMutableArray alloc]init];
    this._skillData = skillData;
    
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
            SkillTrajectoryTargetKeyVo* tkv = (SkillTrajectoryTargetKeyVo*)this.skillVo.keyAry[i];
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
-(void)update:(float)t;
{
    Skill* this=self;
    this.time+=t;
    if (this.time > Skill.MaxTime) {
        NSLog(@"超时结束");
        [this skillComplete];
    }
    [this getKeyTarget];
    [this updateTrajector:t];
}
-(void)updateTrajector:(float)t;
{
    for (int i   = 0; i < self.trajectoryAry.count; i++) {
        [self.trajectoryAry[i] update:t];
    }
}
-(void)getKeyTarget;
{
    Skill* this=self;
    if (!this.keyAry) {
        return;
    }
    for (int i = this.targetFlag; i < this.keyAry.count; i++) {
        if (this.keyAry[i].time < this.time) {
            [this.keyAry[i] addToRender];
            if (this.skillVo.types == SkillType.TrajectoryDynamicTarget || this.skillVo.types == SkillType.TrajectoryDynamicPoint) {
                SkillKey* ss = this.keyAry[i];
                [this.trajectoryAry addObject:ss];
            }
            i++;
            this.targetFlag = i;
        } else {
            break;
        }
    }
    [self getSound];
    
}
-(void)getSound;
{
    
}
 
-(void)skillComplete;
{
    
}
 
-(void)removeKey:(SkillKey*)key;
{
    
}



@end

