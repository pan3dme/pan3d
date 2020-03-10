//
//  LoadManager.m
//  iosgl
//
//  Created by zhao on 9/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "LoadManager.h"
#import "ByteArray.h"
#import "AFNetworking.h"
 
static LoadManager *instance = nil;
@implementation LoadManager
 
+ (instancetype)default{
    if (instance == nil) {
        instance = [[LoadManager alloc] init];
    }
    return instance;
}
-(void)load:(NSString*)url type:(int)type fun:(FinishBlock)fun info:(NSDictionary*)info progressFun:(void (^)(int))progressFun;
{
    NSString *baseUrl=[NSString stringWithFormat:@"http://localhost:63342/webstorm/res/assetfile/ball.xml"];
    //1.确定请求路径
    NSURL *urlNsurl = [NSURL URLWithString:baseUrl];
    //2.创建一个请求对象
    NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:urlNsurl];
  
    /*
     [NSURLConnection sendAsynchronousRequest:request queue:[NSOperationQueue mainQueue] completionHandler:^(NSURLResponse *response, NSData *data, NSError *connectionError) {
             if (!connectionError) {
                
                 NSString *str = [[NSString alloc]initWithData:data encoding:NSUTF8StringEncoding];
                      NSLog(@"str--%@",str);
                 ByteArray* byte=[[ByteArray alloc]init:data];
                    NSLog(@"上传成功");
           
             }
         }];
    */
    
     
    // [self downLoad:@"https://jilioss.oss-cn-hongkong.aliyuncs.com/rb_ios/%08zhao/RedbagApp/assetfile/1001_base.txt"];
     [self downLoad:@"http://jilioss.oss-cn-hongkong.aliyuncs.com/rb_ios/%08zhao/RedbagApp/assetfile/256.jpg"];
    
}
- (void)downLoad:(NSString*)value;
{

    NSURL *url = [NSURL URLWithString:@"http://jilioss.oss-cn-hongkong.aliyuncs.com/rb_ios/%08zhao/RedbagApp/assetfile/256.jpg"];
    NSURLRequest *request = [NSURLRequest requestWithURL:url];
    
    NSURLSession *session = [NSURLSession sharedSession];
    NSURLSessionDownloadTask *downloadTask = [session downloadTaskWithRequest:request completionHandler:^(NSURL * _Nullable location, NSURLResponse * _Nullable response, NSError * _Nullable error) {
       //默认把数据写到磁盘中：tmp/...随时可能被删除
        NSLog(@"location= %@", location);
        
        //转移文件
        NSString *cache = [NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES)  lastObject];
        NSString *filePath = [cache stringByAppendingPathComponent:response.suggestedFilename];
        NSLog(@"filePath = %@",filePath);
        NSURL *toURL = [NSURL fileURLWithPath:filePath];
        [[NSFileManager defaultManager] moveItemAtURL:location toURL:toURL error:nil];
        
        
    }];
    [downloadTask resume];

}
  
- (void)connection:(NSURLConnection *)connection didReceiveResponse:(NSURLResponse *)response ;
{
    
}

// 接收到服务器返回的数据时调用（服务器返回的数据比较大时会调用多次）
- (void)connection:(NSURLConnection *)connection didReceiveData:(NSData *)data;
{
    
}

// 服务器返回的数据完全接收完毕后调用
- (void)connectionDidFinishLoading:(NSURLConnection *)connection;
{
    
}

// 请求出错时调用（比如请求超时）
- (void)connection:(NSURLConnection *)connection didFailWithError:(NSError *)error;
{
    
}
//public load($url: string, $type: string, $fun: Function, $info: any = null, $progressFun: Function = null): void {
@end
