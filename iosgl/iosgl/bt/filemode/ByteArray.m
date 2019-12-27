//
//  ByteArray.m
//  iosgl
//
//  Created by zhao on 12/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "ByteArray.h"



@implementation ByteArray
- (instancetype)init:(NSData *)value;
{
    self = [super init];
    if (self) {
        self.position=0;
        self.nsData=value;
    }
    return self;
}
-(int)getUint16;
{
    NSData *data0 = [self.nsData subdataWithRange:NSMakeRange(self.position,  2)];
    Byte *testByte = (Byte *)[data0 bytes];
    self.position+=2;
    return  (testByte[0] << 8)+testByte[1];
}
- (NSString *) readUTF;
{
    int len =[self getUint16];;
    NSData *data1 = [self.nsData subdataWithRange:NSMakeRange(self.position, len)];
    NSString *aString = [[NSString alloc] initWithData:data1 encoding:NSUTF8StringEncoding];
    self.position+=len;
    return aString;
    
}
-(NSData *)getNsDataByLen:(int)len;
{
    NSData *data1 = [self.nsData subdataWithRange:NSMakeRange(self.position,  len)];
    self.position+=len;
    return data1;
    
}
- (int) readInt;
{
    int intSize = sizeof(int); // change it to fixe length
    unsigned char * buffer = malloc(intSize * sizeof(unsigned char));
    NSData *data1 = [self.nsData subdataWithRange:NSMakeRange(self.position,  intSize)];
    [data1 getBytes:buffer length:intSize];
    int num = 0;
    for (int i = 0; i < intSize; i++) {
        num = (num << 8) + buffer[i];
    }
    free(buffer);
    self.position+=intSize;
    return num;
}
- (float) readFloat;
{
    int floatSize = sizeof(float); // change it to fixe length
    NSData *data1 = [self.nsData subdataWithRange:NSMakeRange(self.position,  floatSize)];
    int32_t bytes;
    [data1 getBytes:&bytes length:sizeof(bytes)];
    bytes = OSSwapBigToHostInt32(bytes);
    float number;
    memcpy(&number, &bytes, sizeof(bytes));
    self.position+=floatSize;
    return  number;
}
-(int)readShort;
{
    int floatSize = sizeof(short); // change it to fixe length
    NSData *data0 = [self.nsData subdataWithRange:NSMakeRange(self.position,  floatSize)];
    Byte *testByte = (Byte *)[data0 bytes];
    self.position+=floatSize;
    
    return  (testByte[0] << 8)+testByte[1];
}
- (int)readUnsignedInt;
{
    int floatSize = sizeof(unsigned); // change it to fixe length
    NSData *data0 = [self.nsData subdataWithRange:NSMakeRange(self.position, floatSize)];
    Byte *testByte = (Byte *)[data0 bytes];
    self.position+=floatSize;
    return  (testByte[1] << 16)+ (testByte[2] << 8)+testByte[3];
}
-(float)readFloatTwoByte :(float)scaleNum;
{
    return  [self readShort]/scaleNum;
}
-(float)readFloatOneByte  ;
{
     int intSize = sizeof(Byte); // change it to fixe length
     NSData *data1 = [self.nsData subdataWithRange:NSMakeRange(self.position,  intSize)];
        unsigned char * buffer = malloc(intSize * sizeof(unsigned char));
       [data1 getBytes:buffer length:intSize];
    self.position+=intSize;
    
    return   buffer[0] /256;
}
-(Boolean)readBoolean;
{
     int intSize = sizeof(Boolean); // change it to fixe length
     NSData *data1 = [self.nsData subdataWithRange:NSMakeRange(self.position,  intSize)];
        unsigned char * buffer = malloc(intSize * sizeof(unsigned char));
       [data1 getBytes:buffer length:intSize];
    self.position+=intSize;
    return buffer[0]!=0;
}
@end
