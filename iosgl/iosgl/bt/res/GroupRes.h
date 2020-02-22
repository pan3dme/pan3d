//
//  GroupRes.h
//  iosgl
//
//  Created by zhao on 22/2/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "BaseRes.h"

NS_ASSUME_NONNULL_BEGIN

@interface GroupRes : BaseRes
-(void)load:(NSString*)url Block:(void (^)(int))block;
@end

NS_ASSUME_NONNULL_END
