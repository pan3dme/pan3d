//
//  ResGC.h
//  iosgl
//
//  Created by zhao on 7/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "GC.h"

@class Scene3D;

NS_ASSUME_NONNULL_BEGIN

@interface ResGC : GC
@property (nonatomic, strong)  NSMutableDictionary *dic;
@end

NS_ASSUME_NONNULL_END
