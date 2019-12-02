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
    
    
}
-(void)addScrollView{
    
    _scrolView.bounces=NO;
   // _scrolView.userInteractionEnabled=YES;
    //是否按整页来滚动视图
    _scrolView.pagingEnabled=YES;
    _scrolView.contentSize =CGSizeMake(_scrolView.bounds.size.width*2, _scrolView.bounds.size.height);
    _scrolView.showsHorizontalScrollIndicator = NO;//水平滚动条
    _scrolView.showsVerticalScrollIndicator = NO;
   // _scrolView.delegate=self;
    
       _scrolView.frame= self.view.frame;
    
    
    [self addPublicTabelView];
    [self addPrivteTabelView];
    
}
-(void)addPublicTabelView
{
    UIImageView *tempui=[[UIImageView alloc]init];
    tempui.image=[UIImage imageNamed:@"xinshoupic"];
    tempui.frame=_scrolView.bounds;
    [_scrolView addSubview:tempui];
    
}
-(void)addPrivteTabelView
{
    UIImageView *tempui=[[UIImageView alloc]init];
      tempui.image=[UIImage imageNamed:@"xinshoupic"];
      tempui.frame=CGRectMake(_scrolView.bounds.size.width, 0, _scrolView.bounds.size.width, _scrolView.bounds.size.height*1.5);
      [_scrolView addSubview:tempui];
}
 

@end
