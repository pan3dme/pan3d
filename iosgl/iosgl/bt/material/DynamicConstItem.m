//
//  DynamicConstItem.m
//  iosgl
//
//  Created by zhao on 9/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "DynamicConstItem.h"

@implementation DynamicConstItem

- (instancetype)init
{
    self = [super init];
    if (self) {
        
    }
    return self;
}
-(void)update:(float)t;
{
   self. currentValue=   [self.curve getValue:t];
   [self.target setDynamic:self];
}
 

-(void)setType:(int)value;
{
    self._type=value;
    self.curve =[[Curve alloc]init];
    self.curve.type = value;
}
 
@end
