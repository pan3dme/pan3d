//
//  BaseRes.m
//  iosgl
//
//  Created by zhao on 12/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "BaseRes.h"
#import <UIKit/UIKit.h>
#import "ObjDataManager.h"
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
    NSLog(@"filetype->%d",filetype);
     NSLog(@"位置-->%d",self.byte.position);
    switch (filetype) {
        case 1:
            [self readImgs];
            break;
  case 3:
        [self readMaterial];
        break;
            case 4:
                  [self readParticle];
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
-(void)readMaterial;
{
    int materLen = [self.byte readInt];
 
  for(int i=0;i<materLen;i++){
      NSString *materurl =   [self.byte readUTF];
      NSLog(@"materurl-->%@",materurl);
      int materSize=  [self.byte readInt];
      NSData *materNsdata=  [self.byte getNsDataByLen:materSize];
      ByteArray *materByte=  [[ByteArray alloc]init:materNsdata];
    
      
      
  }
    
}
-(void)readParticle;
{
    int particeLen = [self.byte readInt];
 
  for(int i=0;i<particeLen;i++){
      NSString *particeurl =   [self.byte readUTF];
      NSLog(@"partice-->%@",particeurl);
      int particeSize=  [self.byte readInt];
      NSData *particeNsdata=  [self.byte getNsDataByLen:particeSize];
      ByteArray *particeByte=  [[ByteArray alloc]init:particeNsdata];
 
  }
    
}


/*
 public readMaterial(): void {
            var objNum: number = this._byte.readInt();
            //this.materialAry = new Array;

            var time: number = TimeUtil.getTimer();

            for (var i: number = 0; i < objNum; i++) {
                var url: string = Scene_data.fileRoot + this._byte.readUTF();
                var size: number = this._byte.readInt();

                var dataByte: Pan3dByteArray = new Pan3dByteArray;
                dataByte.length = size;
                this._byte.readBytes(dataByte, 0, size)
                MaterialManager.getInstance().addResByte(url, dataByte);
                //this.materialAry.push(url);

            }
            ////console.log("material time", (TimeUtil.getTimer() - time));

            //this.read();
        }
*/
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
        ByteArray *objByte=  [[ByteArray alloc]init:objNsdata];
        [[ObjDataManager default] loadObjCom:objByte url:objurl];
        
        
    }
    NSLog(@"----------" );
}
+(NSMutableArray*)readIntForTwoByte:(ByteArray*)srcByte nsdata:(NSMutableData*)nsdata ;
{
      NSMutableArray *idxItem=[[NSMutableArray alloc]init];
    int iLen = [srcByte readInt];
    int tempIdx;
    for (int i = 0; i < iLen; i++) {
        tempIdx=  [srcByte readShort];
       // NSLog(@"----->%d",tempIdx);
        [idxItem addObject:[NSNumber numberWithInt:tempIdx]];
    }
      NSLog(@"----------" );
    return idxItem;
}
+(NSMutableArray*)readBytes2ArrayBuffer:(ByteArray*)srcByte nsdata:(NSMutableData*)nsdata  dataWidth:(int)dataWidth   offset:(int)offset   stride:(int)stride   readType:(int)readType  ;
{
    NSMutableArray *vItem=[[NSMutableArray alloc]init];
    int verLength = [srcByte readInt];
    if (verLength <= 0) {
        return nil;
    }
    float scaleNum=1.0;
    if (readType == 0) {
        scaleNum = [srcByte readFloat];
    }
    float tempNum;
    int readNum = verLength / dataWidth;
    for (int i = 0; i < readNum; i++) {
        int pos = stride * i + offset;
        for (int j = 0; j < dataWidth; j++) {
            switch (readType) {
                case 0:
                    tempNum=  [srcByte readFloatTwoByte:scaleNum];
                   // NSLog(@"----->%f",tempNum);
                    [vItem addObject:[NSNumber numberWithFloat:tempNum]];
                    [nsdata replaceBytesInRange:NSMakeRange(pos+j*4, 4) withBytes: &tempNum length:4];
                    break;
                case 1:
                    tempNum=  [srcByte readFloatOneByte];
                 //   NSLog(@"----->%f",tempNum);
                    break;
                default:
                    
                    break;
            }
        }
    }
    
    return vItem;
 
    
}

@end
