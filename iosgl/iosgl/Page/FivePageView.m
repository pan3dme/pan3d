//
//  FivePageView.m
//  iosgl
//
//  Created by zhao on 2/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "FivePageView.h"

@interface FivePageView ()

@end

@implementation FivePageView

- (void)viewDidLoad {
    [super viewDidLoad];
 
    self.view.backgroundColor=[UIColor redColor];
    [self.view addSubview:self.scrolView];
    
    
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
