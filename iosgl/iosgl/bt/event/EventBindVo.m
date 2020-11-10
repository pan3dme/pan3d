//
//  EventBindVo.m
//  iosgl
//
//  Created by zhao on 27/10/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "EventBindVo.h"

@implementation EventBindVo
- (instancetype)init:(EventCallBack)a b:(NSObject*)b
{
    
    self.bfun=a;
    _thisObject=b;
    return self;
}
@end
