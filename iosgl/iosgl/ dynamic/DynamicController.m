//
//  DynamicController.m
//  iosgl
//
//  Created by zhao on 10/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "DynamicController.h"
#import "DynamicHeader.h"

@interface DynamicController ()

@end

@implementation DynamicController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
  
    self.title=@"标题标题001";
    self.navigationController.navigationBar.hidden = NO;  //显示头部
    self.view.frame=CGRectMake(0, 0, kScreenW, kScreenH);
    self.view.backgroundColor=[UIColor whiteColor];
     
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
