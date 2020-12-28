//
//  ScaleChange.m
//  iosgl
//
//  Created by zhao on 31/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "ScaleChange.h"
#import "Scene_data.h"

@implementation ScaleChange
-(void)dataByte:(NSArray<NSNumber*>*)va arr:(NSArray<NSNumber*>*)arr;
{
    ScaleChange* this=self;
    this.beginTime = [arr[0]floatValue];
           if ([arr[1]floatValue] == -1) {
               this.lastTime = [Scene_data default] .MAX_NUMBER;
           } else {
               this.lastTime = [arr[1]floatValue];
           }
           this.speed = [arr[2]floatValue] * 0.001;
           this.minNum = [arr[3]floatValue] * 0.01;
           this.maxNum = [arr[4]floatValue] * 0.01;
}
@end
