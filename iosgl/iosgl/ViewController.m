//
//  ViewController.m
//  iosgl
//
//  Created by zhao on 2/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "ViewController.h"

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    UIView *viewBg=[[UIView alloc]init];
    viewBg.backgroundColor=[UIColor redColor];
    viewBg.frame =CGRectMake(0, 0, 200, 100);
    
    [self.view addSubview:viewBg];
}


@end
