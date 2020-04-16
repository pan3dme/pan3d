//
//  SkillRes.h
//  iosgl
//
//  Created by zhao on 17/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "BaseRes.h"

NS_ASSUME_NONNULL_BEGIN

@interface SkillRes : BaseRes
-(void)load:(NSString*)url  fun:(SuccessBlock)fun;
@end
typedef void (^SkillResBfun)(SkillRes* skillRes);
NS_ASSUME_NONNULL_END
