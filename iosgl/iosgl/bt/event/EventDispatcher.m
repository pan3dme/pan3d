//
//  EventDispatcher.m
//  iosgl
//
//  Created by zhao on 23/2/2020.
//  Copyright © 2020 zhao. All rights reserved.
//
#import "GL_Header.h"
#import "EventDispatcher.h"
#import "EventBindVo.h"
 //Object val, BaseEvent event
@implementation EventDispatcher
-(void)addEventListener:(NSString*)types  callback:(EventCallBack)callback taget:(NSObject*)taget;
{
 
    if(_eventsMap==nil){
        _eventsMap=[[NSMutableDictionary alloc]init];
    }
    NSArray *list = [_eventsMap objectForKey:types];
    if(list==nil){
        list=[[NSArray alloc]init];
        [_eventsMap setValue:types forKey:list];
    }
    EventBindVo* eventBindVo=[[EventBindVo alloc]init:callback b:taget];
    
    
    
    
    /*
    EventBindVo eventBin=new EventBindVo(listener,thisObject);
           for (int i= 0; i < list.size(); i++) {
               EventBindVo bin = list.get(i);
               if (bin.listener == listener && bin.thisObject == thisObject) {
                   return;
               }
           }
           list.add(eventBin);
    */
}
 
@end
