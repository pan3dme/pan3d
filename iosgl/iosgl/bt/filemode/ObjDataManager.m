//
//  ObjDataManager.m
//  iosgl
//
//  Created by zhao on 9/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "ObjDataManager.h"
#import "ObjData.h"
#import "ByteArray.h"
#import "SceneRes.h"

static ObjDataManager *instance = nil;
@implementation ObjDataManager
+ (instancetype)default{
    if (instance == nil) {
        instance = [[ObjDataManager alloc] init];
    }
    return instance;
}
- (instancetype)init
{
    self = [super init];
    if (self) {
        self.dic=[[NSMutableDictionary alloc]init];
    }
    return self;
}
  
-(void)getLocalPath;
{
    NSString *path=  [[NSBundle mainBundle]pathForResource:@"baoxiang" ofType:@"txt"];
    NSData *reader = [[NSData alloc] initWithContentsOfFile:path];
    ByteArray *byteArray=[[ByteArray alloc]init:reader];
    
    int version = [byteArray readInt];
    NSLog(@"version-->%d",version);
    NSLog(@"---------");
    NSString *txtStr =   [byteArray readUTF];
    NSLog(@"txtStr-->%@",txtStr);
}
- (void)getLocalPathFileLength
{
    
    NSString *path=  [[NSBundle mainBundle]pathForResource:@"1001_base" ofType:@"txt"];
    NSData *reader = [[NSData alloc] initWithContentsOfFile:path];
    ByteArray *byteArray=[[ByteArray alloc]init:reader];
    NSLog(@"-----length----%lu",   reader.length);
    int version = [byteArray readInt];
    NSLog(@"version-->%d",version);
    int filetype = [byteArray readInt];
    int imglen = [byteArray readInt];
    
    for(int i=0;i<imglen;i++){
        NSString *imgurl =   [byteArray readUTF];
        NSLog(@"imgurl-->%@",imgurl);
    }
    
    
    
    NSLog(@"---------");
}
-(int) checkCPUendian {//返回1，为小端；反之，为大端；
    union
    {
        unsigned int  a;
        unsigned char b;
    }c;
    c.a = 1;
    return 1 == c.b;
}


- (int) intFromData:(NSData *)data
{
    int intSize = sizeof(int); // change it to fixe length
    unsigned char * buffer = malloc(intSize * sizeof(unsigned char));
    [data getBytes:buffer length:intSize];
    int num = 0;
    for (int i = 0; i < intSize; i++) {
        num = (num << 8) + buffer[i];
    }
    free(buffer);
    return num;
}
 
-(void)getObjDataByUrl:(NSString*)url Block:(void (^)(ObjData * ))block;
{
    if(self.dic[url]){
        block(self.dic[url]);
    }else{
        block(nil);
    }
    
    
}
-(void)loadObjCom:(ByteArray *)value  url:(NSString*)url;
{
    ByteArray *byte=value;
    ObjData *objData=[[ObjData alloc]init];
    objData.version= [byte readInt];
    NSLog(@"version-->%d", objData.version);
    NSString *objUrl = [byte readUTF];
    NSLog(@"objUrl-->%@", objUrl);
  //  NSLog(@"obj长度 -->%lu",   byte.nsData.length);
    [self readObj2OneBuffer:byte  objdata:objData];
    [self.dic setObject:objData forKey:url];

    
    
}
-(void)readObj2OneBuffer :(ByteArray*)byte objdata:(ObjData*)objdata{
    NSMutableArray *typeItem=[[NSMutableArray alloc]init];
    int dataWidth=0;
    for (int i = 0; i < 6; i++) {
        Boolean tf=  [byte readBoolean];
        if(tf){
            [typeItem addObject:@1];
        }else{
            [typeItem addObject:@0];
        }
        if (tf) {
            switch (i) {
                case 1://uv
                    dataWidth += 2;
                    break;
                case 2://lightuv
                    dataWidth += 2;
                    break;
                default:
                    dataWidth += 3;
                    break;
            }
            
        }
    }
    int   len =(int) [byte readFloat]; //整体数据长度
    len *= dataWidth * 4;
    
    NSMutableData *dataBase = [[NSMutableData alloc] initWithLength:len];
    
    int verOffsets = 0;
    int uvsOffsets = 3;
    int lightuvsOffsets = uvsOffsets + 2;
    int normalsOffsets = typeItem[2] ? (lightuvsOffsets + 2) : (uvsOffsets + 2);
    int tangentsOffsets = normalsOffsets + 3;
    int bitangentsOffsets = tangentsOffsets + 3;
    
  objdata.vertices=  [BaseRes readBytes2ArrayBuffer:byte nsdata:dataBase dataWidth:3 offset:verOffsets stride:len readType:0];
  objdata.uvs=   [BaseRes readBytes2ArrayBuffer:byte nsdata:dataBase dataWidth:2 offset:uvsOffsets stride:len readType:0];
    [BaseRes readBytes2ArrayBuffer:byte nsdata:dataBase dataWidth:2 offset:lightuvsOffsets stride:len readType:1];
    [BaseRes readBytes2ArrayBuffer:byte nsdata:dataBase dataWidth:3 offset:normalsOffsets stride:len readType:0];
    [BaseRes readBytes2ArrayBuffer:byte nsdata:dataBase dataWidth:3 offset:tangentsOffsets stride:len readType:0];
    [BaseRes readBytes2ArrayBuffer:byte nsdata:dataBase dataWidth:3 offset:bitangentsOffsets stride:len readType:0];
    
    
    NSMutableData *indexNsData = [[NSMutableData alloc] initWithLength:len];
    objdata.indexs=   [BaseRes readIntForTwoByte:byte nsdata:indexNsData];
  
    objdata.uvsOffsets = uvsOffsets * 4;
    objdata.lightuvsOffsets = lightuvsOffsets * 4;
    objdata.normalsOffsets = normalsOffsets * 4;
    objdata.tangentsOffsets = tangentsOffsets * 4;
    objdata.bitangentsOffsets = bitangentsOffsets * 4;
    objdata.stride = dataWidth * 4;
    
    NSLog(@"indexlen----%lu", objdata.indexs.count);
}

@end
