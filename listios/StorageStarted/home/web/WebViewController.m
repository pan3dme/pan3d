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
    CGFloat height = self.view.frame.size.height;
    UIWebView *webView = [[UIWebView alloc] initWithFrame:CGRectMake(0, 0, width, height)];
    
    
    // 2.1 创建一个远程URL
    NSURL *remoteURL = [NSURL URLWithString:@"https://pan3dme.github.io/pan3d/new/listmain.html"];
    

    
    // 3.创建Request
    NSURLRequest *request =[NSURLRequest requestWithURL:remoteURL];
    // 4.加载网页
    [webView loadRequest:request];
    // 5.最后将webView添加到界面
    [self.view addSubview:webView];
    self.webView = webView;
}

@end
