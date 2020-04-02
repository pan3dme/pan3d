//
//  ViewController.m
//  动态
//
//  Created by zhao on 15/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "ViewController.h"
#import "Dt_DynamicMainView.h"

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    [self addView];
}
-(void)addView{
    Dt_DynamicMainView *vc01=[[Dt_DynamicMainView alloc] init];
    OnePageView *vc02=[[OnePageView alloc] init];
    OnePageView *vc03=[[OnePageView alloc]init];
    OnePageView *vc04=[[OnePageView alloc] init];
    OnePageView *vc05=[[OnePageView alloc] init];
 
    
    
    [self setTabItemInfo:@"red_tabbar_home" VC:vc01];
    [self setTabItemInfo:@"red_tabbar_home" VC:vc02];
    [self setTabItemInfo:@"red_tabbar_home" VC:vc03];
    [self setTabItemInfo:@"red_tabbar_home" VC:vc04];
    [self setTabItemInfo:@"red_tabbar_home" VC:vc05];
    
    
    vc01.tabBarItem.title = @"首3页";
    vc02.tabBarItem.title = @"充值";
    vc03.tabBarItem.title =@"推广";
    vc04.tabBarItem.title = @"消息";
    vc05.tabBarItem.title = @"其他";
    
   vc03.tabBarItem.imageInsets = UIEdgeInsetsMake(-10, -5, 0,-5);
    
    
    UINavigationController *nav001 = [[UINavigationController alloc] initWithRootViewController:vc01];
    UINavigationController *nav002 = [[UINavigationController alloc] initWithRootViewController:vc02];
    UINavigationController *nav003 = [[UINavigationController alloc] initWithRootViewController:vc03];
    UINavigationController *nav004 = [[UINavigationController alloc] initWithRootViewController:vc04];
    UINavigationController *nav005 = [[UINavigationController alloc] initWithRootViewController:vc05];
    
    
    self.viewControllers=[NSArray arrayWithObjects:nav001,nav002,nav003,nav004 ,nav005, nil];
    vc01.tabBarItem.badgeValue = @"1";
}
- (void) setTabItemInfo:(NSString *) iconname  VC:(UIViewController *) vc {
    vc.tabBarItem.image = [[UIImage imageNamed:[NSString stringWithFormat:@"%@",iconname]] imageWithRenderingMode:UIImageRenderingModeAlwaysOriginal];
    vc.tabBarItem.selectedImage = [[UIImage imageNamed:iconname] imageWithRenderingMode:UIImageRenderingModeAlwaysOriginal];
    vc.tabBarItem.imageInsets = UIEdgeInsetsMake(1, 1, 1,1);
}


@end
