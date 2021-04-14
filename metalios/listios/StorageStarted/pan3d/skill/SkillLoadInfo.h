//
//  SkillLoadInfo.h
//  iosgl
//
//  Created by zhao on 29/10/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "Skill.h"

NS_ASSUME_NONNULL_BEGIN

@interface SkillLoadInfo : NSObject
@property(nonatomic,strong)NSString* name;
@property(nonatomic,strong)Skill* skill;

//public  String name;
//  public  Skill skill;
//  public  CallBack callback;

@end

NS_ASSUME_NONNULL_END
