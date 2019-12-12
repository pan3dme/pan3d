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
    
    return 1;
}
- (NSString *) readUTF;
{
     self.position+=2;
    int intSize =223;
    NSData *data1 = [self.nsData subdataWithRange:NSMakeRange(self.position, self.position+intSize)];
    NSString *aString = [[NSString alloc] initWithData:data1 encoding:NSUTF8StringEncoding];
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
