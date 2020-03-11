//
//  LoaderThread.m
//  iosgl
//
//  Created by zhao on 11/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "LoaderThread.h"
@interface LoaderThread()
@property (nonatomic, strong) NSURLSessionDownloadTask* downloadTask;
@property (nonatomic, strong) NSURLSession* session;
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
    
    NSURL *url = [NSURL URLWithString:@"https://jilioss.oss-cn-hongkong.aliyuncs.com/rb_ios/%08zhao/RedbagApp/assetfile/tu001.jpg"];
       NSURLRequest *request = [NSURLRequest requestWithURL:url];
       self.downloadTask = [self.session downloadTaskWithRequest:request];
       [self.downloadTask resume];
    
    /*
     this._loadInfo = loadInfo;
            this.idle = false;
            this._url = loadInfo.url;

            if (this._loadInfo.type == LoadManager.BYTE_TYPE) {
                this._xhr.open("GET", loadInfo.url, true);
                this._xhr.responseType = "arraybuffer";
                this._xhr.send();
            } else if (this._loadInfo.type == LoadManager.XML_TYPE) {
                this._xhr.open("GET", loadInfo.url, true);
                this._xhr.responseType = "text";
                this._xhr.send();
            } else if (this._loadInfo.type == LoadManager.IMG_TYPE) {
                if(this._img.url == loadInfo.url){//路径相同
                    this.loadImg();
                }else{//执行加载
                    this._img.url = loadInfo.url;
                    this._img.src = loadInfo.url;
                }
                
            }
     */
}
-(void)delegateUrl
{
     NSURL *url = [NSURL URLWithString:@"https://jilioss.oss-cn-hongkong.aliyuncs.com/rb_ios/%08zhao/RedbagApp/assetfile/tu001.jpg"];
    NSURLRequest *request = [NSURLRequest requestWithURL:url];
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
    NSLog(@"location%@",location);
    
    //1 拼接文件全路径
    NSString *fullPath = [[NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES) lastObject] stringByAppendingPathComponent:downloadTask.response.suggestedFilename];
    
    //2 剪切文件
    [[NSFileManager defaultManager]moveItemAtURL:location toURL:[NSURL fileURLWithPath:fullPath] error:nil];
    NSLog(@"fullPath%@",fullPath);
    
    
}

/**
 *  请求结束
 */
-(void)URLSession:(NSURLSession *)session task:(NSURLSessionTask *)task didCompleteWithError:(NSError *)error
{
    NSLog(@"didCompleteWithError");
}

@end
