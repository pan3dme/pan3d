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
NS_ASSUME_NONNULL_BEGIN

@interface TimeLine : EventDispatcher
@property (nonatomic, strong)  NSMutableArray*  _keyFrameAry;
@property (nonatomic, assign)  float  maxFrameNum;
@property (nonatomic, assign)  KeyFrame*  _currentKeyFrame;//当前操作的关键帧
@property (nonatomic, assign)  float  _currentFrameNum;//当前帧数
@property (nonatomic, assign)  float  time;//播放时间
@property (nonatomic, assign)  float  targetFlag;
@property (nonatomic, assign)  BOOL  visible;
@property (nonatomic, assign)  float  beginTime;

//       @property (nonatomic, assign)  float  _selfRotaion: SelfRotation;
//       @property (nonatomic, assign)  float  _axisRotaion: AxisRotaion;
//       @property (nonatomic, assign)  float  _axisMove: AxisMove;
//       @property (nonatomic, assign)  float  _scaleChange: ScaleChange;
//       @property (nonatomic, assign)  float  _scaleAnim: ScaleAnim;
//       @property (nonatomic, assign)  float  _scaleNosie: ScaleNoise;

-(void)setAllDataInfo:(TimeLineData*)data;
@end

NS_ASSUME_NONNULL_END
