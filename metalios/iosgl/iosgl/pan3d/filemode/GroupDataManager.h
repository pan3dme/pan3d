//
//  GroupDataManager.h
//  iosgl
//
//  Created by zhao on 22/2/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "ResGC.h"
#import "GroupRes.h"

NS_ASSUME_NONNULL_BEGIN

@interface GroupDataManager : ResGC
 

-(void)getGroupData:(NSString*)url Block:(void (^)(GroupRes * ))block;
@end

NS_ASSUME_NONNULL_END
