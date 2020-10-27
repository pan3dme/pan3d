//
//  EventBindVo.m
//  iosgl
//
//  Created by zhao on 27/10/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "EventBindVo.h"

@implementation EventBindVo
- (instancetype)init:(NSObject*)a b:(NSObject*)b
{
    _bfun=a;
    _thisObject=b;
    return self;
}
@end
