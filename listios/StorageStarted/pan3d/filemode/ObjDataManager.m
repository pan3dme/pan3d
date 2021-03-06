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
@interface ObjDataManager ()
@property(nonatomic,strong)NSMutableDictionary* loadList;
@end
static ObjDataManager *instance = nil;
@implementation ObjDataManager
 
 
  
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
-(void)getObjData:(NSString*)url fun:(void (^)(ObjData * ))fun;
{
    ObjDataManager* this=self;
    if (this.dic[url]) {
        fun(this.dic[url]);
        return;
    }
    NSMutableArray* ary;
    if (!this.loadList[url]) {
        this.loadList[url] =[[NSMutableArray alloc]init];
//        LoadManager.getInstance().load($url, LoadManager.BYTE_TYPE, ($byte: ArrayBuffer) => {
//            this.loadObjCom($byte, $url);
//        });
    }
    ary = this.loadList[url];
    [ary addObject:fun];
}
/*
 public getObjData($url: string, $fun: Function): void {

        if (this._dic[$url]) {
            $fun(this._dic[$url]);
            this._dic[$url].useNum++;
            return;
        }
        var ary: Array<Function>;
        if (!this._loadList[$url]) {
            this._loadList[$url] = new Array;

            LoadManager.getInstance().load($url, LoadManager.BYTE_TYPE, ($byte: ArrayBuffer) => {
                this.loadObjCom($byte, $url);
            });

        }
        ary = this._loadList[$url];
        ary.push($fun);

    }
 */
 
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
    ObjData *objData=[[ObjData alloc]init:self.scene3D];
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
    int buffStride=dataWidth * 4;
    int   len =(int) [byte readFloat]; //整体数据长度
    
    NSMutableData *dataBase = [[NSMutableData alloc] initWithLength:len*buffStride];
    
    int verOffsets = 0;
    int uvsOffsets = 3;
    int lightuvsOffsets = uvsOffsets + 2;
    int normalsOffsets = typeItem[2] ? (lightuvsOffsets + 2) : (uvsOffsets + 2);
    int tangentsOffsets = normalsOffsets + 3;
    int bitangentsOffsets = tangentsOffsets + 3;
    
    objdata.vertices=  [BaseRes readBytes2ArrayBuffer:byte nsdata:dataBase dataWidth:3 offset:verOffsets stride:buffStride readType:0];
    objdata.uvs=   [BaseRes readBytes2ArrayBuffer:byte nsdata:dataBase dataWidth:2 offset:uvsOffsets stride:buffStride readType:0];
    objdata.lightuvs=  [BaseRes readBytes2ArrayBuffer:byte nsdata:dataBase dataWidth:2 offset:lightuvsOffsets stride:buffStride readType:1];
    objdata.nrms= [BaseRes readBytes2ArrayBuffer:byte nsdata:dataBase dataWidth:3 offset:normalsOffsets stride:buffStride readType:0];
    [BaseRes readBytes2ArrayBuffer:byte nsdata:dataBase dataWidth:3 offset:tangentsOffsets stride:buffStride readType:0];
    [BaseRes readBytes2ArrayBuffer:byte nsdata:dataBase dataWidth:3 offset:bitangentsOffsets stride:buffStride readType:0];
    
    
    NSMutableData *indexNsData = [[NSMutableData alloc] initWithLength:len];
    objdata.indexs=   [BaseRes readIntForTwoByte:byte nsdata:indexNsData];
    
    objdata.uvsOffsets = uvsOffsets  ;
    objdata.lightuvsOffsets = lightuvsOffsets  ;
    objdata.normalsOffsets = normalsOffsets  ;
    objdata.tangentsOffsets = tangentsOffsets  ;
    objdata.bitangentsOffsets = bitangentsOffsets  ;
    objdata.stride = buffStride;
    objdata.dataView=dataBase;
    
    NSLog(@"indexlen----%lu", objdata.indexs.count);
}

@end
