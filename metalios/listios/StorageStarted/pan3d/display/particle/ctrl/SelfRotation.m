//
//  SelfRotation.m
//  iosgl
//
//  Created by zhao on 31/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "SelfRotation.h"
#import "Scene_data.h"

@implementation SelfRotation


-(void)dataByte:(NSArray<NSNumber*>*)va arr:(NSArray<NSNumber*>*)arr;
{
    self.beginTime = [arr[0] floatValue];
    if ([arr[1]floatValue] == -1) {
        self.lastTime = [Scene_data default] .MAX_NUMBER;
    } else {
        self.lastTime = [arr[1]floatValue];
    }
    self.speed = [arr[2]floatValue] * 0.1;
    self.aSpeed = [arr[3]floatValue] * 0.1;
}
/*
public dataByte(va: Array<any>, arr: Array<any>): void {
    this.beginTime = arr[0]
    if (arr[1] == -1) {
        this.lastTime = Scene_data.MAX_NUMBER;
    } else {
        this.lastTime = arr[1];
    }
    this.speed = arr[2] * 0.1;
    this.aSpeed = arr[3] * 0.1;

}
*/
@end
