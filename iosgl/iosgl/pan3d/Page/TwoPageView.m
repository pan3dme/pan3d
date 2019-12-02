//
//  TwoPageView.m
//  iosgl
//
//  Created by zhao on 2/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "TwoPageView.h"
#import "MathCore.h"
#import "CtxUIView.h"

@interface TwoPageView ()

@end

@implementation TwoPageView

- (void)viewDidLoad {
    [super viewDidLoad];
       self.title=@"two";
    _baseViewBg.frame=CGRectMake(0, 43,kScreenW, kScreenH-320);
    [  self.view addSubview:_baseViewBg];
    
    
    _baseViewBg.frame=CGRectMake(0, 43,kScreenW, kScreenH-320);
    [  self.view addSubview:_baseViewBg];
    
    CtxUIView *ctxUI=[[CtxUIView alloc] initWithFrame:_baseViewBg.bounds];
    ctxUI.backgroundColor=[UIColor clearColor];
    [_baseViewBg addSubview:ctxUI];
    
    ctxUI.autoresizingMask = UIViewAutoresizingFlexibleHeight ;
    
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
