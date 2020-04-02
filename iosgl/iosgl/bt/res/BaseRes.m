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
#import "ParticleManager.h"
#import "MaterialManager.h"
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
        case 2:
            [self readObj];
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
/*
        public readObj($srcByte: Pan3dByteArray): void {
             var objNum: number = $srcByte.readInt();
 
             for (var i: number = 0; i < objNum; i++) {
                 var url: string = Scene_data.fileRoot + $srcByte.readUTF();
                 var size: number = $srcByte.readInt();
                 var newByte: Pan3dByteArray = new Pan3dByteArray();
                 newByte.length = size;
                 $srcByte.readBytes(newByte, 0, size);
                 var objData: ObjData = ObjDataManager.getInstance().loadObjCom(newByte.buffer, url);
             }
 
             if (this._imgFun) {
                 this._imgFun();
             }
 
         }
 */
-(void)readObj;
{
      int objNum = [self.byte readInt];
    for(int i=0;i<objNum;i++){
 
        NSString *url =   [self.byte readUTF];
        int objsSize=  [self.byte readInt];
        NSData *objsNsdata=  [self.byte getNsDataByLen:objsSize];
        ByteArray *objsByte=  [[ByteArray alloc]init:objsNsdata];
        [[ ObjDataManager default] loadObjCom:objsByte url:url];
   
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
    
      [[MaterialManager default]addResByte:materurl dataByte:materByte];
      
      
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
        [[ParticleManager default] addResByte:particeurl byteArray:particeByte];
    }
    
}
-(NSMutableArray*)readMaterialInfo;
{
    NSMutableArray *arr;
    int len = [self.byte readInt];
    if (len > 0) {
        arr=[[NSMutableArray alloc] init];
        for (int i = 0; i < len; i++) {
            NSMutableDictionary *mDic=[[NSMutableDictionary alloc]init];
            int type= [self.byte readInt];
            [mDic setObject:[NSString stringWithFormat:@"%d",type] forKey:@"type"];
            [mDic setObject:[self.byte readUTF] forKey:@"name"];
            switch (type) {
                case 0:
                    [mDic setObject:[self.byte readUTF] forKey:@"url"];
                    break;
                case 1:
                    [mDic setObject:  [NSString stringWithFormat:@"%f",[self.byte readFloat]]  forKey:@"x"];
                    break;
                case 2:
                    [mDic setObject:  [NSString stringWithFormat:@"%f",[self.byte readFloat]]  forKey:@"x"];
                    [mDic setObject:  [NSString stringWithFormat:@"%f",[self.byte readFloat]]  forKey:@"y"];
                    
                    break;
                case 3:
                    [mDic setObject:  [NSString stringWithFormat:@"%f",[self.byte readFloat]]  forKey:@"x"];
                    [mDic setObject:  [NSString stringWithFormat:@"%f",[self.byte readFloat]]  forKey:@"y"];
                    [mDic setObject:  [NSString stringWithFormat:@"%f",[self.byte readFloat]]  forKey:@"z"];
                    break;
                    
                default:
                    break;
            }
            [arr addObject:mDic];
        }
    }
    
    return arr;
    
}
 /*
 
          public readMaterialInfo(): Array<any> {
  
              var len: number = this._byte.readInt();
              if (len > 0) {
                  var $arr: Array<any> = new Array
                  for (var i: number = 0; i < len; i++) {
                      var $temp: any = new Object();
                      $temp.type = this._byte.readInt()
                      $temp.name = this._byte.readUTF()
                      if ($temp.type == 0) {
                          $temp.url = this._byte.readUTF()
                      }
                      if ($temp.type == 1) {
                          $temp.x = this._byte.readFloat()
                      }
                      if ($temp.type == 2) {
                          $temp.x = this._byte.readFloat()
                          $temp.y = this._byte.readFloat()
                      }
                      if ($temp.type == 3) {
                          $temp.x = this._byte.readFloat()
                          $temp.y = this._byte.readFloat()
                          $temp.z = this._byte.readFloat()
                      }
  
                      $arr.push($temp)
                  }
                  return $arr
              } else {
                  return null
              }
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
        [idxItem addObject:[NSNumber numberWithInt:tempIdx]];
    }
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
        int pos = stride * i + offset*4;
        for (int j = 0; j < dataWidth; j++) {
            switch (readType) {
                case 0:
                    tempNum=  [srcByte readFloatTwoByte:scaleNum];
                    [vItem addObject:[NSNumber numberWithFloat:tempNum]];
                    [nsdata replaceBytesInRange:NSMakeRange(pos+j*4, 4) withBytes: &tempNum length:4];
                    break;
                case 1:
                    tempNum=  [srcByte readFloatOneByte];
                    break;
                case 2:
                    tempNum=  [srcByte readByte];
                    break;
                case 4:
                    tempNum=  [srcByte readFloat];
                    [vItem addObject:[NSNumber numberWithFloat:tempNum]];
                    [nsdata replaceBytesInRange:NSMakeRange(pos+j*4, 4) withBytes: &tempNum length:4];
                    break;
                default:
                    NSLog(@"没有没有");
                    break;
            }
        }
    }
    
    return vItem;
 
    
}

@end
