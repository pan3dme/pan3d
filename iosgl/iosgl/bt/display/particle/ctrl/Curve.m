//
//  Curve.m
//  iosgl
//
//  Created by zhao on 14/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Curve.h"
#import "CurveVo.h"

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
/*
public setData(obj: any): void {
       this.type = obj.type;
       this.maxFrame = obj.maxFrame;
       if (obj.items.length) {
           this.begintFrame = obj.items[0].frame;
       } else {
           this.begintFrame = -1;
       }

       var len: number = obj.values[0].length;
       var ary: Array<Array<number>> = new Array;
       for (var i: number = 0; i < len; i++) {
           var itemAry: Array<number> = new Array;
           if (this.type == 1) {
               itemAry.push(obj.values[0][i]);
           } else if (this.type == 2) {
               itemAry.push(obj.values[0][i], obj.values[1][i]);
           } else if (this.type == 3) {
               itemAry.push(obj.values[0][i], obj.values[1][i], obj.values[2][i]);
           } else if (this.type == 4) {
               var w: number = obj.values[3][i];
               itemAry.push(obj.values[0][i] * w, obj.values[1][i] * w, obj.values[2][i] * w, w);
           }
           ary.push(itemAry);
       }

       this.valueVec = ary;
   }
*/
@end
