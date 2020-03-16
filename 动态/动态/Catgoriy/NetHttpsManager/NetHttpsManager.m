//
//  NetHttpsManager.m
//  动态
//
//  Created by zhao on 16/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Header.h"
#import <AFNetworking.h>
#import "NetWorkManager.h"
#import "AFHTTPSessionManager+Singlton.h"
#import "NetHttpsManager.h"

static NetHttpsManager *netHttpsManager = nil;
@implementation NetHttpsManager
+ (instancetype)default{
    if (netHttpsManager == nil) {
        netHttpsManager = [[NetHttpsManager alloc] init];
    }
    return netHttpsManager;
}
#pragma mark 底层参数等
+ (NSMutableDictionary *)             getLocalParm:(NSMutableDictionary *)parmDict url:(NSString *)urlStr
{
   
    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
    NSString *docDir = [paths objectAtIndex:0];
    NSString *filePath = [docDir stringByAppendingPathComponent:@"session_id"];
    NSArray *array = [[NSArray alloc]initWithContentsOfFile:filePath];
    if (array.count)
    {
        [parmDict setObject:array[0] forKey:@"session_id"];
    }
  
    
    
    NSInteger count = parmDict.count;
    NSString *str = [NSString stringWithFormat:@"%@?",urlStr];
    
    for (int i = 0;i < count;i++)
    {
        NSString *tmpStr = [NSString stringWithFormat:@"%@=%@&",parmDict.allKeys[i],parmDict.allValues[i]];
        if (tmpStr && ![tmpStr isEqualToString:@""])
        {
            str = [str stringByAppendingString:tmpStr];
        }
    }

    NSMutableDictionary * mDic = [NSMutableDictionary dictionary];
    [mDic setObject:str forKey:@"requestData"];
   
     
    return mDic;
}

- (void)POSTWithUrl:(NSString *)urlStr paramDict:(NSMutableDictionary *)paramDict OverTime:(CGFloat )overTime successBlock:(SuccessBlock)PostSuccess FailureBlock:(FailureBlock)PostFailure;
{
     
     paramDict = [NetHttpsManager getLocalParm:paramDict url:urlStr];
       
    AFHTTPSessionManager *manager = [AFHTTPSessionManager defaultNetManager];
           manager.requestSerializer.timeoutInterval = 15;
           [manager POST:urlStr parameters:paramDict progress:^(NSProgress * _Nonnull uploadProgress) {
               
           } success:^(NSURLSessionDataTask * _Nonnull task, id  _Nullable responseObject) {
                   NSDictionary *resposeJson = [NSJSONSerialization JSONObjectWithData:responseObject options:NSJSONReadingAllowFragments error:nil];
               
               PostSuccess (resposeJson);
               
           } failure:^(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error) {
           
               
           }];
}

@end
