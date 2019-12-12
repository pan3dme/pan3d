//
//  BaseRes.h
//  iosgl
//
//  Created by zhao on 12/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "ResCount.h"
#import "ByteArray.h"

NS_ASSUME_NONNULL_BEGIN

@interface BaseRes : ResCount
@property (nonatomic, assign) int        version;    //
@property (nonatomic, strong) ByteArray        *byte;    //
-(NSString *)skipByteLen:(int)len;
 -(void)read ;
@end

NS_ASSUME_NONNULL_END
