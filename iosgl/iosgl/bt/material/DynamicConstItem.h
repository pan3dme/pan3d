//
//  DynamicConstItem.h
//  iosgl
//
//  Created by zhao on 9/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "DynamicBaseConstItem.h"
#import "Curve.h"

NS_ASSUME_NONNULL_BEGIN

@interface DynamicConstItem : DynamicBaseConstItem
@property(nonatomic,strong)Curve* curve;
-(void)update:(float)t;
@end

NS_ASSUME_NONNULL_END
