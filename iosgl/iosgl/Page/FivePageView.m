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
 
 
 
    [self one];
    [self two];
 }
-(void)one;
{
    NSString* url=@"https://jilioss.oss-cn-hongkong.aliyuncs.com/rb_ios/%08zhao/RedbagApp/assetfile/tu001.jpg";
      [[LoadManager default] loadUrl:url type:IMG_TYPE fun:^(NSString* value) {
          NSLog(@"加载完成");
          UIImageView* imageView=[[UIImageView alloc]init];
           imageView.frame=CGRectMake(0, 0, 200, 200);
           [self.view addSubview:imageView];
           [imageView setImage:[UIImage imageNamed: value]];
      }];
      
}

-(void)two;
{
    NSString* url=@"https://jilioss.oss-cn-hongkong.aliyuncs.com/rb_ios/%08zhao/RedbagApp/assetfile/tu001.jpg";
      [[LoadManager default] loadUrl:url type:IMG_TYPE fun:^(NSString* value) {
          NSLog(@"加载完成");
          UIImageView* imageView=[[UIImageView alloc]init];
           imageView.frame=CGRectMake(20, 200, 100, 100);
           [self.view addSubview:imageView];
           [imageView setImage:[UIImage imageNamed: value]];
      }];
      
}
 
  
@end
