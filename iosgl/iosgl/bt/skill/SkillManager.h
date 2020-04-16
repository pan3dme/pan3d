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

@interface SkillManager : ResGC
+ (instancetype)default;

@property (nonatomic,strong)NSMutableDictionary* _skillDic;
@property (nonatomic,strong)NSMutableDictionary* _loadDic;
@property (nonatomic,strong)NSMutableDictionary* _preLoadDic;
@property (nonatomic,strong)NSMutableArray<Skill*>* _skillAry;
@property (nonatomic,assign)float _time;

-(Skill*)getSkill:(NSString*)url name:(NSString*)name;

@end

NS_ASSUME_NONNULL_END
