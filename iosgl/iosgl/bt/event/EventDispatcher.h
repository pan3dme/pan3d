//
//  EventDispatcher.h
//  iosgl
//
//  Created by zhao on 23/2/2020.
//  Copyright © 2020 zhao. All rights reserved.
//
 
 
#import "BaseEvent.h"
#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN
typedef void (^EventCallBack)(NSObject *val,NSObject* event);
@interface EventDispatcher : NSObject
@property(nonatomic,strong)NSMutableDictionary* eventsMap;

 
-(void)addEventListener:(NSString*)types  callback:(EventCallBack)callback taget:(NSObject*)taget;
@end

NS_ASSUME_NONNULL_END
 
