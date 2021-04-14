//
//  ResManager.h
//  iosgl
//
//  Created by zhao on 2/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "ResGC.h"
#import "GL_Header.h"
#import "RoleRes.h"
#import "SkillRes.h"

NS_ASSUME_NONNULL_BEGIN

@interface ResManager : ResGC
 
-(void)loadRoleRes:(NSString*)url fun:(RoleResBfun)fun meshBatchNum:(int)meshBatchNum;
-(void)loadSkillRes:(NSString*)url fun:(SkillResBfun)fun;
@end

NS_ASSUME_NONNULL_END
