//
//  OnePageView.h
//  iosgl
//
//  Created by zhao on 2/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "BaseUIViewController.h"

NS_ASSUME_NONNULL_BEGIN

@interface OnePageView : BaseUIViewController
@property (strong, nonatomic) IBOutlet UIView *baseViewBg;
@property (nonatomic, strong) UIView                       *statusBarView;//IPX系列特殊遮罩
@end

NS_ASSUME_NONNULL_END
