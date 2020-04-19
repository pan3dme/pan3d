//
//  AnimManager.h
//  iosgl
//
//  Created by zhao on 3/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "ByteArray.h"
#import "AnimData.h"
#import "ResGC.h"

NS_ASSUME_NONNULL_BEGIN

@interface AnimManager :ResGC
+ (instancetype)default;
-(AnimData*)readData:(ByteArray*)byte url:(NSString*)url;
-(AnimData*)getAnimDataImmediate:(NSString*)url;
@end

NS_ASSUME_NONNULL_END
