//
//  AxisRotaion.m
//  iosgl
//
//  Created by zhao on 31/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "AxisRotaion.h"
#import "Scene_data.h"

@implementation AxisRotaion
-(void)dataByte:(NSArray<NSNumber*>*)va arr:(NSArray<NSNumber*>*)arr;
{
    AxisRotaion* this=self;
    this.beginTime = [arr[0]floatValue];
          if ([arr[1]intValue] == -1) {
              this.lastTime =  [Scene_data default] .MAX_NUMBER;
          } else {
              this.lastTime = [arr[1] floatValue];
          }
    this.axis = arr[2];
    this.axisPos = arr[3];
          this.speed = [arr[4]floatValue] * 0.1;
          this.aSpeed = [arr[5]floatValue] * 0.1;
}
@end
