//
//  TimeLineData.m
//  iosgl
//
//  Created by zhao on 23/2/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "TimeLineData.h"
#import "Vector3D.h"

@implementation TimeLineData
- (instancetype)init
{
    self = [super init];
    if (self) {
        self.dataAry=[[NSMutableArray alloc]init];
    }
    return self;
}
-(void)setByteData:(ByteArray*)byte;
{
    float len =[byte readFloat];
    for (int i = 0; i < len; i++) {
        float frameNum = [byte readFloat];
        KeyFrame* key = [self addKeyFrame: frameNum];
        key.frameNum = frameNum;
        key.baseValue =[[NSMutableArray alloc]init] ;
        for (int j = 0; j < 10; j++) {
            [key.baseValue addObject:  [NSString stringWithFormat:@"%f",[byte readFloat] ]];
        }
        float animLen = [byte readFloat];
        key.animData=[[NSMutableArray alloc]init] ;
        if (animLen > 0) {
            for (int k = 0; k < animLen; k++) {
                [key.animData addObject:  [self getByteDataTemp:byte]];
            }
        }
    }
    self.maxFrameNum = 100;
    self.beginTime = 0;
    
     
    
   // self.maxFrameNum = self.dataAry[self.dataAry.count - 1].frameNum;
   // self.beginTime = self.dataAry[0].frameNum * Scene_data.frameTime;
    
    /*
      var len: number = $byte.readFloat();
                 for (var i: number = 0; i < len; i++) {
                     var frameNum: number = $byte.readFloat();
                     var key: KeyFrame = this.addKeyFrame(frameNum);
                     key.frameNum = frameNum;
                     key.baseValue = new Array();
                     for (var j: number = 0; j < 10; j++) {
                         key.baseValue.push($byte.readFloat());
                     }
                     var animLen: number = $byte.readFloat();
                     key.animData = new Array
                     if (animLen > 0) {
                         for (var k: number = 0; k < animLen; k++) {
     
                             key.animData.push(this.getByteDataTemp($byte))
     
                         }
                     }
                 }
                 this.maxFrameNum = this.dataAry[this.dataAry.length - 1].frameNum;
                 this.beginTime = this.dataAry[0].frameNum * Scene_data.frameTime;
     */
}
-(KeyFrame*)addKeyFrame:(float)num;
{
    KeyFrame *keyFrame=[[KeyFrame alloc]init];
    keyFrame.frameNum=num;
    [self.dataAry addObject:keyFrame];
    return keyFrame;
    
}
-(NSMutableDictionary*)getByteDataTemp:(ByteArray*)byte;
{
    NSMutableDictionary* obj = [[NSMutableDictionary alloc]init];
    int animType =  [byte readInt];
    int dataLen =  [byte readInt];
    obj[@"data"] = [[NSMutableArray alloc]init];
    obj[@"dataByte"] =  [[NSMutableArray alloc]init];
    for (int i = 0; i < dataLen; i++) {
        int type =[byte readInt];
        if ( type== 1) {
            float num =[byte readFloat];
            [obj[@"dataByte"]  addObject: [NSString stringWithFormat:@"%f",num]];
        }
        if (type == 2) {
            Vector3D* v  = [[Vector3D alloc]init];
            v.x = [byte readFloat];
            v.y = [byte readFloat];
            v.z = [byte readFloat];
            [obj[@"dataByte"]  addObject:v];
        }
    }
    obj[@"type"] = [NSString stringWithFormat:@"%d",animType];
    return obj;
}
/*
 private getByteDataTemp($byte: Pan3dByteArray): any {
             var obj: any = new Object;
             var animType: number = $byte.readInt()
             var dataLen: number = $byte.readInt()
             obj.data = new Array;
             obj.dataByte = new Array;
             for (var i: number = 0; i < dataLen; i++) {
                 var ko: any = new Object;
                 ko.type = $byte.readInt();
                 //  ko.value = $byte.readUTF();
                 // obj.data.push(ko);
                 if (ko.type == 1) {
                     var num: number = $byte.readFloat()
                     obj.dataByte.push(num);
                 }
                 if (ko.type == 2) {
                     var v: Vector3D = new Vector3D();
                     v.x = $byte.readFloat();
                     v.y = $byte.readFloat();
                     v.z = $byte.readFloat();
                     obj.dataByte.push(v);
                 }
 
             }
             obj.type = animType;
             return obj;
         }
 */
@end
