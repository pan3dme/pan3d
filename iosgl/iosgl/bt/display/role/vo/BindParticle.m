//
//  BindParticle.m
//  iosgl
//
//  Created by zhao on 3/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "BindParticle.h"

@implementation BindParticle

- (instancetype)init:(NSString*)url socketName:(NSString*)socketName;
{
    self = [super init];
    if (self) {
        self.url=url;
        self.socketName=socketName;
    }
    return self;
}
@end
