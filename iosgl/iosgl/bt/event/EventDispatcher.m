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
    NSMutableArray *list = [_eventsMap objectForKey:types];
    if(list==nil){
        list=[[NSMutableArray alloc]init];
        [_eventsMap setValue:list forKey:types];
    }
    EventBindVo* eventBindVo=[[EventBindVo alloc]init:callback b:taget];
    
    for (int i=0; i<list.count; i++) {
        EventBindVo* bin=list[i];
        if(bin.bfun==callback&&bin.thisObject==taget){
            return;
        }
    }
    [list addObject:eventBindVo];
    
 
}
-(void)removeEventListener:(NSString*)types  callback:(EventCallBack)callback taget:(NSObject*)taget;
{
    if(_eventsMap==nil){
        return;
    }
    NSMutableArray *list = [_eventsMap objectForKey:types];
    for (int i=0;list!=nil&& i<list.count; i++) {
        EventBindVo* bin=list[i];
        if(bin.bfun==callback&&bin.thisObject==taget){
            [list removeObjectAtIndex:i];
            return;
        }
    }
}
-(void)dispatchEvent:(BaseEvent*)event;
{
    if(_eventsMap==nil){
        return;
    }
    NSMutableArray *list = [_eventsMap objectForKey:event.type];
    for (int i=0;list!=nil&& i<list.count; i++) {
        EventBindVo* bin=list[i];
        bin.bfun(bin.thisObject,event);
  
 
    }
    
}
  
//public void dispatchEvent(BaseEvent event) {
//     HashMap<String, List<EventBindVo>> eventMap = this._eventsMap;
//     if (eventMap == null) {
//         return  ;
//     }
//     List<EventBindVo> list = eventMap.get(event.type);
//
//     if (list == null || list.size() == 0) {
//         return  ;
//     }
//     event.target = this;
//     for (int i = 0; i < list.size(); i++) {
//         EventBindVo eventBin = list.get(i);
//         eventBin.listener.call(eventBin.thisObject, event);
//     }
//
// }
 
@end
