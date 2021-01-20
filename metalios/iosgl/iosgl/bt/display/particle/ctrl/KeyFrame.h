//
//  KeyFrame.h
//  iosgl
//
//  Created by zhao on 23/2/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN
/*
 public frameNum: number;//当前帧数
      public animData: Array<any>;//运动信息数据
      public baseValue: Array<any>;
 */
@interface KeyFrame : NSObject
@property (nonatomic, assign)  float  frameNum;//当前帧数
@property (nonatomic, strong)  NSMutableArray<NSDictionary*>*  animData ;//运动信息数据
@property (nonatomic, strong)  NSMutableArray<NSNumber*>*  baseValue ;
@end

NS_ASSUME_NONNULL_END
