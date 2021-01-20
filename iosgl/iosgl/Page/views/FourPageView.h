//
//  FourPageView.h
//  iosgl
//
//  Created by zhao on 2/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "BaseUIViewController.h"

NS_ASSUME_NONNULL_BEGIN

@interface FourPageView : BaseUIViewController
@property (strong, nonatomic) IBOutlet UIView *baseViewBg;

@property (weak, nonatomic) IBOutlet UIView *purpleBg;

 @property (nonatomic, strong)  UIScrollView *scrolView;

@property (nonatomic, strong)  UIView *sView;
@property (nonatomic, strong)  UIView *view01;
@property (nonatomic, strong)  UIView *view02;
@property (nonatomic, strong)  UIView *view03;
@property (nonatomic, strong)  UIView *view04;
@property (nonatomic, strong)  UIView *viewmid;


@end

NS_ASSUME_NONNULL_END
