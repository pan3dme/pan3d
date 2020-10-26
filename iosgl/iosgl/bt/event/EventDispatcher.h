//
//  EventDispatcher.h
//  iosgl
//
//  Created by zhao on 23/2/2020.
//  Copyright © 2020 zhao. All rights reserved.
//
 
#import "GL_Header.h"
#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface EventDispatcher : NSObject
@property(nonatomic,strong)NSMutableDictionary* eventsMap;

 

-(void)addEventListener:(NSString*)types  fun:(SuccessBlock)fun info:(NSObject*)info;
@end

NS_ASSUME_NONNULL_END
