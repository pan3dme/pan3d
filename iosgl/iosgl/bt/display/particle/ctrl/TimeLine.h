//
//  TimeLine.h
//  iosgl
//
//  Created by zhao on 25/2/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "EventDispatcher.h"
#import "KeyFrame.h"
#import "TimeLineData.h"
#import "SelfRotation.h"
#import "AxisRotaion.h"
#import "AxisMove.h"
#import "ScaleChange.h"
#import "ScaleAnim.h"
#import "ScaleNoise.h"

NS_ASSUME_NONNULL_BEGIN

@interface TimeLine : EventDispatcher
@property (nonatomic, strong)  NSMutableArray<KeyFrame*>*  keyFrameAry;
@property (nonatomic, assign)  float  maxFrameNum;
@property (nonatomic, assign)  KeyFrame*  currentKeyFrame;//当前操作的关键帧
@property (nonatomic, assign)  float  _currentFrameNum;//当前帧数
@property (nonatomic, assign)  float  time;//播放时间
@property (nonatomic, assign)  int  targetFlag;
@property (nonatomic, assign)  BOOL  visible;
@property (nonatomic, assign)  float  beginTime;
 
/*
 private _selfRotaion:SelfRotation;
   private _axisRotaion:AxisRotaion;
   private _axisMove: AxisMove;
   private _scaleChange: ScaleChange;
   private _scaleAnim: ScaleAnim;
   private _scaleNosie: ScaleNoise;
 */
@property (nonatomic, strong)  SelfRotation*  selfRotaion;
@property (nonatomic, strong)  AxisRotaion*  axisRotaion;
@property (nonatomic, strong)  AxisMove*  axisMove;
@property (nonatomic, strong)  ScaleChange*  scaleChange;
@property (nonatomic, strong)  ScaleAnim*  scaleAnim;
@property (nonatomic, strong)  ScaleNoise*  scaleNosie;

-(void)setAllDataInfo:(TimeLineData*)data;
-(void)updateTime:(float)t;
@end

NS_ASSUME_NONNULL_END
