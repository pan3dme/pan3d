//
//  Skill.m
//  iosgl
//
//  Created by zhao on 17/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "GL_Header.h"
#import "Skill.h"
#import "SkillType.h"
#import "SkillData.h"
#import "SkillManager.h"
#import "Display3dMovie.h"
#import "SkillMulTrajectory.h"
#import "SkillTrajectoryTargetKeyVo.h"
#import "SkillFixEffect.h"
#import "Scene3D.h"

@implementation Skill
+(float)MaxTime;
{
    return 5*1000;
}
- (instancetype)init
{
    self = [super init];
    if (self) {
        self.time=0;
    }
    return self;
}
-(void)reset;
{
    Skill* this=self;
    this.time = 0;
    this.completeNum = 0;
    this.active = nil;
    this.completeFun = nil;
    this.targetFlag = 0;
    this.soundPlay = NO;
    this.needSound = NO;
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
       // NSLog(@"超时结束");
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
        NSLog(@"%f   %f",this.keyAry[i].time ,this.time);
        if (this.keyAry[i].time < this.time) {
            [this.keyAry[i] addToRender:self.scene3D.particleManager];
            if (this.skillVo.types == SkillType.TrajectoryDynamicTarget || this.skillVo.types == SkillType.TrajectoryDynamicPoint) {
                SkillKey* skillKey = this.keyAry[i];
                
                [this.trajectoryAry addObject:skillKey];
            }
            i++;
            this.targetFlag = i;
        } else {
            break;
        }
    }
    [self getSound];
    
}
-(void)configFixEffect:(Object3D*)active  completeFun:(SuccessBlock)completeFun posObj:(NSArray<Vector3D*>*)posObj;
{
    Skill* this=self;
    this.active = active;
    this.completeFun = completeFun;
    if (!this.keyAry) {
        return;
    }
    for (int i    = 0; i < this.keyAry.count; i++) {
        if (this.skillVo.types != SkillType.FixEffect) {
            continue;
        }
        SkillFixEffect* skillFixEffect  = (SkillFixEffect*)this.keyAry[i];
        skillFixEffect.active = active;
        if (posObj && posObj.count) {
            if (i > (posObj.count - 1)) {
                skillFixEffect.outPos = posObj[ posObj.count - 1];
            } else {
                skillFixEffect.outPos = posObj[i];
            }
        } else {
            skillFixEffect.outPos = nil;
        }
    }
    
}
-(void)play;
{
    Skill* this=self;
    if (!this.skillVo) {
        [this skillComplete];
        return;
    }
    if([this.active isKindOfClass:[Display3dMovie class ] ]){
        Display3dMovie* movie3d   = (Display3dMovie*)this.active;
        [movie3d play:this.skillVo.action completeState:2 needFollow:NO];
        
        
        //movie3d.play(this.skillVo.action, 2, false);
    }
    
 
}
/*
 public configFixEffect($active: Object3D, $completeFun: Function = null, $posObj: Array<Vector3D> = null): void {
      this.active = $active;
      this.completeFun = $completeFun;

      if (!this.keyAry) {
          return;
      }
      for (var i: number = 0; i < this.keyAry.length; i++) {
          if (this.skillVo.types != SkillType.FixEffect) {
              continue;
          }
          var skillFixEffect: SkillFixEffect = <SkillFixEffect>this.keyAry[i];
          skillFixEffect.active = $active;
          if ($posObj && $posObj.length) {
              if (i > ($posObj.length - 1)) {
                  skillFixEffect.outPos = $posObj[$posObj.length - 1];
              } else {
                  skillFixEffect.outPos = $posObj[i];
              }
          } else {
              skillFixEffect.outPos = null;
          }
      }

  }
 */

-(void)getSound;
{
    
}
 
-(void)skillComplete;
{
    NSLog(@"skillComplete");
    Skill* this=self;
    [this.scene3D.skillManager removeSkill:this];
    
    this.isDeath=true;
    if(this.completeFun!=nil){
        this.completeFun(@"true");
    }
 
 
//           if (this.completeFun!=null) {
//               this.completeFun.StateChange(true);
//           }
//           this.idleTime = 0;
}
 
-(void)removeKey:(SkillKey*)key;
{
    Skill* this=self;
    this.completeNum++;
          if (this.completeNum == this.keyAry.count) {
              [this skillComplete];
          }
}



@end

