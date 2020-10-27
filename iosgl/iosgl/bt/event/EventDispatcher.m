//
//  EventDispatcher.m
//  iosgl
//
//  Created by zhao on 23/2/2020.
//  Copyright © 2020 zhao. All rights reserved.
//
#import "GL_Header.h"
#import "EventDispatcher.h"
 //Object val, BaseEvent event
@implementation EventDispatcher
-(void)addEventListener:(NSString*)types  callback:(EventCallBack)callback taget:(NSObject*)taget;
{
 
    if(_eventsMap==nil){
        _eventsMap=[[NSDictionary alloc]init];
    }
    
}
 
@end
