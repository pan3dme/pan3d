//
//  BaseEvent.h
//  iosgl
//
//  Created by zhao on 26/10/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "EventDispatcher.h"
 
NS_ASSUME_NONNULL_BEGIN

@interface BaseEvent : NSObject
@property(nonatomic,strong)NSString* type;
@property(nonatomic,strong)NSObject* target;
- (instancetype)init:(NSString*)val  ;
+ (NSString *)COMPLETE;
@end

NS_ASSUME_NONNULL_END
