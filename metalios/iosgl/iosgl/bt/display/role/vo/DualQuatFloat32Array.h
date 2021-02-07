//
//  DualQuatFloat32Array.h
//  iosgl
//
//  Created by zhao on 3/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>
 
@import MetalKit;

NS_ASSUME_NONNULL_BEGIN

 
@interface DualQuatFloat32Array : NSObject
@property(nonatomic,assign) float quat;
@property(nonatomic,assign) float pos;

@property(nonatomic,strong) NSArray<NSNumber*>* quatArr;
@property(nonatomic,strong) NSArray<NSNumber*>* posArr;

@property(nonatomic,strong) id<MTLBuffer>  mtkquatArr;
@property(nonatomic,strong) id<MTLBuffer>  mtkposArr;


@end

NS_ASSUME_NONNULL_END
