//
//  BaseEvent.m
//  iosgl
//
//  Created by zhao on 26/10/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "BaseEvent.h"
 
@implementation BaseEvent
- (instancetype)init:(NSString*)val
{
    _type=val;
    return self;
}
@end
