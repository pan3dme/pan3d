//
//  ResCount.h
//  iosgl
//
//  Created by zhao on 7/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "ByteArray.h"
NS_ASSUME_NONNULL_BEGIN

@interface ResCount : NSObject
@property (nonatomic, assign) int        version;    //
@property (nonatomic, assign) int        useNum;    //
@property (nonatomic, strong) ByteArray        *byte;    //
@end

NS_ASSUME_NONNULL_END
