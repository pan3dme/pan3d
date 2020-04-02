//
//  UIImageViewLock.m
//  动态
//
//  Created by zhao on 1/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Dt_UIImageViewLock.h"
 

@implementation Dt_UIImageViewLock

- (instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
         self.lockimg=[[UIImageView alloc]initWithFrame:CGRectMake(0, 0, 25, 25)];
            self.lockimg.image=[UIImage imageNamed:@"lock_48px"];
            [self addSubview:self.lockimg];
        self.lockimg.hidden=YES;
    }
    return self;
}
-(void)setLock:(BOOL)value;
{
      _lockimg.hidden=!value;
}
-(BOOL)lock;
{
    return !self.lockimg.hidden;
}
 
- (void)layoutSubviews;
{
    self.lockimg.frame=CGRectMake(self.bounds.size.width-35, self.bounds.size.height-35, 25, 25);
 
}
@end
