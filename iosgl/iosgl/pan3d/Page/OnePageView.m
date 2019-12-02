//
//  OnePageView.m
//  iosgl
//
//  Created by zhao on 2/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "OnePageView.h"
#import "MathCore.h"
#import "CtxUIView.h"

@interface OnePageView ()

@end

@implementation OnePageView

- (void)viewDidLoad {
    [super viewDidLoad];
     self.title=@"one";
}
- (void)initFWUI NS_REQUIRES_SUPER;
{
    [super initFWUI];
    self.winBg=_baseViewBg;
 
    _baseViewBg.frame=CGRectMake(0, 43,kScreenW, kScreenH-150);
      [  self.view addSubview:_baseViewBg];
 
      CtxUIView *ctxUI=[[CtxUIView alloc] initWithFrame:_baseViewBg.bounds];
      ctxUI.backgroundColor=[UIColor clearColor];
      [_baseViewBg addSubview:ctxUI];
      
      ctxUI.autoresizingMask = UIViewAutoresizingFlexibleHeight ;
}

 
 

@end
