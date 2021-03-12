//
//  ListViewController.m
//  iosgl
//
//  Created by pan3dme on 2021/3/12.
//  Copyright © 2021 zhao. All rights reserved.
//

#import "ListViewController.h"
#define NavigationBar_H 65.f
#define TabBar_H 100.f
@interface ListViewController ()
@property (nonatomic ,strong) UIView *bgBaseUiView;
@property (nonatomic ,strong) UIView *statusBar;
@end

@implementation ListViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    [self addViews];
    [self setupStatusBarColor:[UIColor whiteColor]];
}
-(void)addViews
{
    self.bgBaseUiView=[[UIView alloc]init];
    self.bgBaseUiView.backgroundColor=[UIColor grayColor];
    [self.view addSubview: self.bgBaseUiView];
}
- (void)viewDidLayoutSubviews
{
    self.bgBaseUiView.frame=CGRectMake(0.f, CGRectGetMaxY(_statusBar.frame), self.view.bounds.size.width,[UIScreen mainScreen].bounds.size.height- NavigationBar_H-TabBar_H);
    
}

- (void)setupStatusBarColor:(UIColor *)color
{
    if (!_statusBar) {
        UIWindow *keyWindow = [UIApplication sharedApplication].windows[0];
        CGRect rect=CGRectMake(0, 0, [UIScreen mainScreen].bounds.size.width, NavigationBar_H);
        _statusBar = [[UIView alloc] initWithFrame:rect];
        [keyWindow addSubview:_statusBar];
    }
    if ([_statusBar respondsToSelector:@selector(setBackgroundColor:)]) {
        _statusBar.backgroundColor = color;
    }
}




@end
