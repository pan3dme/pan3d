//
//  ByteArray.h
//  iosgl
//
//  Created by zhao on 12/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "Vector3D.h"
NS_ASSUME_NONNULL_BEGIN

@interface ByteArray : NSObject
@property (nonatomic, strong)  NSData *nsData;
@property (nonatomic, assign)  int position;
- (instancetype)init:(NSData *)value;
-(Vector3D*)readVector3D;
-(Vector3D*)readVector3D:(BOOL)w;
- (int) readByte;
- (int) readInt;
- (int) readShort;
- (float) readFloat;
- (float) readFloatOneByte  ;
- (float) readFloatTwoByte :(float)scaleNum;
- (Boolean)readBoolean;
- (int)getUint16;
- (int)readUnsignedInt;
- (NSData *)getNsDataByLen:(int)len;
- (NSString *) readUTF;
-(NSString *)readUTFBytes:(int)len;
@end

NS_ASSUME_NONNULL_END
