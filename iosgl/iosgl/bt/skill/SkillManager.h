//
//  SkillManager.h
//  iosgl
//
//  Created by zhao on 17/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "ResGC.h"
#import "Skill.h"

NS_ASSUME_NONNULL_BEGIN
@class Skill;
@interface SkillManager : ResGC
//+ (instancetype)default;

@property (nonatomic,strong)NSMutableDictionary* _skillDic;
@property (nonatomic,strong)NSMutableDictionary* _loadDic;
@property (nonatomic,strong)NSMutableDictionary* _preLoadDic;
@property (nonatomic,strong)NSMutableArray<Skill*>* _skillAry;
@property (nonatomic,assign)double _time;

-(Skill*)getSkill:(NSString*)url name:(NSString*)name;
-(void)preLoadSkill:(NSString*)url;
-(void)playSkill:(Skill*)skill;
-(void)update;
@end

NS_ASSUME_NONNULL_END
