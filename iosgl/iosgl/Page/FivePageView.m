//
//  FivePageView.m
//  iosgl
//
//  Created by zhao on 2/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "FivePageView.h"
#import "AppDelegate.h"
#import "DynamicHeader.h"
#import "LoadManager.h"
#import "DynamicController.h"

@interface FivePageView ()
@property (nonatomic,strong) NSURLSession *session;
@end

@implementation FivePageView

- (void)viewDidLoad {
    [super viewDidLoad];

    self.view.frame=CGRectMake(0, 0, kScreenW, kScreenH);
      self.view.backgroundColor=[UIColor whiteColor];
}
 
- (void)viewDidAppear:(BOOL)animated
{
    [super viewDidAppear:animated];
    
    self.title=@"主窗口";
    self.navigationController.navigationBar.hidden = NO;  //显示头部
}

- (IBAction)submitClikEvent:(id)sender {
    
    NSLog(@"--");
    
   
     [[LoadManager default] loadUrl:@"" type:IMG_TYPE fun:^(NSString* value) {
         
         NSLog(@"加载完成");
         
         UIImageView* imageView=[[UIImageView alloc]init];
          imageView.frame=CGRectMake(0, 0, 200, 200);
          [self.view addSubview:imageView];
          [imageView setImage:[UIImage imageNamed: value]];
         
     }];
     
//    DynamicController* vc=[[DynamicController alloc]init];
//    [self.navigationController pushViewController:vc animated:YES];
   
    
  //  [self downLoad:@"http://pic1.win4000.com/pic/b/03/21691230681.jpg"];
 }
- (void)downLoad:(NSString*)value;
{
    
    [self delegateUrl];
    NSString * url=@"https://jilioss.oss-cn-hongkong.aliyuncs.com/rb_ios/%08zhao/RedbagApp/assetfile/tu001.jpg";
   
    
    [self delegateUrl];
}

-(void)delegateUrl
{
    //1.url
   // NSURL *url = [NSURL URLWithString:@"http://pic1.win4000.com/pic/b/03/21691230681.jpg"];
    
     NSURL *url = [NSURL URLWithString:@"https://jilioss.oss-cn-hongkong.aliyuncs.com/rb_ios/%08zhao/RedbagApp/assetfile/tu001.jpg"];
    
    
    //
    //2.创建请求对象
    NSURLRequest *request = [NSURLRequest requestWithURL:url];
    
    //3.创建session ：注意代理为NSURLSessionDownloadDelegate
    NSURLSession *session = [NSURLSession sessionWithConfiguration:[NSURLSessionConfiguration defaultSessionConfiguration] delegate:self delegateQueue:[NSOperationQueue mainQueue]];
    
    //4.创建Task
    NSURLSessionDownloadTask *downloadTask = [session downloadTaskWithRequest:request];
    
    //5.执行Task
    [downloadTask resume];
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
    
    
    UIImageView* imageView=[[UIImageView alloc]init];
    imageView.frame=CGRectMake(0, 0, 200, 200);
    [self.view addSubview:imageView];
    [imageView setImage:[UIImage imageNamed: fullPath]];
    
    
}

/**
 *  请求结束
 */
-(void)URLSession:(NSURLSession *)session task:(NSURLSessionTask *)task didCompleteWithError:(NSError *)error
{
    NSLog(@"didCompleteWithError");
}

  
@end
