//
//  DynamicModel.m
//  动态
//
//  Created by zhao on 18/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Header.h"
#import "NetHttpsManager.h"
#import "DynamicModel.h"

static DynamicModel *dynamicModel = nil;
@implementation DynamicModel
+ (instancetype)default;
{
    if (dynamicModel == nil) {
        dynamicModel = [[DynamicModel alloc] init];
    }
    return dynamicModel;
}
- (instancetype)init
{
    self = [super init];
    if (self) {
        self.rootUrl=@"http://34.87.12.20:20080/%@";
    }
    return self;
}

-(void)userImport:(SuccessBlock)PostSuccess;
{
 
    NSString* key=@"eyJleHRyYV9ibG9nIjoie1widmlwX2x2XCI6MSxcInVzZXJfbGV2ZWxcIjpcIjZcIixcImF1dGhfYW5jaG9yXCI6MCxcImRpc2Nlcm5fdHlwZVwiOlwidHVpMVwifSIsIm5pY2tuYW1lIjoiXHU1NGM4XHU1NGM4bGV2ZWwiLCJoZWFkIjoiaHR0cDpcL1wvb3NzLmlwaWd3ZWIuY29tXC9wdWJsaWNcL2F0dGFjaG1lbnRcLzIwMTkwN1wvMjZcLzE3XC81ZDNhYzYzMDFkYTQ2LnBuZz94LW9zcy1wcm9jZXNzPWltYWdlXC9yZXNpemUsbV9tZml0LGhfMjYwLHdfMjYwIiwidXNlcm5hbWUiOiIyOTg5NDYzMSIsInRpbWUiOjE1ODQ0ODk5MTcsInNpZ24iOiJhMzJmYzkzZWQ0MWVmOWZmNTU4ZmEzMzVlNzhiNjExYiJ9";
 
    NSString *path= [ NSString stringWithFormat:@"http://34.87.12.20:20080/%@?key=%@",PLATFORM_GAME_USER_IMPORT,key];
    NSURL *url = [NSURL URLWithString:path];
    NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:url];
    NSURLSession *session = [NSURLSession sharedSession];
    NSURLSessionDataTask *dataTask = [session dataTaskWithRequest:request completionHandler:^(NSData * _Nullable data, NSURLResponse * _Nullable response, NSError * _Nullable error) {
        NSDictionary *dic = [NSJSONSerialization JSONObjectWithData:data options:0 error:nil];
        //[0]    (null)    @"info" : 12 key/value pairs
        
        int codenum=  [[dic valueForKey:@"code"]intValue] ;
        if(codenum==0){
            [DynamicModel default].selfUserInfoVo=[[UserInfoVo alloc]init];
            [[DynamicModel default].selfUserInfoVo refrishData:[dic valueForKey:@"info"]];
            PostSuccess(dic);
        }
        
    }];
    
    [dataTask resume];
    

}

-(void)listAll:(SuccessBlock)PostSuccess;
{
    NSMutableDictionary* dic=[[NSMutableDictionary alloc]init];
    [dic setObject:@"0" forKey:@"begin_id"];
    [dic setObject:@"10" forKey:@"count"];
    NSString *URL= [ NSString stringWithFormat:self.rootUrl,PLATFORM_GAME_BLOG_LIST_ALL ];
    [[NetHttpsManager default] POSTWithUrl:URL paramDict:dic OverTime:100 successBlock:^(NSDictionary *responseJson) {
        int codenum=  [[dic valueForKey:@"code"]intValue] ;
        if(codenum==0){
            PostSuccess(responseJson);
        }
    } FailureBlock:^(NSError *error) {
        
    }];
}

-(void)GetDynamicByValue:(NSString*)url beginId:(NSString*)beginId count:(NSString*)count PostSuccess:(SuccessBlock)PostSuccess ;
{
    NSMutableDictionary* dic=[[NSMutableDictionary alloc]init];
//    [dic setObject:@"0" forKey:@"begin_id"];
//    [dic setObject:@"10" forKey:@"count"];
    [dic setObject:beginId forKey:@"begin_id"];
    [dic setObject:count forKey:@"count"];
    NSString *webURL= [ NSString stringWithFormat:self.rootUrl,url ];
    [[NetHttpsManager default] POSTWithUrl:webURL paramDict:dic OverTime:100 successBlock:^(NSDictionary *responseJson) {
        int codenum=  [[dic valueForKey:@"code"]intValue] ;
        if(codenum==0){
            PostSuccess(responseJson);
        }
    } FailureBlock:^(NSError *error) {
        
    }];
}
@end
