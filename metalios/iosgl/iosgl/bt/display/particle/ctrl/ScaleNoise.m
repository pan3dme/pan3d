//
//  ScaleNoise.m
//  iosgl
//
//  Created by zhao on 31/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "ScaleNoise.h"
#import "Scene_data.h"
 

@interface ScaleNoise ()
@property(nonatomic,assign)float amplitude;
 
@end
@implementation ScaleNoise


-(void)  coreCalculate {
    ScaleNoise* this =self;
    this.num = this.amplitude + this.amplitude *  sin(this.speed * this.time);
}
-(void)dataByte:(NSArray<NSNumber*>*)va arr:(NSArray<NSNumber*>*)arr;
{
    ScaleNoise* this =self;
    this.beginTime = [[arr objectAtIndex:0] floatValue];
    if ( [[arr objectAtIndex:1] intValue] == -1) {
        this.lastTime = [Scene_data default] .MAX_NUMBER;;
    } else {
        this.lastTime = [[arr objectAtIndex:1] floatValue];
    }
    this.amplitude =  [[arr objectAtIndex:2] floatValue];
    this.speed =  [[arr objectAtIndex:3] floatValue] * 0.01;
    
}
@end
