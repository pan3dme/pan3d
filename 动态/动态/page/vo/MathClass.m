//
//  MathClass.m
//  动态
//
//  Created by zhao on 16/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "MathClass.h"
#import <AFNetworking.h>
#import "Header.h"
 
static MathClass *mathClass = nil;
@implementation MathClass

+ (instancetype)default{
    if (mathClass == nil) {
        mathClass = [[MathClass alloc] init];
    }
    return mathClass;
}

- (void)POSTWithUrl:(NSString *)urlStr paramDict:(NSMutableDictionary *)paramDict OverTime:(CGFloat )overTime successBlock:(SuccessBlock)PostSuccess FailureBlock:(FailureBlock)PostFailure;
{
    
    AFHTTPSessionManager *manager = [AFHTTPSessionManager manager];
    NSString *URL= [ NSString stringWithFormat:@"http://34.87.12.20:20080/%@",urlStr ];
 
    [manager GET:URL parameters:paramDict progress:^(NSProgress * _Nonnull downloadProgress) {
    
    }
     success:^(NSURLSessionDataTask * _Nonnull task, id  _Nullable responseObject) {

     NSLog(@"这里打印请求成功要做的事");

    }

    failure:^(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull   error) {

    NSLog(@"%@",error);  //这里打印错误信息

    }];
   //error    NSError *    domain: @"com.alamofire.error.serialization.response" - code: 18446744073709550600    0x000000028182e490
}

@end
