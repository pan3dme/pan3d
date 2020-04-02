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

NS_ASSUME_NONNULL_BEGIN

@interface ResManager : ResGC
+ (instancetype)default;
-(void)loadRoleRes:(NSString*)url fun:(RoleResBfun)fun meshBatchNum:(int)meshBatchNum;
@end

NS_ASSUME_NONNULL_END
