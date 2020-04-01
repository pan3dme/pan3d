//
//  ButlabelIconView.m
//  动态
//
//  Created by zhao on 1/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "ButlabelIconView.h"

@interface ButlabelIconView ()
@property(nonatomic,strong)UIImageView  * iconimg;
@property(nonatomic,strong)UILabel  * labtxt;
@end

@implementation ButlabelIconView


- (instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        self.iconimg=[[UIImageView alloc]initWithFrame:CGRectMake(0, 0, 30, 30)];
        [self addSubview:self.iconimg];
        self.labtxt=[[UILabel alloc]initWithFrame:CGRectMake(30, 0, frame.size.width-30, frame.size.height)];
        [self addSubview:self.labtxt];
        
        
        self.iconimg.image=[UIImage imageNamed:@"diamond_img_diamond"];
    }
    return self;
}

- (void)layoutSubviews;
{
    self.labtxt.frame=CGRectMake(30, 0, self.bounds.size.width-30, self.bounds.size.height);
    
}

@end
