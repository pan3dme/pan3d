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
#import "SkillActionVo.h"
#import "DataObjTempVo.h"
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
        SkillActionVo* obj=[[SkillActionVo alloc]init];
        NSString* name  = [byte readUTF];
        NSString*   action =[byte readUTF];
        obj.skillname = name;
        obj.action = action;
        obj.type = [[NSNumber numberWithFloat:[byte readFloat]] intValue];
        obj.blood =  [byte readInt];
        if ( obj.blood == 0) {
        }
        int soundTime =  [byte readInt];
        if(soundTime > 0){
            NSString*  soundName =  [byte readUTF];
            obj.sound = @{@"time":[NSNumber numberWithInt:soundTime],@"name":soundName};
        }
        obj.data = [[NSMutableArray alloc]init];
        int dLen =  [byte readInt];
        for (int j = 0; j < dLen; j++) {
            DataObjTempVo* dataObj=[[DataObjTempVo alloc]init];
            dataObj.url =  [byte readUTF];
            dataObj.frame =   [byte readFloat ];
            switch (obj.type ) {
                case 1:
                    dataObj.beginType = [byte readInt];
                    if (dataObj.beginType == 0) {
                        Vector3D* beginPos=[[Vector3D alloc]init];
                        dataObj.beginPos = beginPos;
                        beginPos.x =  [byte readFloat];
                        beginPos.y =  [byte readFloat];
                        beginPos.z =  [byte readFloat];
                    } else if (dataObj.beginType == 1) {
                        dataObj.beginSocket=  [byte readUTF];
                    }
                    dataObj.hitSocket=  [byte readUTF];
                    dataObj.endParticle =  [byte readUTF] ;
                    dataObj.multype =  [byte readInt];
                    dataObj.speed = [byte readFloat];
                    
                    break;
                case 3:
                    dataObj.beginSocket = [byte readUTF];
                    dataObj.beginType = [byte readFloat];
                    dataObj.multype = [byte readFloat];
                    dataObj.speed =  [byte readFloat];
                    break;
                case 4:
                    dataObj.hasSocket=  [byte readBoolean];
                    if (dataObj.hasSocket) {
                        dataObj.socket =  [byte readUTF];
                    } else {
                        dataObj.pos = [self readV3d:byte];
                        dataObj.rotation = [self readV3d:byte];
                    }
                    break;
                default:
                    NSLog(@"没有类型readData");
                    break;
            }
 
            [obj.data addObject:dataObj];
        }
        byteData[name]=obj;
        
    }
    return byteData;
}

@end


