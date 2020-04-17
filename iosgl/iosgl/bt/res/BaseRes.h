//
//  BaseRes.h
//  iosgl
//
//  Created by zhao on 12/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "ResCount.h"
#import "ByteArray.h"
#import "GL_Header.h"

static NSInteger const PREFAB_TYPE                          = 1;
static NSInteger const IMG_TYPE  = 1;
static NSInteger const OBJS_TYPE = 2;
static NSInteger const MATERIAL_TYPE  = 3;
static NSInteger const PARTICLE_TYPE  = 4;
static NSInteger const SCENE_TYPE  = 5;
static NSInteger const ZIP_OBJS_TYPE  = 6;
static NSInteger const SCENE_PARTICLE_TYPE                          = 11;

NS_ASSUME_NONNULL_BEGIN

@interface BaseRes : ResCount

  
+(NSMutableArray*)readIntForTwoByte:(ByteArray*)srcByte nsdata:(NSMutableData*)nsdata ;
 +(NSMutableArray*)readBytes2ArrayBuffer:(ByteArray*)srcByte nsdata:(NSMutableData*)nsdata  dataWidth:(int)dataWidth   offset:(int)offset   stride:(int)stride   readType:(int)readType  ;
+(NSArray<NSDictionary*>*)readMaterialParamData:(ByteArray*)byte;

-(void)read:(SuccessBlock)fun;
 -(void)read ;
-(Vector3D*)readV3d:(ByteArray*)fs;
-(NSMutableArray*)readMaterialInfo;
- (NSData *)gzipInflate:(NSData*)data;
@end

NS_ASSUME_NONNULL_END
