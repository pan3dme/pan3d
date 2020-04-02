//
//  MsgPanelController.h
//  动态
//
//  Created by zhao on 20/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "Dt_DynamicBaseVo.h"

NS_ASSUME_NONNULL_BEGIN

@interface Dt_MsgPanelController : UIViewController
+ (instancetype)default;
@property (nonatomic,strong)Dt_DynamicBaseVo* dynamicBaseVo;
@end

NS_ASSUME_NONNULL_END
