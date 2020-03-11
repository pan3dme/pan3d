//
//  ByteArray.m
//  iosgl
//
//  Created by zhao on 12/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "ByteArray.h"
#import "Vector3D.h"


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
    int floatSize = sizeof(uint16_t); // change it to fixe length
    NSData *data0 = [self.nsData subdataWithRange:NSMakeRange(self.position,  floatSize)];
    Byte *testByte = (Byte *)[data0 bytes];
    self.position+=floatSize;
    return  (testByte[0] << 8)+testByte[1];
}
 
-(int)readShort;
{
    int floatSize = sizeof(short); // change it to fixe length
    NSData *data0 = [self.nsData subdataWithRange:NSMakeRange(self.position,  floatSize)];
    Byte *testByte = (Byte *)[data0 bytes];
    self.position+=floatSize;
    short c= (testByte[ 0] << 8)|(testByte[1]&0xff);
    return  c;
}


-(NSString *)hexStringFromData:(NSData *)data
{
    NSAssert(data.length > 0, @"data.length <= 0");
    NSMutableString *hexString = [[NSMutableString alloc] init];
    const Byte *bytes = data.bytes;
    for (NSUInteger i=0; i<data.length; i++) {
        Byte value = bytes[i];
        Byte high = (value & 0xf0) >> 4;
        Byte low = value & 0xf;
        [hexString appendFormat:@"%x%x", high, low];
    }//for
    return hexString;
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
-(Vector3D*)readVector3D;
{
    Vector3D* vec3=[[Vector3D alloc]init];
    vec3.x= [self readFloat];
     vec3.y= [self readFloat];
     vec3.z= [self readFloat];
    return vec3;
    
}
-(Vector3D*)readVector3D:(BOOL)w;
{
     Vector3D* vec3= [self readVector3D];
       vec3.w= [self readFloat];
       return vec3;
}
- (int)readByte;
{
    int intSize = sizeof(Byte); // change it to fixe length
        NSData *data1 = [self.nsData subdataWithRange:NSMakeRange(self.position,  intSize)];
           unsigned char * buffer = malloc(intSize * sizeof(unsigned char));
          [data1 getBytes:buffer length:intSize];
       self.position+=intSize;
       
    return  buffer[0];
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

-(NSString *)readUTFBytes:(int)len;
{
    NSData *data0 = [self.nsData subdataWithRange:NSMakeRange(self.position,  len)];
    NSString *aString = [[NSString alloc] initWithData:data0 encoding:NSUTF8StringEncoding];
    self.position+=len;
    
    return aString;
}

//  public readUTFBytes(length: number): string {
//            //if (!this.validate(length)) return null;
//
//            var bytes: Uint8Array = new Uint8Array(this.buffer, this.bufferOffset + this.position, length);
//            this.position += length;
//            /*var bytes: Uint8Array = new Uint8Array(new ArrayBuffer(length));
//             for (var i = 0; i < length; i++) {
//             bytes[i] = this.data.getUint8(this.position++);
//             }*/
//            return this.decodeUTF8(bytes);
//        }
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
    return (float) [self readShort]/scaleNum;
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
