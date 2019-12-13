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
- (ObjData *)getObjDataByUrl:(NSString *)urlStr ;
{
    ObjData *objData=[[ObjData alloc]init];
    
    
    //  [self getLocalPathFileLength];
    SceneRes *sceneRes=[[SceneRes alloc]init];
    [sceneRes load:@"1001_base"];
    
    return objData;
    
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
-(void)loadObjCom:(ByteArray *)value;
{
    ByteArray *byte=value;
    ObjData *objData=[[ObjData alloc]init];
    objData.version= [byte readInt];
    NSLog(@"version-->%d", objData.version);
    NSString *objUrl = [byte readUTF];
    NSLog(@"objUrl-->%@", objUrl);
    NSLog(@"obj长度 -->%lu",   byte.nsData.length);
    
    [self readObj2OneBuffer:byte  objdata:objData];
    
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
     
     NSMutableData *data13 = [[NSMutableData alloc] initWithLength:len];
    [BaseRes readBytes2ArrayBuffer:byte nsdata:data13 dataWidth:3 offset:1 stride:len readType:0];
    
    
    NSLog(@"-------");
}

@end
