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
}
- (void)initFWUI NS_REQUIRES_SUPER;
{
    [super initFWUI];
    self.winBg=_baseViewBg;
 
    _baseViewBg.frame=CGRectMake(0, 43,kScreenW, kScreenH-200);
      [  self.view addSubview:_baseViewBg];
 
      CtxUIView *ctxUI=[[CtxUIView alloc] initWithFrame:_baseViewBg.bounds];
      ctxUI.backgroundColor=[UIColor clearColor];
      [_baseViewBg addSubview:ctxUI];
      
      ctxUI.autoresizingMask = UIViewAutoresizingFlexibleHeight ;
}

 
 

@end
