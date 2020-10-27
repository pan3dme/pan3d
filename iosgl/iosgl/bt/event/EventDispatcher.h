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
typedef void (^OnFoolCallback)(NSString *name,NSString *ken);
typedef void (^EventCallBack)(NSObject *val,NSObject* event);
@interface EventDispatcher : NSObject
@property(nonatomic,strong)NSDictionary* eventsMap;

- (void)productFool:(OnFoolCallback)callback;
-(void)addEventListener:(NSString*)types  callback:(EventCallBack)callback taget:(NSObject*)taget;
@end

NS_ASSUME_NONNULL_END
 
