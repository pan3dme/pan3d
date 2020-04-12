//
//  Curve.m
//  iosgl
//
//  Created by zhao on 14/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Curve.h"
#import "CurveVo.h"
#import "Scene_data.h"

@implementation Curve



-(void)setData:(CurveVo*)obj;
{
    Curve* this=self;
    
    this.type=obj.type;
    this.maxFrame = obj.maxFrame;
    if (obj.items.count) {
        this.begintFrame = [[obj.items[0] objectForKey:@"frame"]intValue] ;
    } else {
        this.begintFrame = -1;
    }
    NSArray* values0  = obj.values[0];
    NSUInteger len = values0.count;
    NSMutableArray<NSMutableArray*>* ary=[[NSMutableArray alloc]init];
    for (int i=0; i < len; i++) {
        NSArray* values0  = obj.values[0];
        NSArray* values1  = obj.values[1];
        NSArray* values2  = obj.values[2];
        NSArray* values3  = obj.values[3];
        NSMutableArray* itemAry  = [[NSMutableArray alloc]init];
        switch (this.type) {
            case 1:
                [itemAry addObject:values0[i]];
                break;
            case 2:
                [itemAry addObject:values0[i]];
                [itemAry addObject:values1[i]];
                break;
            case 3:
                [itemAry addObject:values0[i]];
                [itemAry addObject:values1[i]];
                [itemAry addObject:values2[i]];
                break;
            case 4:
                [itemAry addObject:values0[i]];
                [itemAry addObject:values1[i]];
                [itemAry addObject:values2[i]];
                [itemAry addObject:values3[i]];
                break;
            default:
                break;
        }
        [ary addObject:itemAry];
    }
    this.valueVec = ary;
}
-(NSMutableArray<NSNumber*>*)getValue:(float)t;
{
    Curve* this=self;
    if (!this.valueVec || this.begintFrame == -1) {
        return this.valueV3d;
    }
    int flag = floor(t / [Scene_data default].frameTime- this.begintFrame);
    if (flag < 0) {
        flag = 0;
    } else if (flag > this.maxFrame - this.begintFrame) {
        flag = this.maxFrame - this.begintFrame;
    }
    return this.valueVec[flag];;
}
/*
public getValue($t: number): Array<number> {
       if (!this.valueVec || this.begintFrame == -1) {
           return this.valueV3d;
       }
       var flag: number = float2int($t / Scene_data.frameTime - this.begintFrame);

       if (flag < 0) {
           flag = 0;
       } else if (flag > this.maxFrame - this.begintFrame) {
           flag = this.maxFrame - this.begintFrame;
       }

       return this.valueVec[flag];
*/
@end
