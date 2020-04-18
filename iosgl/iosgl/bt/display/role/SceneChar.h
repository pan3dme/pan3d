//
//  SceneChar.h
//  iosgl
//
//  Created by zhao on 18/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Display3dMovie.h"
#import "Skill.h"

NS_ASSUME_NONNULL_BEGIN

@interface SceneChar : Display3dMovie
-(void)playSkill:(Skill*)skill;
@end

NS_ASSUME_NONNULL_END
