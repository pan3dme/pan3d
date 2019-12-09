//
//  ObjDataManager.m
//  iosgl
//
//  Created by zhao on 9/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "ObjDataManager.h"
#import "ObjData.h"

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
    
    [self isLittleEndian];
    
     NSString *path=  [[NSBundle mainBundle]pathForResource:@"box" ofType:@"txt"];
     NSData *reader = [[NSData alloc] initWithContentsOfFile:path];
    
  
    int  a=  [self intFromData:reader];
     int  b=  [self intFromData:reader];
    
    
    return objData;
   
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
- (int) isLittleEndian
{
    int i = 0x12345678;
    char *c = &i;
    return ((c[0] == 0x78) && (c[1] == 0x56) && (c[2] == 0x34) && (c[3] == 0x12));
}
 
@end
