//
//  ViewController.m
//  iosgl
//
//  Created by zhao on 2/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "ViewController.h"
#import "BaseNavigationViewController.h"
 
#import "Md5FileViewController.h"
#import "Frame3dViewController.h"
#import "SkillUiViewController.h"
#import "SceneUiViewController.h"
#import "RoleUiViewController.h"
#import "ParticleUiViewController.h"


@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.edgesForExtendedLayout = UIRectEdgeNone;
    self.title=@"主菜单";
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
//    Frame3dViewController *vc01=[[Frame3dViewController alloc] init];
    Md5FileViewController *vc01=[[Md5FileViewController alloc] init];
    
    RoleUiViewController *vc02=[[RoleUiViewController alloc] init];
    ParticleUiViewController *vc03=[[ParticleUiViewController alloc]init];
    SceneUiViewController *vc04=[[SceneUiViewController alloc] init];
    SkillUiViewController *vc05=[[SkillUiViewController alloc] init];
    
    
    [self setTabItemInfo:@"red_tabbar_home" VC:vc01];
    [self setTabItemInfo:@"red_tabbar_huodong01" VC:vc02];
    [self setTabItemInfo:@"red_tabbar_chongzhi_01" VC:vc03];
    [self setTabItemInfo:@"red_tabbar_congzhi" VC:vc04];
    [self setTabItemInfo:@"red_tabbar_my" VC:vc05];
    
    
    vc01.tabBarItem.title = @"场景";
    vc02.tabBarItem.title = @"角色";
    vc03.tabBarItem.title =@"特效";
    vc04.tabBarItem.title = @"场景";
    vc05.tabBarItem.title = @"技能";
    
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
