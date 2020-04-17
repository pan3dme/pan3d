//
//  Skill.h
//  iosgl
//
//  Created by zhao on 17/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "ResCount.h"
#import "SkillVo.h"
#import "SkillData.h"
#import "SkillKey.h"
#import "SkillTrajectory.h"

NS_ASSUME_NONNULL_BEGIN

@interface Skill : ResCount

@property(nonatomic,strong)SkillVo* skillVo ;
@property(nonatomic,strong)NSString* name;
@property(nonatomic,assign)BOOL isDeath ;
@property(nonatomic,strong)NSMutableArray<SkillKey*>* keyAry;
@property(nonatomic,assign)int completeNum;

@property(nonatomic,strong)Object3D* active;
//@property(nonatomic,strong)NSMutableDictionary* completeFun: Function;
@property(nonatomic,assign)float* time ;

@property(nonatomic,assign)int targetFlag ;
@property(nonatomic,strong)NSMutableArray<SkillTrajectory*>* trajectoryAry ;
@property(nonatomic,strong)SkillData* _skillData;
@property(nonatomic,strong)NSMutableDictionary* batterObj;
@property(nonatomic,assign)int tbSkillId; //用于存放数据表中的技能ID。项目组
@property(nonatomic,assign)BOOL soundPlay;
@property(nonatomic,assign)BOOL needSound;

-(void)reset;
-(void)setData:(NSMutableDictionary*)data skillData:(SkillData*)skillData;
@end

NS_ASSUME_NONNULL_END
