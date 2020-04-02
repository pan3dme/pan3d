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
#import <AVFoundation/AVFoundation.h>
#import "AddVideoView.h"


@interface AddImgVideoCell ()
@property (nonatomic,strong)UIImageView* picImage;
@property (nonatomic,strong)UIImageView* camIcamBut;
@property (nonatomic,strong)UIButton* closeXbut;
@property (nonatomic,strong)UILabel* progressLabel;
@property (nonatomic,strong)NSString* soureUrl;

@property (nonatomic,strong)AddVideoView* addVideoView;

 


@end
@implementation AddImgVideoCell

- (instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        self.backgroundColor=[UIColor whiteColor];
        
        
        CAShapeLayer *border = [CAShapeLayer layer];
        border.strokeColor =  RGBOF(0xbfbfbf) .CGColor;
        border.fillColor = [UIColor clearColor].CGColor;
        border.path = [UIBezierPath bezierPathWithRect:self.bounds].CGPath;
        border.frame = self.bounds;
        border.lineWidth = 1.f;
        border.lineDashPattern = @[@4, @2];
        
        [self.layer addSublayer:border];
        
        [self initBaseUi];
    }
    return self;
}
-(void)initBaseUi;
{
 

    
    
    self.picImage=[[UIImageView alloc]initWithFrame:self.bounds];
    self.picImage.autoresizingMask = UIViewAutoresizingFlexibleHeight | UIViewAutoresizingFlexibleWidth;
    [self addSubview:self.picImage];
    
  self.addVideoView= [[AddVideoView alloc]init];
    self.addVideoView.frame=self.picImage.bounds;
      self.addVideoView.autoresizingMask = UIViewAutoresizingFlexibleHeight | UIViewAutoresizingFlexibleWidth;
      [self addSubview:self.addVideoView];
    
    
    self.camIcamBut=[[UIImageView alloc]initWithFrame:CGRectMake(50, 50, 40, 40)];
    self.camIcamBut.autoresizingMask = UIViewAutoresizingFlexibleHeight | UIViewAutoresizingFlexibleWidth;
    [self addSubview:self.camIcamBut];
    self.camIcamBut.image=[UIImage imageNamed:@"dt_zhaoxiangji"];
    
    
    self.closeXbut=[[UIButton alloc]initWithFrame:CGRectMake(0, 0, 25, 25)];
 
    [self.closeXbut setImage:[UIImage imageNamed:@"com_close_1"] forState:UIControlStateNormal];
    //
    [self addSubview:self.closeXbut];
      [self.closeXbut addGestureRecognizer:[[UITapGestureRecognizer alloc]initWithTarget:self action:@selector(closeXbutEvent:)]];
    
    
    self.progressLabel=[[UILabel alloc]initWithFrame:CGRectMake(0, 0, 100, 20)];
    self.progressLabel.text=@"0/100";
      self.progressLabel.hidden=YES;
    [self addSubview:self.progressLabel];
    
    
    self.camIcamBut.userInteractionEnabled=YES;
    [self.camIcamBut addGestureRecognizer:[[UITapGestureRecognizer alloc]initWithTarget:self action:@selector(addCamButEvent:)]];
 
}
- (void)layoutSubviews;
{
    self.closeXbut.frame=CGRectMake(self.width-27, 2, 25, 25);
    self.camIcamBut.frame=CGRectMake((self.width- 30)/2, (self.width- 30)/2, 30, 30);
  
}
-(void)progressToCellLabel:(float)num;
{
    self.progressLabel.text=[NSString stringWithFormat:@"%d/100",(int)(num*100)];
    self.progressLabel.hidden=NO;
    self.camIcamBut.hidden=YES;
}
-(void)closeXbutEvent:(UITapGestureRecognizer *)sender;
{
    [_delegate clearFileByUrl:self.soureUrl];
}
-(void)addCamButEvent:(UITapGestureRecognizer *)sender;
{
    [_delegate clikAddNextUrlEvet];
}
-(void)setImageUrl:(NSString*)url;
{
    self.soureUrl=url;
    
    self.picImage.hidden=YES;
    self.addVideoView.hidden=YES;
    if ([self.soureUrl rangeOfString:@"mov"].location == NSNotFound){
        [self.picImage sd_setImageWithURL:[NSURL URLWithString:[self getWebUrlByurl:self.soureUrl]] ];
        self.picImage.hidden=NO;
    }else{
        [self playvideo:self.soureUrl];
        self.addVideoView.hidden=NO;
    }
    
    if(self.soureUrl.length){
        self.camIcamBut.hidden=YES;
        self.closeXbut.hidden=NO;
         self.progressLabel.hidden=YES;
    }else{
        self.camIcamBut.hidden=NO;
         self.closeXbut.hidden=YES;
    
    }
    
    
}
-(void)playvideo:(NSString*)url;
{
    [self.addVideoView resetUrl:[self getWebUrlByurl:url]];
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
