//
//  ConstItem.m
//  iosgl
//
//  Created by zhao on 9/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "ConstItem.h"
#import "Vector3D.h"
#import "DynamicBaseConstItem.h"

@implementation ConstItem



-(void)setDynamicOffset:(DynamicBaseConstItem*)dynamic;
{
    ConstItem* this=self;
    if (this.paramName0 == dynamic.paramName) {
            dynamic.targetOffset = this.param0Index + this.offset;
        } else if (this.paramName1 == dynamic.paramName) {
            dynamic.targetOffset = this.param1Index + this.offset;
        } else if (this.paramName2 == dynamic.paramName) {
            dynamic.targetOffset = this.param2Index + this.offset;
        } else if (this.paramName3 == dynamic.paramName) {
            dynamic.targetOffset = this.param3Index + this.offset;
        }
}
-(void)creat:(NSMutableArray<NSNumber*>*)vc;
{
    ConstItem* this=self;
    this.vecNum=vc;
    this.vecNum[0 + this.offset] = [NSNumber numberWithFloat:this.value3d.x];
    this.vecNum[1 + this.offset] =  [NSNumber numberWithFloat:this.value3d.y];
    this.vecNum[2 + this.offset] =  [NSNumber numberWithFloat:this.value3d.z];
    this.vecNum[3 + this.offset] = [NSNumber numberWithFloat:this.value3d.w];
    
}
 
@end
