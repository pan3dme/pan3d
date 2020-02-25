//
//  TimeLine.m
//  iosgl
//
//  Created by zhao on 25/2/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "TimeLine.h"
#import "TimeLineData.h"

@interface TimeLine ()
@property (nonatomic, assign)  BOOL  isByteData;
@end

@implementation TimeLine

- (instancetype)init
{
    self = [super init];
    if (self) {
        self._keyFrameAry=[[NSMutableArray alloc]init];
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
    self._currentKeyFrame = self._keyFrameAry[0];
    
}

/*
 public setAllDataInfo($data: TimeLineData): void {
             this.isByteData = true;
             var len: number = $data.dataAry.length;
             for (var i: number = 0; i < len; i++) {
                 var key: KeyFrame = this.addKeyFrame($data.dataAry[i].frameNum);
                 key.baseValue = $data.dataAry[i].baseValue;
                 key.animData = $data.dataAry[i].animData;
             }
 
             this.maxFrameNum = $data.maxFrameNum;
             this.beginTime = $data.beginTime;
             this._currentKeyFrame = this._keyFrameAry[0];
 
         }
 */

-(KeyFrame*)addKeyFrame:(int)num
{
    KeyFrame *keyframe=[[KeyFrame alloc]init];
    keyframe.frameNum=num;
    [self._keyFrameAry addObject:keyframe];
    return keyframe;
}
 
@end
