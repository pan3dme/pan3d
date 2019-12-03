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
    
    [self addScrollView];
    
   self.edgesForExtendedLayout = UIRectEdgeNone;
    
    
}
-(void)addScrollView{
    
    _scrolView.bounces=NO;
    _scrolView.pagingEnabled=YES;
    _scrolView.contentSize =CGSizeMake(_scrolView.bounds.size.width*2, 0);
    _scrolView.showsHorizontalScrollIndicator = NO;//水平滚动条
    _scrolView.showsVerticalScrollIndicator = NO;
    
    _scrolView.frame= self.view.frame;
    _scrolView.autoresizingMask = UIViewAutoresizingFlexibleHeight | UIViewAutoresizingFlexibleWidth;
    [self addPublicTabelView];
    [self addPrivteTabelView];
    
    
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
