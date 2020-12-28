//
//  MathCore.m
//  iosgl
//
//  Created by zhao on 2/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "MathCore.h"

@implementation MathCore

+(void)traceTmNow;
{
    NSTimeInterval tm=[ [NSDate dateWithTimeIntervalSinceNow:0] timeIntervalSince1970];
    NSLog(@"tm----%f",tm);
}
@end
