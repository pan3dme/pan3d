//
//  DynamicMainView.m
//  动态
//
//  Created by zhao on 16/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Header.h"
#import "UIView+XBZKeyBoard.h"
#import "DynamicMainView.h"
#import "TabTittlView.h"
#import "ListPage.h"


@interface DynamicMainView ()

@property(nonatomic,strong)TabTittlView* tabTittlView;
@property(nonatomic,strong)ListPage* listPage;
 

@end

@implementation DynamicMainView

- (void)viewDidLoad {
    [super viewDidLoad];
    self.title=@"动态";
 
    self.view.backgroundColor=[UIColor whiteColor];
    
    self.listPage=[[ListPage alloc] initWithFrame:self.view.bounds];
    [self.view addSubview:self.listPage];
    
    self.tabTittlView=[[TabTittlView alloc]init];
    [self.view addSubview:self.tabTittlView];
    
     self.navigationController.navigationBar.hidden = NO;  //显示头部
    [self.navigationController setNavigationBarHidden:NO];
    
}

- (void)viewDidLayoutSubviews;
{

   
self.tabTittlView.frame=CGRectMake(0, 50*kScaleHeight, kScreenW, 50*kScaleHeight);
self.listPage.frame=CGRectMake(0, CGRectGetMaxY(self.tabTittlView .frame) , self.view.width, self.view.height-CGRectGetMaxY(self.tabTittlView .frame));

 
    
}

 

@end
