//
//  DynamicUITabBar.m
//  DynamicPoject
//
//  Created by zhao on 15/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "DynamicUITabBar.h"

@interface DynamicUITabBar ()

@end
static DynamicUITabBar *dynamicUITabBar = nil;
@implementation DynamicUITabBar
+ (instancetype)Instance;
{
    if (dynamicUITabBar == nil) {
        dynamicUITabBar = [[DynamicUITabBar alloc] init];
    }
    return dynamicUITabBar;
    
}
- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
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
