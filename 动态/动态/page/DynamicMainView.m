//
//  DynamicMainView.m
//  动态
//
//  Created by zhao on 16/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Header.h"
#import "DynamicMainView.h"
#import "TabTittlView.h"


@interface DynamicMainView ()

@property(nonatomic,strong)TabTittlView* tabTittlView;

@end

@implementation DynamicMainView

- (void)viewDidLoad {
    [super viewDidLoad];
    self.title=@"动态";
 
    self.view.backgroundColor=[UIColor whiteColor];
    
    
    self.tabTittlView=[[TabTittlView alloc]init];
    [self.view addSubview:self.tabTittlView];
    
     self.navigationController.navigationBar.hidden = NO;  //显示头部
    [self.navigationController setNavigationBarHidden:NO];
    
}

- (void)viewWillLayoutSubviews;
{

    self.tabTittlView.frame=CGRectMake(0, 50*kScaleHeight, kScreenW, 50*kScaleHeight);
    
    
    
}

 

@end
