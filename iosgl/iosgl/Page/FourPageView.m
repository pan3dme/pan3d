//
//  FourPageView.m
//  iosgl
//
//  Created by zhao on 2/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "FourPageView.h"
#import "CtxUIView.h"
#import "MathCore.h"

@interface FourPageView ()

@end

@implementation FourPageView

- (void)viewDidLoad {
    [super viewDidLoad];
     self.title=@"four";
}
- (void)initFWUI NS_REQUIRES_SUPER;
{
    [super initFWUI];
    //  self.edgesForExtendedLayout = UIRectEdgeAll;
    /*
    self.winBg=_baseViewBg;
 
    _baseViewBg.frame=CGRectMake(0, 43,kScreenW, kScreenH-125);
      [  self.view addSubview:_baseViewBg];
 
      CtxUIView *ctxUI=[[CtxUIView alloc] initWithFrame:_baseViewBg.bounds];
      ctxUI.backgroundColor=[UIColor clearColor];
      [_baseViewBg addSubview:ctxUI];
      
      ctxUI.autoresizingMask = UIViewAutoresizingFlexibleHeight ;
    
    */
    
    self.edgesForExtendedLayout = UIRectEdgeNone;
    // self.edgesForExtendedLayout = UIRectEdgeTop;
}

 

@end
