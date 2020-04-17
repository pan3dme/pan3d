//
//  Skill.m
//  iosgl
//
//  Created by zhao on 17/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Skill.h"
#import "SkillData.h"

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
    
}

/*
 public setData($data: any, $skillData: SkillData): void {
       this.skillVo = new SkillVo();
       this.skillVo.setData($data);
       this.setKeyAry();
       this.trajectoryAry = new Array;
       this._skillData = $skillData;
   }

 */

@end
