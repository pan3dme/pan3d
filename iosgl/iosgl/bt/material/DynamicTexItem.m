//
//  DynamicTexItem.m
//  iosgl
//
//  Created by zhao on 9/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "DynamicTexItem.h"
#import "Curve.h"

@implementation DynamicTexItem

/*
 public initCurve($type: number): void {
        this.curve = new Curve
        this.curve.type = $type;
    }
 */

-(void)initCurve:(int)type;
{
    self.curve=[[Curve alloc]init];
    self.curve.type=type;
    
}
@end
