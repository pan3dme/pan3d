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
#import "OtherPage.h"
#import "FivePage.h"

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.edgesForExtendedLayout = UIRectEdgeNone;
    self.title=@"页面";
    [self addView];
    self.view.frame=CGRectMake(0, 100, 375, 567);
}

- (void) setTabItemInfo:(NSString *) iconname  VC:(UIViewController *) vc {
    vc.tabBarItem.image = [[UIImage imageNamed:iconname] imageWithRenderingMode:UIImageRenderingModeAlwaysOriginal];
    vc.tabBarItem.selectedImage = [[UIImage imageNamed:   [NSString stringWithFormat:@"%@_active",iconname]] imageWithRenderingMode:UIImageRenderingModeAlwaysOriginal];
    
    vc.tabBarItem.imageInsets = UIEdgeInsetsMake(6, 6, 6,6);
}
-(void)addView{
    OnePageView *vc01=[[OnePageView alloc] init];
    TwoPageView *vc02=[[TwoPageView alloc] init];
    ThirdPageView *vc03= [[ThirdPageView alloc]init];
    
    FivePage *vc04=[[FivePage alloc] init];
    
    
    vc01.tabBarItem.title = @"首3页";
    vc02.tabBarItem.title = @"充值";
    vc03.tabBarItem.title =@"推广";
    vc04.tabBarItem.title = @"消息";
    
    /*
     [self setTabItemInfo:@"shouye" VC:vc01];
     [self setTabItemInfo:@"chongzhi" VC:vc02];
     [self setTabItemInfo:@"tuiguang" VC:vc03];
     [self setTabItemInfo:@"my" VC:vc04];
     */
    
    BaseNavigationViewController *nav001 = [[BaseNavigationViewController alloc] initWithRootViewController:vc01];
    BaseNavigationViewController *nav002 = [[BaseNavigationViewController alloc] initWithRootViewController:vc02];
    BaseNavigationViewController *nav003 = [[BaseNavigationViewController alloc] initWithRootViewController:vc03];
    BaseNavigationViewController *nav004 = [[BaseNavigationViewController alloc] initWithRootViewController:vc04];
    
    
    self.viewControllers=[NSArray arrayWithObjects:nav001,nav002,nav003,nav004 , nil];
    vc01.tabBarItem.badgeValue = @"1";
}


@end
