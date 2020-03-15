//
//  ViewController.m
//  iosgl
//
//  Created by zhao on 2/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "ViewController.h"
#import "BaseNavigationViewController.h"
#import "OnePageView.h"
#import "TwoPageView.h"
#import "ThirdPageView.h"
#import "FourPageView.h"
#import "GlkView.h"
 
 #import "FivePageView.h"
#import "TokenSceneView.h"


@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.edgesForExtendedLayout = UIRectEdgeNone;
    self.title=@"页面";
    [self addView];
     NSLog(@" mainScreen%f",     [UIScreen mainScreen].bounds.size.height);
    NSLog(@"   self.view.window.bounds%f",   self.view.window.bounds.size.height);
       NSLog(@"   self.view.bounds%f",   self.view.bounds.size.height);
    
  
    NSLog(@"-----------");
}

- (void) setTabItemInfo:(NSString *) iconname  VC:(UIViewController *) vc {
    vc.tabBarItem.image = [[UIImage imageNamed:[NSString stringWithFormat:@"%@_ac",iconname]] imageWithRenderingMode:UIImageRenderingModeAlwaysOriginal];
    vc.tabBarItem.selectedImage = [[UIImage imageNamed:iconname] imageWithRenderingMode:UIImageRenderingModeAlwaysOriginal];
    vc.tabBarItem.imageInsets = UIEdgeInsetsMake(1, 1, 1,1);
}
-(void)addView{
    OnePageView *vc01=[[OnePageView alloc] init];
    OnePageView *vc02=[[OnePageView alloc] init];
    OnePageView *vc03=[[OnePageView alloc]init];
    OnePageView *vc04=[[OnePageView alloc] init];
  TokenSceneView *vc05=[[TokenSceneView alloc] init];
   // FivePageView *vc05=[[FivePageView alloc] init];
 
    
    
    [self setTabItemInfo:@"red_tabbar_home" VC:vc01];
    [self setTabItemInfo:@"red_tabbar_huodong01" VC:vc02];
    [self setTabItemInfo:@"red_tabbar_chongzhi_01" VC:vc03];
    [self setTabItemInfo:@"red_tabbar_congzhi" VC:vc04];
    [self setTabItemInfo:@"red_tabbar_my" VC:vc05];
    
    
    vc01.tabBarItem.title = @"首3页";
    vc02.tabBarItem.title = @"充值";
    vc03.tabBarItem.title =@"推广";
    vc04.tabBarItem.title = @"消息";
    vc05.tabBarItem.title = @"其他";
    
   vc03.tabBarItem.imageInsets = UIEdgeInsetsMake(-10, -5, 0,-5);
    
    
    BaseNavigationViewController *nav001 = [[BaseNavigationViewController alloc] initWithRootViewController:vc01];
    BaseNavigationViewController *nav002 = [[BaseNavigationViewController alloc] initWithRootViewController:vc02];
    BaseNavigationViewController *nav003 = [[BaseNavigationViewController alloc] initWithRootViewController:vc03];
    BaseNavigationViewController *nav004 = [[BaseNavigationViewController alloc] initWithRootViewController:vc04];
    BaseNavigationViewController *nav005 = [[BaseNavigationViewController alloc] initWithRootViewController:vc05];
    
    
    self.viewControllers=[NSArray arrayWithObjects:nav001,nav002,nav003,nav004 ,nav005, nil];
    vc01.tabBarItem.badgeValue = @"1";
}


@end
