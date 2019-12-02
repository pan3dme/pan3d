//
//  BaseNavigationViewController.m
//  iosgl
//
//  Created by zhao on 2/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//
#import <UIKit/UIKit.h>
#import "MyNavigationBar.h"
#import "BaseNavigationViewController.h"

@interface BaseNavigationViewController ()

@end

@implementation BaseNavigationViewController

- (void)viewDidLoad
{
    [super viewDidLoad];
    [self setValue:[MyNavigationBar new] forKeyPath:@"navigationBar"];
}
//写这一个是为了适配iphoneX,就算空实现也要写，不写的话，导航栏的坐标设置不生效，挺奇怪的
-(void)viewDidAppear:(BOOL)animated{
}
 

@end
