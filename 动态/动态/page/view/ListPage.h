//
//  ListPage.h
//  动态
//
//  Created by zhao on 16/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "DynamicBaseVo.h"
NS_ASSUME_NONNULL_BEGIN


@protocol ListPageDelegate<NSObject>
-(void) clikOpenMsgPanel :(DynamicBaseVo*)value ;
@end

@interface ListPage : UIView
@property(assign,nonatomic) id<ListPageDelegate>delegate;
@property(nonatomic,assign)NSInteger tabidx;
-(void)initFristData;
@end

NS_ASSUME_NONNULL_END
