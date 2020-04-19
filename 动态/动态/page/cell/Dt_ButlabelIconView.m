//
//  ButlabelIconView.m
//  动态
//
//  Created by zhao on 1/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Dt_ButlabelIconView.h"
#import "Header.h"

@interface Dt_ButlabelIconView ()
@property(nonatomic,strong)UIImageView  * iconimg;
@property(nonatomic,strong)UILabel  * labtxt;
@end

@implementation Dt_ButlabelIconView


- (instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        self.iconimg=[[UIImageView alloc]initWithFrame:CGRectMake(0, 0, 20, 20)];
        self.iconimg.contentMode = UIViewContentModeScaleAspectFit;
        [self addSubview:self.iconimg];
        self.labtxt=[[UILabel alloc]initWithFrame:CGRectMake(30, 0, frame.size.width-30, frame.size.height)];
        [self addSubview:self.labtxt];
        self.labtxt.text=@"";
        self.labtxt.font =[UIFont systemFontOfSize:14];
        self.labtxt.textColor=RGBOF(0x999999);
        
    }
    return self;
}
-(void)setImageName:(NSString*)value;
{
    self.iconimg.image=[UIImage imageNamed:value];
}
-(void)setNumValue:(int)value;
{
    
    self.labtxt.text= [NSString stringWithFormat:@"%d",value ];
}
- (void)layoutSubviews;
{
    self.labtxt.frame=CGRectMake(25, 0, self.bounds.size.width-20, self.bounds.size.height);
    
}

@end
