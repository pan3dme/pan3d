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

@interface EventDispatcher : NSObject
@property(nonatomic,strong)NSDictionary* eventsMap;


-(void)addEventListener:(NSString*)types  fun:(void (^)(NSObject* any ))fun info:(NSObject*)info;
@end

NS_ASSUME_NONNULL_END
