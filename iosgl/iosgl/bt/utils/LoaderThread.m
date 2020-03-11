//
//  LoaderThread.m
//  iosgl
//
//  Created by zhao on 11/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "LoaderThread.h"
#import "LoadManager.h"
#import <UIKit/UIKit.h>
#import <Foundation/Foundation.h>

@interface LoaderThread()
<NSURLSessionDelegate>
@property (nonatomic, strong) NSURLSessionDownloadTask* downloadTask;
@property (nonatomic, strong) NSURLSession* session;
@property (nonatomic, strong) NSString*  localPath;

@end
@implementation LoaderThread

- (instancetype)init
{
    self = [super init];
    if (self) {
        self.idle=YES;
        self.session= [NSURLSession sessionWithConfiguration:[NSURLSessionConfiguration defaultSessionConfiguration] delegate:self delegateQueue:[NSOperationQueue mainQueue]];
    }
    return self;
}
// public load(loadInfo: LoadInfo): void {
-(void)load:(LoadInfo*)loadInfo;
{
    self.loadInfo=loadInfo;
    self.idle=NO;
    self.url=self.loadInfo.url;
    
    
    NSURLRequest *request = [NSURLRequest requestWithURL: [NSURL URLWithString:  self.url]];
    self.downloadTask = [self.session downloadTaskWithRequest:request];
    [self.downloadTask resume];
    
}


#pragma mark ----------------------
#pragma mark NSURLSessionDownloadDelegate
/**
 *  写数据
 *
 *  @param session                   会话对象
 *  @param downloadTask              下载任务
 *  @param bytesWritten              本次写入的数据大小
 *  @param totalBytesWritten         下载的数据总大小
 *  @param totalBytesExpectedToWrite  文件的总大小
 */
-(void)URLSession:(NSURLSession *)session downloadTask:(NSURLSessionDownloadTask *)downloadTask didWriteData:(int64_t)bytesWritten totalBytesWritten:(int64_t)totalBytesWritten totalBytesExpectedToWrite:(int64_t)totalBytesExpectedToWrite
{
    //1. 获得文件的下载进度
    NSLog(@"Write%f",1.0 * totalBytesWritten/totalBytesExpectedToWrite);
}

/**
 *  当恢复下载的时候调用该方法
 *
 *  @param fileOffset         从什么地方下载
 *  @param expectedTotalBytes 文件的总大小
 */
-(void)URLSession:(NSURLSession *)session downloadTask:(NSURLSessionDownloadTask *)downloadTask didResumeAtOffset:(int64_t)fileOffset expectedTotalBytes:(int64_t)expectedTotalBytes
{
    NSLog(@"func%s",__func__);
}
/**
 *  当下载完成的时候调用
 *
 *  @param location     文件的临时存储路径
 */
-(void)URLSession:(NSURLSession *)session downloadTask:(NSURLSessionDownloadTask *)downloadTask didFinishDownloadingToURL:(NSURL *)location
{
    //1 拼接文件全路径
    NSString *fullPath = [[NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES) lastObject] stringByAppendingPathComponent:downloadTask.response.suggestedFilename];
    
    //2 剪切文件
    [[NSFileManager defaultManager]moveItemAtURL:location toURL:[NSURL fileURLWithPath:fullPath] error:nil];
    NSLog(@"fullPath%@",fullPath);
    self.localPath=fullPath;
}

/**
 *  请求结束
 */
-(void)URLSession:(NSURLSession *)session task:(NSURLSessionTask *)task didCompleteWithError:(NSError *)error
{
    NSLog(@"didCompleteWithError");
    [self loadImg];
}

-(void)loadImg;
{
    if (self.loadInfo.info) {
        self.loadInfo.fun(  self.localPath);
    }else{
        self.loadInfo.fun(  self.localPath);
    }
    self.idle=YES;
    self.loadInfo=nil;
    [[LoadManager default]loadWaitList];
 
}
 

@end
