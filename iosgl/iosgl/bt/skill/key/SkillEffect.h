//
//  SkillEffect.h
//  iosgl
//
//  Created by zhao on 17/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "SkillKey.h"
#import "Object3D.h"

NS_ASSUME_NONNULL_BEGIN

@interface SkillEffect : SkillKey
@property(nonatomic,strong)Object3D*    active;
@end

NS_ASSUME_NONNULL_END
