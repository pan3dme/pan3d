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
 
 -(void)read ;
 +(void)readBytes2ArrayBuffer:(ByteArray*)srcByte nsdata:(NSMutableData*)nsdata  dataWidth:(int)dataWidth   offset:(int)offset   stride:(int)stride   readType:(int)readType  ;

@end

NS_ASSUME_NONNULL_END
