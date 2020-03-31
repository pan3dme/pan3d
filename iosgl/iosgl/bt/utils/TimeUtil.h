//
//  TimeUtil.h
//  iosgl
//
//  Created by zhao on 6/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN


//NSArray<XBZFaceModel *> *faces

@interface TimeFunTick : NSObject
@end
@interface TimeFunOut : NSObject
@end

@interface TimeUtil : NSObject
+ (instancetype)default;
@property (nonatomic, assign) float    time  ;
 -(int)getTimer;
@end

NS_ASSUME_NONNULL_END
