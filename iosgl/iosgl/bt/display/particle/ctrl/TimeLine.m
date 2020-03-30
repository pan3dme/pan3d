//
//  TimeLine.m
//  iosgl
//
//  Created by zhao on 25/2/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "TimeLine.h"
#import "Scene_data.h"
#import "TimeLineData.h"
#import "SelfRotation.h"
#import "AxisRotaion.h"
#import "AxisMove.h"
#import "ScaleChange.h"
#import "ScaleAnim.h"
#import "ScaleNoise.h"
#import "BaseAnim.h"

@interface TimeLine ()
@property (nonatomic, assign)  BOOL  isByteData;
@end

@implementation TimeLine

- (instancetype)init
{
    self = [super init];
    if (self) {
        self.keyFrameAry=[[NSMutableArray alloc]init];
        self.targetFlag = -1;
        self.visible = false;
        self.maxFrameNum = 0;
        self.time = 0;
    }
    return self;
}

-(void)setAllDataInfo:(TimeLineData*)data;
{
    self.isByteData = true;
    NSUInteger len = data.dataAry.count ;
    for (int i = 0; i < len; i++) {
        KeyFrame*temp=((KeyFrame*)data.dataAry[i]);
        KeyFrame* key =  [self addKeyFrame:temp.frameNum];
        key.baseValue =temp.baseValue;
        key.animData = temp.animData;
    }
    self.maxFrameNum = data.maxFrameNum;
    self.beginTime = data.beginTime;
    self.currentKeyFrame = self.keyFrameAry[0];
    
}
-(void)updateTime:(float)t;
{
    TimeLine* this=self;
    if (!this.currentKeyFrame) {
        return;
    }
    this.time = t;
    [this getTarget];
    /*
     if (!this._currentKeyFrame) {
     return;
     }
     this._time = t;
     this.getTarget();
     
     
     if (this._axisRotaion) {
     this._axisRotaion.update(this._time);
     }
     
     if (this._selfRotaion) {
     this._selfRotaion.update(this._time);
     }
     
     if (this._axisMove) {
     this._axisMove.update(this._time);
     }
     
     if (this._scaleChange) {
     this._scaleChange.update(this._time);
     } else if (this._scaleNosie) {
     this._scaleNosie.update(this._time);
     } else if (this._scaleAnim) {
     this._scaleAnim.update(this._time);
     }
     */
}
-(void)getTarget;
{
    TimeLine* this=self;
    int flag=-1;
    for (int i = 0; i < this.keyFrameAry.count; i++) {
        if (this.keyFrameAry[i].frameNum * [Scene_data default].frameTime < this.time) {
            flag = i;
        } else {
            break;
        }
    }
 
    if (flag != this.targetFlag) {
        this.currentKeyFrame = this.keyFrameAry[flag];
        this.targetFlag = flag;
        
        if (flag == (this.keyFrameAry.count - 1)) {
            this.visible = false;
            this.currentKeyFrame = nil;
        } else {
            this.visible = true;
     
            
            [this enterKeyFrame:this.currentKeyFrame.animData baseTime:this.currentKeyFrame.frameNum *[Scene_data default].frameTime baseValueAry:this.currentKeyFrame.baseValue];
        }
        
    }
    
}
-(void)enterKeyFrame:(NSArray*)ary baseTime:(float)baseTime baseValueAry:(NSArray<NSNumber*>*)baseValueAry;
{
    TimeLine* this=self;
    if (!baseValueAry) {
        return;
    }
    for (int i= 0;i < 10; i++){
        if (!baseValueAry[i]) {
            continue;
        }
        switch (i) {
            case 1:
                if (!this.selfRotaion)
                {
                    this.selfRotaion = [[SelfRotation alloc]init] ;
                }
                this.selfRotaion.baseNum =[baseValueAry[i]floatValue];
                this.selfRotaion.num = [baseValueAry[i]floatValue];
                
                break;
            case 2:
                if (!this.axisRotaion)
                {
                    this.axisRotaion = [[AxisRotaion alloc]init];
                }
                this.axisRotaion.num =this.axisRotaion.baseNum = [baseValueAry[i]floatValue];
                break;
            case 6:
                if (!this.scaleChange)
                {
                    this.scaleChange = [[ScaleChange alloc]init];
                }
                this.scaleChange.num = this.scaleChange.baseNum = [baseValueAry[i]floatValue];
                break;
            case 7:
                if (!this.scaleAnim)            {
                    this.scaleAnim = [[ScaleAnim alloc]init];
                }
                this.scaleAnim.num = this.scaleAnim.baseNum = [baseValueAry[i]floatValue];
                break;
            case 8:
                if (!this.scaleNosie)
                {
                    this.scaleNosie =[[ScaleNoise alloc]init];
                }
                this.scaleNosie.num = this.scaleNosie.baseNum = [baseValueAry[i]floatValue];
                break;
            case 9:
                if (!this.axisMove)
                {
                    this.axisMove =[[ AxisMove alloc]init];
                }
                this.axisMove.num = this.axisMove.baseNum = [baseValueAry[i]floatValue];
                break;
        }
        
    }
    
    if (this.selfRotaion)
    {
        this.selfRotaion.isDeath = true;
        
    }
    if (this.axisRotaion)
    {
        this.axisRotaion.isDeath = true;
        
    }
    if (this.scaleChange)
    {
        this.scaleChange.isDeath = true;
    }
    if (this.scaleAnim)
    {
        this.scaleAnim.isDeath = true;
        
    }
    if (this.scaleNosie)
    {
        this.scaleNosie.isDeath = true;
        
    }
    if (this.axisMove)
    {
        this.axisMove.isDeath = true;
    }
    
    if (!ary) {
        return;
    }
    
    [self setBaseTimeByte:ary baseTime:baseTime baseValueAry:baseValueAry];
    
}
-(void)setBaseTimeByte:(NSArray<NSDictionary*>*)ary baseTime:(float)baseTime baseValueAry:(NSArray*)baseValueAry;
{
    TimeLine* this=self;
    for (int i = 0; i < ary.count; i++) {
        int type=[ary[i][@"type"]intValue];
        BaseAnim* baseAnim;
        if (type== 1) {
            if (!this.selfRotaion) {
                this.selfRotaion = [[SelfRotation alloc]init] ;
            }
            baseAnim=this.selfRotaion;
        } else if (type == 2) {
            if (!this.axisRotaion) {
                this.axisRotaion = [[AxisRotaion alloc]init];
            }
            baseAnim=this.axisRotaion;
        } else if (type == 6) {
            if (!this.scaleChange) {
                this.scaleChange = [[ScaleChange alloc]init];
            }
            baseAnim=this.scaleChange;
        } else if (type == 7) {
            if (!this.scaleAnim) {
                this.scaleAnim = [[ScaleAnim alloc]init];
            }
            baseAnim=this.scaleAnim;
        } else if (type == 8) {
            if (!this.scaleNosie) {
                this.scaleNosie = [[ScaleNoise alloc]init];
            }
            baseAnim=this.scaleNosie;
        } else if (type == 9) {
            if (!this.axisMove) {
                this.axisMove =[[AxisMove alloc]init];
            }
            baseAnim=this.axisMove;
        }
        [baseAnim dataByte:ary[i][@"data"] arr:ary[i][@"dataByte"]];
        baseAnim.baseTime = baseTime;
  
    }
    /*
     for (int i = 0; i < ary.count; i++) {
           int type=[ary[i][@"type"]intValue];
           BaseAnim* baseAnim;
           if (type== 1) {
               if (!this.selfRotaion) {
                   this.selfRotaion = [[SelfRotation alloc]init] ;
               } else {
                   [this.selfRotaion reset];
               }
       
               [this.selfRotaion dataByte:ary[i][@"data"] arr:ary[i][@"dataByte"]];
               this.selfRotaion.baseTime = baseTime;
           } else if (type == 2) {
               if (!this.axisRotaion) {
                   this.axisRotaion = [[AxisRotaion alloc]init];
               } else {
                   [this.axisRotaion reset];
               }
               [this.axisRotaion dataByte: ary[i][@"data"] arr:ary[i][@"dataByte"]];
               this.axisRotaion.baseTime = baseTime;
           } else if (type == 6) {
               if (!this.scaleChange) {
                   this.scaleChange = [[ScaleChange alloc]init];
               } else {
                   [this.scaleChange reset];
               }
               [this.scaleChange dataByte: ary[i][@"data"] arr:ary[i][@"dataByte"]];
               this.scaleChange.baseTime = baseTime;
           } else if (type == 7) {
               if (!this.scaleAnim) {
                   this.scaleAnim = [[ScaleAnim alloc]init];
               } else {
                   [this.scaleAnim reset];
               }
               [this.scaleAnim dataByte: ary[i][@"data"] arr:ary[i][@"dataByte"]];
               this.scaleAnim.baseTime = baseTime;
           } else if (type == 8) {
               if (!this.scaleNosie) {
                   this.scaleNosie = [[ScaleNoise alloc]init];
               } else {
                   [this.scaleNosie reset];
               }
               [this.scaleNosie dataByte: ary[i][@"data"] arr:ary[i][@"dataByte"]];
               this.scaleNosie.baseTime = baseTime;
           } else if (type == 9) {
               if (!this.axisMove) {
                   this.axisMove =[[AxisMove alloc]init];
               } else {
                   [this.axisMove reset];
               }
               [this.axisMove dataByte: ary[i][@"data"] arr:ary[i][@"dataByte"]];
               this.axisMove.baseTime = baseTime;
           }
     
       }
     */
    
}
//  private setBaseTimeByte(ary: Array<any>, baseTime: number = 0, baseValueAry: Array<number> = null): void
//public enterKeyFrame(ary: Array<any>, baseTime: number = 0, baseValueAry: Array<number> = null): void {
-(KeyFrame*)addKeyFrame:(int)num
{
    KeyFrame *keyframe=[[KeyFrame alloc]init];
    keyframe.frameNum=num;
    [self.keyFrameAry addObject:keyframe];
    return keyframe;
}

@end

