//
//  TimeUtil.m
//  iosgl
//
//  Created by zhao on 6/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "TimeUtil.h"
@interface TimeUtil ()
@property (nonatomic, strong) NSMutableArray<TimeFunTick *>*  timefunAry ;
@property (nonatomic, strong) NSMutableArray<TimeFunOut *>*  outTimeFunAry  ;
@end
static TimeUtil *instance = nil;
@implementation TimeUtil
+ (instancetype)default;
{
    if (instance == nil) {
        instance = [[TimeUtil alloc] init];
    }
    return instance;
}
- (instancetype)init
{
    self = [super init];
    if (self) {
        self.time=0;
    }
    return self;
}
-(int)getTimer;
{
    NSInteger ddd=[[NSDate date]timeIntervalSince1970]*1000.0;
   return (int)ddd;
    
}
@end
