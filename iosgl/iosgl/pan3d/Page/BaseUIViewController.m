//
//  BaseUIViewController.m
//  iosgl
//
//  Created by zhao on 2/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "BaseUIViewController.h"
#import "MathCore.h"

@interface BaseUIViewController ()

@end

@implementation BaseUIViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    self.tabBarController.tabBar.backgroundColor = [UIColor whiteColor];
    self.edgesForExtendedLayout = UIRectEdgeNone;
    self.edgesForExtendedLayout = UIRectEdgeTop;
    self.view.frame=CGRectMake(0, 0,kScreenW , kScreenH-150);
    if(!self.statusBarView){
        self.statusBarView = [[UIView alloc] initWithFrame:CGRectMake(0, 0, kScreenW, 42)];
        [self.statusBarView setBackgroundColor:RGB(0, 255, 0)];
        [self.view addSubview:self.statusBarView];
    }
    [self initFWUI];
    if( self.winBg){
        [self.view addSubview: self.winBg];
    }
}
/**
 UI创建
 */
- (void)initFWUI NS_REQUIRES_SUPER;
{
}

@end
