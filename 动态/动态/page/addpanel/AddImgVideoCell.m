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
@property (nonatomic,strong)UIButton* closeXbut;
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
-(void)initBaseUi;
{
    self.picImage=[[UIImageView alloc]initWithFrame:self.bounds];
    self.picImage.autoresizingMask = UIViewAutoresizingFlexibleHeight | UIViewAutoresizingFlexibleWidth;
    [self addSubview:self.picImage];
    
    
    self.camIcamBut=[[UIImageView alloc]initWithFrame:CGRectMake(50, 50, 40, 40)];
    self.camIcamBut.autoresizingMask = UIViewAutoresizingFlexibleHeight | UIViewAutoresizingFlexibleWidth;
    [self addSubview:self.camIcamBut];
    self.camIcamBut.image=[UIImage imageNamed:@"camicon"];
    
    
    self.closeXbut=[[UIButton alloc]initWithFrame:CGRectMake(0, 0, 20, 20)];
    self.closeXbut.backgroundColor=[UIColor redColor];
    [self addSubview:self.closeXbut];
    
    self.camIcamBut.userInteractionEnabled=YES;
    [self.camIcamBut addGestureRecognizer:[[UITapGestureRecognizer alloc]initWithTarget:self action:@selector(addCamButEvent:)]];
 
}
- (void)layoutSubviews;
{
    self.closeXbut.frame=CGRectMake(self.width-20, 0, 20, 20);
  
}
-(void)addCamButEvent:(UITapGestureRecognizer *)sender;
{
    [_delegate clikAddNextUrlEvet];
}
-(void)setImageUrl:(NSString*)url;
{
    self.soureUrl=url;
    [self.picImage sd_setImageWithURL:[NSURL URLWithString:[self getWebUrlByurl:self.soureUrl]] ];
    if(self.soureUrl.length){
        self.camIcamBut.hidden=YES;
        self.closeXbut.hidden=NO;
    }else{
        self.camIcamBut.hidden=NO;
         self.closeXbut.hidden=YES;
    }
}
-(NSString*)getWebUrlByurl:(NSString*)value
{
    NSString *rootUrl=@"http://34.87.12.20:20080";
    if ([value rangeOfString:@"http:"].location != NSNotFound||[value rangeOfString:@"https:"].location != NSNotFound) {
        return value;
    }else{
        return[NSString stringWithFormat:@"%@/%@",rootUrl,value];
    }
}

@end
