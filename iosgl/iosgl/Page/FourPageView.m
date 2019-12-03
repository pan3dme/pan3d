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
    
     [self addTestSprite];
     [self addTestBSprite];
    
    NSLog(@"------->%f", self.view.frame.origin.y);
        [self addsView];
      [self addFanda];
      [self addShuoxiao];

}
-(void)addsView{
    _sView=[[UIView alloc]init];
    
    _sView.frame =CGRectMake(0, 0, 200, 200);
    _sView.backgroundColor=[UIColor yellowColor];
    
    
    [self.view addSubview:_sView];
}
-(void)addFanda{
    UIButton *fangda=[[UIButton alloc]init];
    [fangda setTitle:@"放大" forState:UIControlStateNormal];
    fangda.titleLabel.textColor=[UIColor redColor];
    fangda.backgroundColor=[UIColor blueColor];
    fangda.frame=CGRectMake(0, 0, 80, 20);
    [self.view addSubview:fangda];
    [fangda addTarget:self action:@selector(pressLarge) forControlEvents:UIControlEventTouchUpInside];
    
}
-(void)pressLarge{
     NSLog(@"放大");
    
    [UIView beginAnimations:nil context:nil];
    [UIView setAnimationDuration:1];
    
    _sView.frame=CGRectMake(20, 20, 300, 400    );
    [UIView commitAnimations];
}
-(void)pressSma{
    NSLog(@"缩小");
    
    [UIView beginAnimations:nil context:nil];
    [UIView setAnimationDuration:1];
    
    _sView.frame =CGRectMake(0, 0, 200, 200);
    [UIView commitAnimations];
}
-(void)addShuoxiao{
    UIButton *suoxiao=[[UIButton alloc]init];
    [suoxiao setTitle:@"缩小" forState:UIControlStateNormal];
    suoxiao.titleLabel.textColor=[UIColor redColor];
    suoxiao.backgroundColor=[UIColor blueColor];
    suoxiao.frame=CGRectMake(0, 30, 80, 20);
    [self.view addSubview:suoxiao];
        [suoxiao addTarget:self action:@selector(pressSma) forControlEvents:UIControlEventTouchUpInside];
    
}
-(void)addTestSprite{
    UIView *mc=[[UIView alloc]initWithFrame:_purpleBg.bounds];
    mc.frame=CGRectMake(kScreenW/2, 0,kScreenW, kScreenH/2);
    mc.backgroundColor=[UIColor redColor];
 //       mc.autoresizingMask = UIViewAutoresizingFlexibleHeight | UIViewAutoresizingFlexibleWidth;
      [_purpleBg addSubview:mc];
}
-(void)addTestBSprite{
    UIView *mc=[[UIView alloc]initWithFrame:_purpleBg.bounds];
    mc.frame=CGRectMake(0, kScreenH/2,kScreenW/2, kScreenH/2);
    mc.backgroundColor=[UIColor blueColor];
      //  mc.autoresizingMask = UIViewAutoresizingFlexibleHeight | UIViewAutoresizingFlexibleWidth;
      [_purpleBg addSubview:mc];
}
-(void)addScrollView
{
    _scrolView=[[UIScrollView alloc]initWithFrame:self.view.frame];
    _scrolView.bounces=NO;
    _scrolView.pagingEnabled=YES;
    _scrolView.contentSize =CGSizeMake(_scrolView.bounds.size.width*2, 0);
    _scrolView.showsHorizontalScrollIndicator = NO;//水平滚动条
    _scrolView.showsVerticalScrollIndicator = NO;
    
    _scrolView.frame= self.view.frame;
    _scrolView.autoresizingMask = UIViewAutoresizingFlexibleHeight | UIViewAutoresizingFlexibleWidth;
    [self addPublicTabelView];
    [self addPrivteTabelView];
    
    
    [_purpleBg addSubview:_scrolView];
    
}
-(void)addPublicTabelView
{
    UIImageView *tempui=[[UIImageView alloc]init];
    tempui.image=[UIImage imageNamed:@"xinshoupic"];
    tempui.frame=_scrolView.bounds;
    [_scrolView addSubview:tempui];
   tempui.autoresizingMask = UIViewAutoresizingFlexibleHeight | UIViewAutoresizingFlexibleWidth;
    
    
}
-(void)addPrivteTabelView
{
   
    UIScrollView *rightBmp=[[UIScrollView alloc]init];
    rightBmp.frame=CGRectMake(_scrolView.bounds.size.width, 0, _scrolView.bounds.size.width, _scrolView.bounds.size.height );
    [_scrolView addSubview:rightBmp];
    rightBmp.autoresizingMask = UIViewAutoresizingFlexibleHeight | UIViewAutoresizingFlexibleWidth;
     
    UIImageView *tempui=[[UIImageView alloc]init];
    tempui.image=[UIImage imageNamed:@"xinshoupic"];
    tempui.frame=CGRectMake(0, 0, _scrolView.bounds.size.width, _scrolView.bounds.size.height*1.5);
    [rightBmp addSubview:tempui];
    tempui.autoresizingMask = UIViewAutoresizingFlexibleHeight | UIViewAutoresizingFlexibleWidth;
    rightBmp.contentSize =CGSizeMake(0,tempui.frame.size.height);
}


 

@end
