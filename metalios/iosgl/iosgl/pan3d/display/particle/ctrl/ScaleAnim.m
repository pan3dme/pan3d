//
//  ScaleAnim.m
//  
//
//  Created by zhao on 31/3/2020.
//

#import "ScaleAnim.h"
#import "Scene_data.h"

@implementation ScaleAnim
-(void)update:(float)t;
{
    ScaleAnim*  this=self;
    if (this.isDeath) {
        return;
    }
    this.time = t - this.baseTime;
    if (this.isActiva) {
        [this coreCalculate];
        if (this.time > this.lastTime) {
            this.isDeath = YES;
        }
    } else {
        if (this.time >= this.beginTime) {
            this.isActiva = YES;
        }
    }
}
-(void)coreCalculate;
{
    ScaleAnim*  this=self;
    int frameNum = this.time / [Scene_data default].frameTime;
    if (frameNum >= this.numAry.count) {
        this.num = [this.numAry[this.numAry.count - 1] floatValue];
    } else {
        this.num = [this.numAry[frameNum]floatValue];
    }
}

-(void)dataByte:(NSArray<NSNumber*>*)va arr:(NSArray<NSNumber*>*)arr;
{
    ScaleAnim*  this=self;
    this.numAry = [[NSMutableArray alloc]init];
    
    this.beginTime = [arr[0]floatValue];
    if ([arr[1]floatValue] == -1) {
        this.lastTime = [Scene_data default] .MAX_NUMBER;
    } else {
        this.lastTime = [arr[1]floatValue];
    }
    this.beginScale = [arr[2]floatValue];
    this.scaleNum = [arr[3]floatValue];
    
    this.scaleAry = [[NSMutableArray alloc]init];
    float addTime  = 0;
    for (int i = 4; i < 4 + this.scaleNum * 2; i += 2) {
        NSMutableDictionary* obj =[[NSMutableDictionary alloc]init];
        obj[@"value"] = arr[i];
        obj[@"time"] = arr[i + 1];
        addTime += [obj[@"time"] floatValue];
        obj[@"beginTime"] = [NSNumber numberWithFloat:this.beginTime + addTime ];
        [this.scaleAry addObject:obj];
    }
    
    float frameNum ;
    
    float btime  = 0;
    float aTime  = 1;
    if (this.scaleAry.count) {
        NSInteger idx=this.scaleAry.count - 1;
        frameNum = ([this.scaleAry[idx][@"beginTime"]floatValue] + [this.scaleAry[idx][@"time"]floatValue] ) / [Scene_data default].frameTime;
        
        aTime = [this.scaleAry[0][@"beginTime"] floatValue];
        this.currentTarget = this.scaleAry[0];
    } else {
        frameNum = 0;
    }
    int flag = 0;
    for (int i = 0; i < frameNum; i++) {
        float ctime  = [Scene_data default].frameTime * i;
        if (ctime >= [this.currentTarget[@"beginTime"]floatValue]  ) {
            this.beginScale = [this.currentTarget[@"value"]floatValue];
            btime = [this.currentTarget[@"beginTime"]floatValue];
            if (flag == this.scaleAry.count - 1) {
                this.currentTarget = this.scaleAry[this.scaleAry.count - 1];
            } else {
                flag++;
                this.currentTarget = this.scaleAry[flag];
            }
            aTime = [this.currentTarget[@"time"]floatValue];
        }
        float cNum = (ctime - btime) / aTime * ([this.currentTarget[@"value"]floatValue] - this.beginScale) + this.beginScale;
        [this.numAry addObject:[NSNumber numberWithFloat:cNum]];
    }
    this.currentTarget = this.scaleAry[0];
    
    
}
@end
