//
//  WebViewController.m
//  StorageStarted
//
//  Created by pan3dme on 2021/5/11.
//  Copyright © 2021 cuiyiran. All rights reserved.
//

#import "WebViewController.h"

@interface WebViewController ()
@property (nonatomic,strong) UIWebView *webView;
@end
 
@implementation WebViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    
    [self createUIWebViewTest];
}
- (void)createUIWebViewTest {
    // 1.创建webview
    CGFloat width = self.view.frame.size.width;
    CGFloat height = self.view.frame.size.height-80;
    self.webView = [[UIWebView alloc] initWithFrame:CGRectMake(0, 0, width, height)];
    [self.view addSubview: self.webView ];
    
 
//    self.webView.backgroundColor=[UIColor redColor];
   
}
 
 - (void)viewDidAppear:(BOOL)animated
{
    [super viewDidAppear:animated];
  

    
    
    
    NSURL *remoteURL = [NSURL URLWithString:@"https://pan3dme.github.io/pan3d/h5gl/listmain.html"];
//    remoteURL = [NSURL URLWithString:@"https://www.163.com"];
 
    NSURLRequest *request =[NSURLRequest requestWithURL:remoteURL];
    [ self.webView  loadRequest:request];
    
    
//    self.webView.frame=CGRectMake(0, 0, 100, 200);
    
    self.view.backgroundColor=[UIColor whiteColor];
     
}

@end
