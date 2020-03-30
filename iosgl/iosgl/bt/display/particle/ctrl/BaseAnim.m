//
//  BaseAnim.m
//  iosgl
//
//  Created by zhao on 31/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "BaseAnim.h"

@implementation BaseAnim
- (instancetype)init
{
    self = [super init];
    if (self) {
        
    }
    return self;
}
-(void)reset;
{
    self.isActiva = NO;
         self.isDeath = NO;
 
         self.time = 0;
         self.num = 0;
}
-(void)update:(float)t;
{
 
}
 -(void)dataByte:(NSArray<NSNumber*>*)va arr:(NSArray<NSNumber*>*)arr;
{
    
}
@end
