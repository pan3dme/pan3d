//
//  FrameNodeVo.m
//  iosgl
//
//  Created by pan3dme on 2020/11/16.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "FrameNodeVo.h"
#import "FrameLinePointVo.h"

@implementation FrameNodeVo
-(void)writeObject:(NSDictionary*)val ;
{
    FrameNodeVo* this=self;
    this.id = [[val valueForKey:@"id"]intValue]  ;
    this.name = [val valueForKey:@"name"] ;
    this.url = [val valueForKey:@"url"];
    NSArray<NSDictionary*>* itememArr= [val valueForKey:@"pointitem"];
    this.pointitem=[[NSMutableArray alloc] init];
    for (int j = 0; j < itememArr.count; j++) {
        FrameLinePointVo* frameLinePointVo =[[FrameLinePointVo alloc] init];
        [frameLinePointVo writeObject: itememArr[j]];
        this.maxTime=MAX(frameLinePointVo.time,this.maxTime);
        [this.pointitem addObject: frameLinePointVo];
    }
    this.resurl =[val valueForKey:@"resurl"];
    if ([this.url rangeOfString:@".prefab"].location != NSNotFound) {
        this.materialInfoArr = [[NSMutableArray alloc] init];
        NSArray* materialInfoArr=[val valueForKey:@"materialInfoArr"];
        for (int i = 0;  i < materialInfoArr.count; i++) {
            [this.materialInfoArr addObject:materialInfoArr[i]];
        }
        this.noLight = [[val valueForKey:@"noLight"]boolValue];
        this.directLight =[[val valueForKey:@"directLight"]boolValue];;
        this.receiveShadow =[[val valueForKey:@"receiveShadow"]boolValue];;
        if (this.noLight == false) {
            this.lighturl = [val valueForKey:@"lighturl"];
        }
        this.materialurl = [val valueForKey:@"materialurl"];
        this.type = 1;
    }
    if ([this.url rangeOfString:@".lyf"].location != NSNotFound) {
        this.type = 2;
    }
    if ([this.url rangeOfString:@".zzw"].location != NSNotFound) {
        this.type = 3;
    }
}
-(int)indexOf:(NSArray*)arr find:(NSObject*)find
{
    NSInteger idx=[arr indexOfObject:find];
    if(idx>arr.count){
        return -1;
    }else{
        return (int)idx;
    }
}

@end
