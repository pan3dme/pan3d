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
    BaseAnim* this=self;
 if (this.isDeath) {
     return;
 }
 this.time = t - this.baseTime;
 if (this.isActiva) {
     this.time = this.time - this.beginTime;
     if (this.time > this.lastTime) {
         this.time = this.lastTime - this.beginTime;
         this.isDeath = YES;
     }
     [this coreCalculate];
 } else {
     if (this.time >= this.beginTime) {
         if (this.time >= this.lastTime) {
             this.time = this.lastTime - this.beginTime;
               [this coreCalculate];
             this.isDeath = YES;
         } else {
             this.time = this.time - this.beginTime;
              [this coreCalculate];
         }
         this.isActiva = YES;
     }
 }
}
-(void)coreCalculate;
{
     BaseAnim* this=self;
      this.num = this.speed * this.time + this.aSpeed * this.time * this.time + this.baseNum;
}
 -(void)dataByte:(NSArray<NSNumber*>*)va arr:(NSArray<NSNumber*>*)arr;
{
    
}
@end
