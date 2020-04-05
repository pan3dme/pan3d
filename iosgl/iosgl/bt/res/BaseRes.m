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
#import "Scene_data.h"
#import <zlib.h>

@interface BaseRes()
@property(nonatomic,strong)SuccessBlock imgFun;
@property(nonatomic,assign)int imgNum;
@property(nonatomic,assign)int imgLoadNum;
@property(nonatomic,assign)BOOL imgComplete;
/*
 public static IMG_TYPE: number = 1;
 public static OBJS_TYPE: number = 2;
 public static MATERIAL_TYPE: number = 3;
 public static PARTICLE_TYPE: number = 4;
 public static SCENE_TYPE: number = 5;
 public static ZIP_OBJS_TYPE: number = 6;
 public static PREFAB_TYPE: number = 1;
 public static SCENE_PARTICLE_TYPE: number = 11;
 */
@end
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
-(void)read:(SuccessBlock)fun;
{
    self.imgFun=fun;
    
    int filetype = [self.byte readInt];
    NSLog(@"filetype->%d",filetype);
    NSLog(@"位置-->%d",self.byte.position);
 
    switch (filetype) {
        case IMG_TYPE:
            [self readImgs];
            break;
        case OBJS_TYPE:
            [self readObj];
            break;
        case MATERIAL_TYPE:
            [self readMaterial];
            break;
        case PARTICLE_TYPE:
            [self readParticle];
            break;
        case ZIP_OBJS_TYPE:
            [self readZipObj];
            break;
        default:
            NSLog(@"需要补充");
            
            break;
    }
}
 
-(void)countImg;
{
    self.imgLoadNum++;
    if (self.imgLoadNum == self.imgNum) {
        self.imgComplete = YES;
        [self allResCom];
    }
}
-(void)allResCom;
{
    self.imgFun(@"1");
}
-(void)read ;
{
    [self read:^(NSString* code) { }];
}
 
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
    
    if (self.imgFun) {
        self.imgFun(@"1");
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
  
-(void)readImgs;
{
    self.imgNum = [self.byte readInt];
     self.imgLoadNum = 0;
    for(int i=0;i<self.imgNum;i++){
        NSString *imgurl =   [self.byte readUTF];
        NSLog(@"imgurl-->%@",imgurl);
        int imgSize=  [self.byte readInt];
        NSLog(@"len-->%d",imgSize);
        if(imgSize&&[Scene_data default].supportBlob){
              NSData *imgNsdata=  [self.byte getNsDataByLen:imgSize];
        }
 
      
        
        [self countImg];
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
                     [vItem addObject:[NSNumber numberWithFloat:tempNum]];
                    break;
                case 2:
                    tempNum=  [srcByte readByte];
                     [vItem addObject:[NSNumber numberWithFloat:tempNum]];
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
  //读取材质参数
+(NSArray<NSDictionary*>*)readMaterialParamData:(ByteArray*)byte;
{
    int mpNum=[byte readInt];
    if (mpNum > 0) {
           NSMutableArray<NSMutableDictionary*>* mpAry  =[[NSMutableArray alloc]init];
           for (int j = 0; j < mpNum; j++) {
               NSMutableDictionary* obj =[[NSMutableDictionary alloc]init];
               obj[@"name"] = [byte readUTF];
               obj[@"type"] = [NSNumber numberWithInt:[byte readByte]];
               if ([obj[@"type"]intValue] == 0) {
                   obj[@"url"] = [byte readUTF];
               } else if ([obj[@"type"] intValue]== 1) {
                   obj[@"x"]  =  [NSNumber numberWithInt:[byte readFloat]];
               } else if ([obj[@"type"]intValue] == 2) {
                   obj[@"x"] =  [NSNumber numberWithInt:[byte readFloat]];
                   obj[@"y"] =  [NSNumber numberWithInt:[byte readFloat]];
               } else if ([obj[@"type"]intValue] == 3) {
                   obj[@"x"]=  [NSNumber numberWithInt:[byte readFloat]];
                   obj[@"y"]=  [NSNumber numberWithInt:[byte readFloat]];
                   obj[@"z"] =  [NSNumber numberWithInt:[byte readFloat]];
               }
               [mpAry addObject:obj];
           }
        return mpAry;
    }
     
    return nil;
}
/*
 //读取材质参数
 public static readMaterialParamData(byte: ByteArray): Array<any> {
     var mpNum: number = byte.readInt();
     if (mpNum > 0) {
         var mpAry: Array<any> = new Array;
         for (var j: number = 0; j < mpNum; j++) {
             var obj: any = new Object;
             obj.name = byte.readUTF();
             obj.type = byte.readByte();
             if (obj.type == 0) {
                 obj.url = byte.readUTF();
             } else if (obj.type == 1) {
                 obj.x = byte.readFloat();
             } else if (obj.type == 2) {
                 obj.x = byte.readFloat();
                 obj.y = byte.readFloat();
             } else if (obj.type == 3) {
                 obj.x = byte.readFloat();
                 obj.y = byte.readFloat();
                 obj.z = byte.readFloat();
             }
             mpAry.push(obj);
         }
         return mpAry
     }
     return null
 }
 */
@end
