//
//  AddImgVideoCell.m
//  动态
//
//  Created by zhao on 19/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Header.h"
#import "UIImageView+WebCache.h"
#import "AddImgVideoCell.h"



@interface AddImgVideoCell ()
@property (nonatomic,strong)UIImageView* picImage;
@property (nonatomic,strong)UIImageView* camIcamBut;
@property (nonatomic,strong)NSString* soureUrl;
@end
@implementation AddImgVideoCell

- (instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        self.backgroundColor=[UIColor yellowColor];
        
        [self initBaseUi];
    }
    return self;
}
-(void)setImageUrl:(NSString*)url;
{
    self.soureUrl=url;
    [self.picImage sd_setImageWithURL:[NSURL URLWithString:self.soureUrl] ];
    
    if(self.soureUrl.length){
        self.camIcamBut.hidden=YES;
    }else{
        self.camIcamBut.hidden=NO;
    }
}
-(void)initBaseUi;
{
    self.picImage=[[UIImageView alloc]initWithFrame:self.bounds];
    self.picImage.autoresizingMask = UIViewAutoresizingFlexibleHeight | UIViewAutoresizingFlexibleWidth;
    [self addSubview:self.picImage];
    
    
    self.camIcamBut=[[UIImageView alloc]initWithFrame:CGRectMake(50, 50, 40, 40)];
    self.camIcamBut.autoresizingMask = UIViewAutoresizingFlexibleHeight | UIViewAutoresizingFlexibleWidth;
    [self addSubview:self.camIcamBut];
    self.camIcamBut.image=[UIImage imageNamed:@"camicon"];
 
}

@end
