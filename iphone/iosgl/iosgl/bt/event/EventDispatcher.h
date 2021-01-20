//
//  EventDispatcher.h
//  iosgl
//
//  Created by zhao on 23/2/2020.
//  Copyright © 2020 zhao. All rights reserved.
//
 
#import <Foundation/Foundation.h>
#import "EventCallBack.h"
#import "BaseEvent.h"


 
@class  BaseEvent;
NS_ASSUME_NONNULL_BEGIN

@interface EventDispatcher : NSObject
@property(nonatomic,strong)NSMutableDictionary* eventsMap;

 
-(void)addEventListener:(NSString*)types  callback:(EventCallBack)callback taget:(NSObject*)taget;
-(void)removeEventListener:(NSString*)types  callback:(EventCallBack)callback taget:(NSObject*)taget;
-(void)dispatchEvent:(BaseEvent*)event;
@end

NS_ASSUME_NONNULL_END
 
