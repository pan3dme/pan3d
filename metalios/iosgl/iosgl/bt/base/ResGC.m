//
//  ResGC.m
//  iosgl
//
//  Created by zhao on 7/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "ResGC.h"

@implementation ResGC
 
- (instancetype)init:(Scene3D *)value
{
    
    self = [super init:value];
    if (self) {
           self.dic=[[NSMutableDictionary alloc]init];
    }
    return self;
}
@end
