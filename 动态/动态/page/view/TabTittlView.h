//
//  TabTittlView.h
//  动态
//
//  Created by zhao on 16/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@protocol TabTittlViewDelegate<NSObject>
-(void) selectTabIdx:(int)value;
-(void) clikAddViewEvent;
@end

@interface TabTittlView : UIView
@property(assign,nonatomic) id<TabTittlViewDelegate>delegate;
-(void)selectTabByIndex:(int)value;
@end

NS_ASSUME_NONNULL_END
