//
//  SkillRes.m
//  iosgl
//
//  Created by zhao on 17/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "SkillRes.h"
#import "ByteArray.h"
#import "LoadManager.h"
@interface SkillRes()


@property(nonatomic,strong)SuccessBlock fun;



@end
@implementation SkillRes
-(void)load:(NSString*)url  fun:(SuccessBlock)fun;
{
    self.fun=fun;
    [[LoadManager default] loadUrl: url type:LoadManager.BYTE_TYPE fun:^(NSString* value) {
        NSDictionary* dic=(NSDictionary*)value;
        NSData* netNsData = [[NSData alloc] initWithContentsOfFile:dic[@"data"]];
        
        [self loadComplete:[[ByteArray alloc]init:netNsData]];
    }];
    
}
-(void)loadComplete:(ByteArray*)byte;
{
    self.byte=byte;
    self.version= [self.byte readInt];
    self.skillUrl = [self.byte readUTF];
    
    [self read:^(NSString* code) {
        [self readNext];
    }];
}
-(void)readNext;
{
    [self read]; //readmaterial
    [self read]; //readparticle;
    self.data= [self readData:self.byte];
    self.fun(@"1");
}

-(NSMutableDictionary*)readData:(ByteArray*)byte;
{
    NSMutableDictionary* byteData=[[NSMutableDictionary alloc]init];
    int len= [self.byte readInt];
    for (int i    = 0; i < len; i++) {
        NSMutableDictionary* obj=[[NSMutableDictionary alloc]init];
        NSString* name  = [byte readUTF];
        NSString*   action =[byte readUTF];
        obj[@"skillname"] = name;
        obj[@"action"] = action;
        obj[@"type"] = [NSNumber numberWithFloat:[byte readFloat]];
        obj[@"blood"] = [NSNumber numberWithInt:[byte readInt]];
        if ( obj[@"blood"] == 0) {
        }
        int soundTime =  [byte readInt];
        if(soundTime > 0){
            NSString*  soundName =  [byte readUTF];
            obj[@"sound"] = @{@"time":[NSNumber numberWithInt:soundTime],@"name":soundName};
        }
        obj[@"data"] = [[NSMutableArray alloc]init];
        int dLen =  [byte readInt];
        for (int j = 0; j < dLen; j++) {
            NSMutableDictionary* dataObj=[[NSMutableDictionary alloc]init];
            dataObj[@"url"] =  [byte readUTF];
            dataObj[@"frame"] =  [NSNumber numberWithFloat:[byte readFloat ]];
            switch ([obj[@"type"]intValue]) {
                case 1:
                    dataObj[@"beginType"] =[NSNumber numberWithInt:[byte readInt]];
                    if ([dataObj[@"beginType"]intValue] == 0) {
                        Vector3D* beginPos=[[Vector3D alloc]init];
                        dataObj[@"beginPos"] = beginPos;
                        beginPos.x =  [byte readFloat];
                        beginPos.y =  [byte readFloat];
                        beginPos.z =  [byte readFloat];
                    } else if ([dataObj[@"beginType"]intValue] == 1) {
                        dataObj[@"beginSocket"] =  [byte readUTF];
                    }
                    dataObj[@"hitSocket"] =  [byte readUTF];
                    dataObj[@"endParticle"] =  [byte readUTF] ;
                    dataObj[@"multype"] = [NSNumber numberWithInt:[byte readInt]];
                    dataObj[@"speed"] = [NSNumber numberWithInt:[byte readFloat]];
                    
                    break;
                case 3:
                    dataObj[@"beginSocket"] = [byte readUTF];
                    dataObj[@"beginType"] =[NSNumber numberWithInt:[byte readFloat]];
                    dataObj[@"multype"] =[NSNumber numberWithInt:[byte readFloat]];
                    dataObj[@"speed"] =[NSNumber numberWithInt:[byte readFloat]];
                    break;
                case 4:
                    dataObj[@"hasSocket"]=  [NSNumber numberWithBool:[byte readBoolean]];
                    if ([dataObj[@"hasSocket"]boolValue]) {
                        dataObj[@"socket"] =  [byte readUTF];
                    } else {
                        dataObj[@"pos"] = [self readV3d:byte];
                        dataObj[@"rotation"] = [self readV3d:byte];
                    }
                    break;
                default:
                    NSLog(@"没有类型readData");
                    break;
            }
            [obj[@"data"]addObject:dataObj];
        }
        byteData[name]=obj;
        
    }
    return byteData;
}

@end


