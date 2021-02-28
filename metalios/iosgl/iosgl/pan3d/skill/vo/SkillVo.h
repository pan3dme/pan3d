//
//  SkillVo.h
//  iosgl
//
//  Created by zhao on 17/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "SkillKeyVo.h"
#import "SkillActionVo.h"

NS_ASSUME_NONNULL_BEGIN

@interface SkillVo : NSObject
@property(nonatomic,strong)NSString* action;
@property(nonatomic,strong)NSString* skillname;
@property(nonatomic,strong)NSMutableArray<SkillKeyVo*>* keyAry ;
@property(nonatomic,assign)int types;
@property(nonatomic,assign)float bloodTime;
@property(nonatomic,strong)SkillKeyVo* sound;

-(void)setData:(SkillActionVo*)info;
+(float)defaultBloodTime;

@end

NS_ASSUME_NONNULL_END
