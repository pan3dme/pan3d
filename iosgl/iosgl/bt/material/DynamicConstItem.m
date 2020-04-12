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
    [self.curve getValue:t];
}
/*
 public update(t: number=0): void {
        this.currentValue = this.curve.getValue(t);
        this.target.setDynamic(this);
        //this.target.setDynamicDirect(this.curve.getValue(t),this.targetOffset);
    }
 */

@end
