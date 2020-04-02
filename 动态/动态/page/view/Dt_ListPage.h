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


@protocol Dt_ListPageDelegate<NSObject>
-(void) clikOpenMsgPanel :(DynamicBaseVo*)value ;
@end

@interface Dt_ListPage : UIView
@property(assign,nonatomic) id<Dt_ListPageDelegate>delegate;
@property(nonatomic,assign)NSInteger tabidx;
-(void)initFristData;
-(void)refrishAddNewMsg;
@end

NS_ASSUME_NONNULL_END
