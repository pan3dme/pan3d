//
//  BaseRes.h
//  iosgl
//
//  Created by zhao on 12/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "ResCount.h"
#import "ByteArray.h"

static NSInteger const PREFAB_TYPE                          = 1;
static NSInteger const SCENE_PARTICLE_TYPE                          = 11;


NS_ASSUME_NONNULL_BEGIN

@interface BaseRes : ResCount
 
 -(void)read ;
+(NSMutableArray*)readIntForTwoByte:(ByteArray*)srcByte nsdata:(NSMutableData*)nsdata ;
 +(NSMutableArray*)readBytes2ArrayBuffer:(ByteArray*)srcByte nsdata:(NSMutableData*)nsdata  dataWidth:(int)dataWidth   offset:(int)offset   stride:(int)stride   readType:(int)readType  ;

-(NSMutableArray*)readMaterialInfo;
@end

NS_ASSUME_NONNULL_END
