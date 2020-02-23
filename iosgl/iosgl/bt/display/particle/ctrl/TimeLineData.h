//
//  TimeLineData.h
//  iosgl
//
//  Created by zhao on 23/2/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "ByteArray.h"
#import "KeyFrame.h"

NS_ASSUME_NONNULL_BEGIN
/*
 public dataAry: Array<any> = new Array;
 public maxFrameNum: number;
 public beginTime: number;
 */
@interface TimeLineData : NSObject
@property (nonatomic, strong)  NSMutableArray*  dataAry ;
@property (nonatomic, assign)  float  maxFrameNum;
@property (nonatomic, assign)  float  beginTime;
-(void)setByteData:(ByteArray*)byte;
-(KeyFrame*)addKeyFrame:(float)num;


@end

NS_ASSUME_NONNULL_END
