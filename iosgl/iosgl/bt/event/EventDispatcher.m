//
//  EventDispatcher.m
//  iosgl
//
//  Created by zhao on 23/2/2020.
//  Copyright © 2020 zhao. All rights reserved.
//
#import "GL_Header.h"
#import "EventDispatcher.h"

@implementation EventDispatcher
-(void)addEventListener:(NSString*)types  fun:(SuccessBlock)fun info:(NSObject*)info{
 
    if(_eventsMap==nil){
        _eventsMap=[[NSMutableDictionary alloc]init];
    }
    
}
@end
