//
//  DynamicBaseCell.m
//  动态
//
//  Created by zhao on 16/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

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

-(UIButton*)makeImagesBut:(NSString*)picStr perentUi:(UIView*)perentUi;
{
    UIButton *btn =[UIButton buttonWithType:UIButtonTypeRoundedRect];
    btn.frame = CGRectMake(0, 0, 50, 40);
    btn.backgroundColor = [UIColor grayColor];
    UIImage *icon01 = [UIImage imageNamed:picStr];
    UIImage *icon02 = [UIImage imageNamed:picStr];
    [btn setImage:icon01 forState:UIControlStateNormal];
    [btn setImage:icon02 forState:UIControlStateHighlighted];
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
    
    
    
    
    self.userHeadImagView=[[UIImageView alloc]initWithFrame:CGRectMake(5, 5, 60, 60)];
    [self addSubview:self.userHeadImagView];
    self.usenameLabel=[[UILabel alloc]initWithFrame:CGRectMake(100, 5, 60, 24)];
    [self addSubview:self.usenameLabel];
    
    self.timeLabel=[[UILabel alloc]initWithFrame:CGRectMake(100, 30, 60, 20)];
    [self addSubview:self.timeLabel];
    
    self.infoLabel=[[UILabel alloc]initWithFrame:CGRectMake(100, 55, 60, 20)];
    [self addSubview:self.infoLabel];
    
    
    self.followBut=[self makeLabelBut:@"关注" perentUi:self];
    //self.followBut=[self makeImagesBut:@"icon_zs.4269d4be" perentUi:self];
    
    
    self.diamondBut=[self makeImagesBut:@"icon_zs.4269d4be" perentUi:self.bttomView];
    self.heartBut=[self makeImagesBut:@"icon_zs.4269d4be" perentUi:self.bttomView];
    self.messageBut=[self makeImagesBut:@"icon_zs.4269d4be" perentUi:self.bttomView];
    self.shareBut=[self makeImagesBut:@"icon_zs.4269d4be" perentUi:self.bttomView];
    
    
    self.diamondBut.frame=CGRectMake(0, 0, 30, 30);
    self.heartBut.frame=CGRectMake(40, 0, 30, 30);
    self.messageBut.frame=CGRectMake(80, 0, 30, 30);
    self.shareBut.frame=CGRectMake(120, 0, 30, 30);
    
}

-(void)layoutSubviews;
{
    self.followBut.frame=CGRectMake(self.width-90, 10, 80, 40);
    self.bttomView.frame=CGRectMake(100, self.height-40, self.width, 30);
    self.bttomlineView.frame=CGRectMake(0, self.height-1, self.width, 1);
    
    self.infoLabel.frame=CGRectMake(100, 55, self.width-200, 20);
    self.infoBg.frame=CGRectMake(100, 80, self.width-200, self.height-100);
}

-(void)refrishUi;
{
    
  //  DynamicTabelVo* dynamicTabelVo= self.datavo.tabelVo;
    
    self.usenameLabel.text=self.datavo.nick_name;
    self.timeLabel.text=@"3天前";
    self.infoLabel.text=self.datavo.content;
 
    [self.userHeadImagView sd_setImageWithURL:[NSURL URLWithString:self.datavo.headurl] ];
    
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
