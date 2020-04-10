//
//  DynamicBaseConstItem.m
//  iosgl
//
//  Created by zhao on 9/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "DynamicBaseConstItem.h"
#import "ConstItem.h"

@implementation DynamicBaseConstItem


-(void)setTargetInfo:(ConstItem*)target paramName:(NSString*)paramName type:(int)type;
{
    self.target = target;
    self.paramName = paramName;
    self.type = type;
    [self.target setDynamicOffset: self];
    self.currentValue=[[NSMutableArray alloc]init];
    for(int i=0;i<type;i++){
        [self.currentValue addObject:@0];
    }
    
}
-(void)setCurrentVal:(NSNumber*)x;
{
}
-(void)setCurrentVal:(NSNumber*)x y:(NSNumber*)y;
 {
 }
-(void)setCurrentVal:(NSNumber*)x y:(NSNumber*)y z:(NSNumber*)z;
{
}
@end
