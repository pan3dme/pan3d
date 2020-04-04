//
//  DualQuatFloat32Array.h
//  iosgl
//
//  Created by zhao on 3/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface Float32Array : NSMutableArray
 
@end

@interface DualQuatFloat32Array : NSObject
@property(nonatomic,strong) Float32Array* quat;
@property(nonatomic,strong) Float32Array* pos;
@end

NS_ASSUME_NONNULL_END
