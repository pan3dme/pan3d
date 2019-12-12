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
    NSData *data0 = [self.nsData subdataWithRange:NSMakeRange(self.position, self.position+2)];
    Byte *testByte = (Byte *)[data0 bytes];
    self.position+=2;
    return  (testByte[0] << 8)+testByte[1];
}
- (NSString *) readUTF;
{
    int len =[self getUint16];;
    NSData *data1 = [self.nsData subdataWithRange:NSMakeRange(self.position, self.position+len)];
    NSString *aString = [[NSString alloc] initWithData:data1 encoding:NSUTF8StringEncoding];
       self.position+=len;
    return aString;
    
}
- (int) readInt;
{
    int intSize = sizeof(int); // change it to fixe length
    unsigned char * buffer = malloc(intSize * sizeof(unsigned char));
    NSData *data1 = [self.nsData subdataWithRange:NSMakeRange(self.position, self.position+intSize)];
    [data1 getBytes:buffer length:intSize];
    int num = 0;
    for (int i = 0; i < intSize; i++) {
        num = (num << 8) + buffer[i];
    }
    free(buffer);
    self.position+=intSize;
    return num;
}
@end
