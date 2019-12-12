//
//  ByteArray.h
//  iosgl
//
//  Created by zhao on 12/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface ByteArray : NSObject
@property (nonatomic, strong)  NSData *nsData;
@property (nonatomic, assign)  int position;
- (instancetype)init:(NSData *)value;
- (int) readInt;
-(int)getUint16;
-(NSData *)getNsDataByLen:(int)len;
 
- (NSString *) readUTF;
@end

NS_ASSUME_NONNULL_END
