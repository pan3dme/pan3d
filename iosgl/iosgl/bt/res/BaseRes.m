//
//  BaseRes.m
//  iosgl
//
//  Created by zhao on 12/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "BaseRes.h"
#import <UIKit/UIKit.h>

#import "NSData+GZIP.h"
#import <zlib.h>


@implementation BaseRes

typedef void (^PostSuccess)(NSDictionary *responseJson);

//解压缩
- (NSData *)gzipInflate:(NSData*)data
{
    if ([data length] == 0) return data;
    
    unsigned long full_length = [data length];
    unsigned long  half_length = [data length] / 2;
    
    NSMutableData *decompressed = [NSMutableData dataWithLength: full_length + half_length];
    BOOL done = NO;
    int status;
    
    z_stream strm;
    strm.next_in = (Bytef *)[data bytes];
    strm.avail_in = (uInt)[data length];
    strm.total_out = 0;
    strm.zalloc = Z_NULL;
    strm.zfree = Z_NULL;
    
    if (inflateInit2(&strm, (15+32)) != Z_OK)
        return nil;
    
    while (!done)
    {
        // Make sure we have enough room and reset the lengths.
        if (strm.total_out >= [decompressed length])
            [decompressed increaseLengthBy: half_length];
        strm.next_out = [decompressed mutableBytes] + strm.total_out;
        strm.avail_out = (uInt)([decompressed length] - strm.total_out);
        
        // Inflate another chunk.
        status = inflate (&strm, Z_SYNC_FLUSH);
        if (status == Z_STREAM_END)
            done = YES;
        else if (status != Z_OK)
            break;
    }
    if (inflateEnd (&strm) != Z_OK)
        return nil;
    
    // Set real length.
    if (done)
    {
        [decompressed setLength: strm.total_out];
        return [NSData dataWithData: decompressed];
    }
    else return nil;
}
-(void)dddd  : (PostSuccess )PostSuccess{
    
}
-(void)read ;
{
    
    int filetype = [self.byte readInt];
    NSLog(@"位置-->%d",self.byte.position);
    switch (filetype) {
        case 1:
            [self readImgs];
            break;
        case 6:
            [self readZipObj];
            break;
        default:
            NSLog(@"需要补充");
            
            break;
    }
}
-(void)readZipObj;
{
    int zipLen = [self.byte readInt];
    NSData *zipNsData=  [self.byte getNsDataByLen:zipLen];
    NSData *outputData =[self gzipInflate:zipNsData] ;
    NSLog(@"len-%d-解压后长度>%ld",zipLen,outputData.length);
    
    ByteArray *srcByte=  [[ByteArray alloc]init:outputData];
    [self readObj:srcByte];
    
}

-(void)readImgs;
{
    int imglen = [self.byte readInt];
    for(int i=0;i<imglen;i++){
        NSString *imgurl =   [self.byte readUTF];
        NSLog(@"imgurl-->%@",imgurl);
        int imgSize=  [self.byte readInt];
        NSLog(@"len-->%d",imgSize);
    }
}
-(void)readObj:(ByteArray *)srcByte;
{
    int objlen = [srcByte readInt];
    for(int i=0;i<objlen;i++){
        NSString *objurl =   [srcByte readUTF];
        NSLog(@"objurl-->%@",objurl);
        int objSize=  [srcByte readInt];
        NSData *objNsdata=  [srcByte getNsDataByLen:objSize];
        
    }
    NSLog(@"----------" );
}
@end
