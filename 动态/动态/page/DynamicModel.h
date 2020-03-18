//
//  DynamicModel.h
//  动态
//
//  Created by zhao on 18/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "UserInfoVo.h"

NS_ASSUME_NONNULL_BEGIN

@interface DynamicModel : NSObject
+ (instancetype)default;
@property(nonatomic,strong)UserInfoVo*   selfUserInfoVo;
@end

NS_ASSUME_NONNULL_END
