//
//  MathClass.m
//  动态
//
//  Created by zhao on 16/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "MathClass.h"
#import <AFNetworking.h>
#import "Header.h"
 
static MathClass *mathClass = nil;
@implementation MathClass

+ (instancetype)default{
    if (mathClass == nil) {
        mathClass = [[MathClass alloc] init];
    }
    return mathClass;
}
 
@end
