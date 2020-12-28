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
 
-(void)update:(float)t;
{
    if(self.target){
        [self.target setDynamic:self];
    }
    
}

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
-(void)setType:(int)value;
{
  self._type=value;
}
-(int)type;
{
    return self._type;
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
