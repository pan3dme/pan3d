//
//  GameHelper.m
//  Badger_Objective-C
//
//  Created by roctian on 2016/10/28.
//  Copyright © 2016年 roctian. All rights reserved.
//

#import "GameHelper.h"

@implementation GameHelper

+(float)TwoPositionDistance:(SCNVector3)one two:(SCNVector3)two{

    float distance;
    
    float x = one.x - two.x;
    float y = one.y - two.y;
    float z = one.z - two.z;

    distance = sqrtf(x*x+y*y+z*z);
    
    return distance;
}

@end
