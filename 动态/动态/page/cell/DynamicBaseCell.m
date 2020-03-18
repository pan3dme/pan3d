//
//  DynamicBaseCell.m
//  动态
//
//  Created by zhao on 16/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "DynamicBaseCell.h"
#import "UIImageView+WebCache.h"
#import "Header.h"
 


@interface DynamicBaseCell()
@property(nonatomic,strong)UIImageView* userHeadImagView;
@property(nonatomic,strong)UILabel * usenameLabel;
@property(nonatomic,strong)UILabel * timeLabel;
@property(nonatomic,strong)UILabel * infoLabel;
@property(nonatomic,strong)UIButton * followBut;
@property(nonatomic,strong)UIButton * heartBut;
@property(nonatomic,strong)UIButton * diamondBut;
@property(nonatomic,strong)UIButton * messageBut;
@property(nonatomic,strong)UIButton * shareBut;
@property(nonatomic,strong)UIView * bttomView;
@property(nonatomic,strong)UIView * bttomlineView;

@end

@implementation DynamicBaseCell

- (void)awakeFromNib {
    [super awakeFromNib];
    
}

- (instancetype)initWithStyle:(UITableViewCellStyle)style reuseIdentifier:(NSString *)reuseIdentifier
{
    if (self = [super initWithStyle:style reuseIdentifier:reuseIdentifier]) {
        [self initBaseUi];
        self.selectionStyle = UITableViewCellSelectionStyleNone;
    }
    return self;
    
}
-(UIButton*)makeLabelBut:(NSString*)tittleStr perentUi:(UIView*)perentUi;
{
    UIButton *btn =[UIButton buttonWithType:UIButtonTypeRoundedRect];
    btn.frame = CGRectMake(0, 0, 100, 40);
    [btn setTitle:tittleStr forState:UIControlStateNormal];//正常状态
    [btn setTitle:tittleStr forState:UIControlStateHighlighted];//正常状态高亮控制
    btn.backgroundColor = [UIColor grayColor];
    [btn setTitleColor:[UIColor redColor] forState:UIControlStateNormal];
    [btn setTitleColor:[UIColor orangeColor] forState:UIControlStateHighlighted];
    [btn setTintColor:[UIColor whiteColor]];
    btn .titleLabel.font = [UIFont systemFontOfSize:24];
    [perentUi addSubview:btn];
    return btn;
}
-(UIImageView*)makeImageView;
{
    UIImageView* temp=[[UIImageView alloc]initWithFrame:CGRectMake(0, 0, 89, 89)];
   temp.userInteractionEnabled = YES;
    [self.infoBg addSubview:temp];
    return temp;
    
}
-(UIButton*)makeImagesBut:(NSString*)picStr perentUi:(UIView*)perentUi;
{
    UIButton *btn =[[UIButton alloc]initWithFrame: CGRectMake(0, 0, 40, 40)] ;
    [btn setImage:[UIImage imageNamed:picStr] forState:UIControlStateNormal];
    [perentUi addSubview:btn];
    return btn;
}

-(void)initBaseUi;
{
    
    self.bttomlineView =[[UIView alloc]initWithFrame:self.bounds];
    self.bttomlineView.backgroundColor=RGBOF(0xe4e4e4);
    [self addSubview:self.bttomlineView];
    
    self.bttomView=[[UIView alloc]initWithFrame:self.bounds];
    [self addSubview:self.bttomView];
    
    self.infoBg=[[UIView alloc]initWithFrame:self.bounds];
    [self addSubview:self.infoBg];
    
 
    self.userHeadImagView=[[UIImageView alloc]initWithFrame:CGRectMake(10, 10, 54, 54)];
    [self addSubview:self.userHeadImagView];
     self.userHeadImagView.layer.cornerRadius = 27; // 圆角的弧度
    self.userHeadImagView.clipsToBounds=YES;
    
    self.usenameLabel=[[UILabel alloc]initWithFrame:CGRectMake(100, 5, 60, 24)];
     self.usenameLabel.font =[UIFont systemFontOfSize:16];
    [self addSubview:self.usenameLabel];
    
    self.timeLabel=[[UILabel alloc]initWithFrame:CGRectMake(100, 30, 60, 20)];
    self.timeLabel.font =[UIFont systemFontOfSize:14];
    self.timeLabel.textColor=RGBOF(0xbfbfbf);
    [self addSubview:self.timeLabel];
    
    self.infoLabel=[[UILabel alloc]initWithFrame:CGRectMake(100, 55, 60, 20)];
     self.timeLabel.font =[UIFont systemFontOfSize:15];
    [self addSubview:self.infoLabel];
    
    
    self.followBut=[self makeLabelBut:@"关注" perentUi:self];
    self.followBut.layer.borderWidth=1.0;
    self.followBut.frame = CGRectMake(0, 0, 100, 28);
    self.followBut .titleLabel.font = [UIFont systemFontOfSize:16];
    self.followBut.layer.cornerRadius = self.followBut.height/2; // 圆角的弧度
    
    
    self.diamondBut=[self makeImagesBut:@"diamond_img_diamond" perentUi:self.bttomView];
    self.heartBut=[self makeImagesBut:@"message" perentUi:self.bttomView];
    self.messageBut=[self makeImagesBut:@"message.circle" perentUi:self.bttomView];
    self.shareBut=[self makeImagesBut:@"centsign.square" perentUi:self.bttomView];
    
    
    self.diamondBut.frame=CGRectMake(0, 0, 30, 30);
    self.heartBut.frame=CGRectMake(50, 0, 30, 30);
    self.messageBut.frame=CGRectMake(100, 0, 30, 30);
    self.shareBut.frame=CGRectMake(150, 0, 30, 30);
 
}

-(void)layoutSubviews;
{
    self.followBut.frame=CGRectMake(self.width-90, 10, 80, 28);
    self.bttomView.frame=CGRectMake(100, self.height-40, self.width, 30);
    self.bttomlineView.frame=CGRectMake(0, self.height-1, self.width, 1);
    self.infoLabel.frame=CGRectMake(100, 55, self.width-200, 20);
    
    if(self.datavo.content.length){
           self.infoBg.frame=CGRectMake(100, 80, self.width-200, self.height-100);
    }else{
         self.infoBg.frame=CGRectMake(100, 55, self.width-200, self.height-100);
    }
   
}

-(void)imgLoadByUrl:(NSString*)url imgView:(UIImageView*)imgView;
{
      //imgView.image = [UIImage imageWithData:[NSData dataWithContentsOfURL:[NSURL URLWithString:url]]];
  
       [imgView sd_setImageWithURL:[NSURL URLWithString:url] ];
    
    
}

-(void)refrishUi;
{
    
  //  DynamicTabelVo* dynamicTabelVo= self.datavo.tabelVo;
    
    self.usenameLabel.text=self.datavo.nick_name;
    self.timeLabel.text=@"3天前";
    self.infoLabel.text=self.datavo.content;
    [self imgLoadByUrl:@"http://34.87.12.20:20080//static/upload/dt/20191118/0aabf400d747b6955ce73bd97836fa9b_mini.jpg" imgView:self.userHeadImagView];
     
 
    BOOL DD=NO;
    if(DD){
        self.followBut.backgroundColor =[UIColor whiteColor];
        self.followBut.layer.borderColor=RGBOF(0xff5549).CGColor;
        [self.followBut setTitleColor:RGBOF(0xff5549) forState:UIControlStateNormal];
    }else{
        self.followBut.backgroundColor =[UIColor whiteColor];
        self.followBut.layer.borderColor=RGBOF(0x9ccc65).CGColor;
        [self.followBut setTitleColor:RGBOF(0x9ccc65) forState:UIControlStateNormal];
    }
    [self layoutSubviews];
    
}
-(void)setCellData:(DynamicBaseVo*)value;
{
    if(value){
        self.datavo=value;
        
        [self refrishUi];
        // self.backgroundColor=[UIColor redColor];
    }
    
}
- (void)setSelected:(BOOL)selected animated:(BOOL)animated {
    [super setSelected:selected animated:animated];
    
}

@end
