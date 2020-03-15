//
//  RedBagRefreshGifHeader.m
//  RedbagApp
//
//  Created by zhao on 11/3/2020.
//  Copyright © 2020 xfg. All rights reserved.
//

#import "RedBagRefreshGifHeader.h"

@implementation RedBagRefreshGifHeader


#pragma mark key的处理
- (void)setLastUpdatedTimeKey:(NSString *)lastUpdatedTimeKey
{
    
}
#pragma mark - 公共方法
- (void)setTitle:(NSString *)title forState:(MJRefreshState)state
{
  
}
- (void)placeSubviews;
{

    [super  placeSubviews];
   
    self.gifView.frame =CGRectMake(CGRectGetWidth(self.bounds)/2-15, 0, 30, 30);

 
      }

/*
 
 //使用红圈加载
-(void)makeRefreshHeaderGf;
{
    RedBagRefreshGifHeader *header = [RedBagRefreshGifHeader headerWithRefreshingBlock:^{
        [self getRechargeList:^(int codenum) {
            [self.bigScrollview.mj_header endRefreshing];
            if(codenum==1){
                [self refrishDataToPage];
            }
        }];
    }];
    // 设置普通状态的动画图片
    NSMutableArray *idleImages = [NSMutableArray array];
    for (NSUInteger i = 1; i<=24; i++) {
        UIImage *image = [UIImage imageNamed:[NSString stringWithFormat:@"refresh_header_%zd", i]];
        [idleImages addObject:image];
    }
    [header setImages:idleImages forState:MJRefreshStateIdle];
    
    // 设置即将刷新状态的动画图片（一松开就会刷新的状态）
    NSMutableArray *refreshingImages = [NSMutableArray array];
    for (NSUInteger i = 1; i<=24; i++) {
        UIImage *image = [UIImage imageNamed:[NSString stringWithFormat:@"refresh_header_%zd", i]];
        [refreshingImages addObject:image];
    }
    [header setImages:refreshingImages forState:MJRefreshStatePulling];
    [header setTitle:@"" forState:MJRefreshStateRefreshing];
    self.bigScrollview.mj_header = header;
    self.bigScrollview.backgroundColor=[UIColor whiteColor];
}
*/
@end
