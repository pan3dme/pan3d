//
//  NetHttpsManager.h
//  动态
//
//  Created by zhao on 16/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>

typedef void (^SuccessBlock)(NSDictionary *responseJson);
typedef void (^FailureBlock)(NSError *error);
NS_ASSUME_NONNULL_BEGIN

@interface NetHttpsManager : NSObject
+ (instancetype)default;
- (void)POSTWithUrl:(NSString *)urlStr paramDict:(NSMutableDictionary *)paramDict OverTime:(CGFloat )overTime successBlock:(SuccessBlock)PostSuccess FailureBlock:(FailureBlock)PostFailure;

@end

NS_ASSUME_NONNULL_END
