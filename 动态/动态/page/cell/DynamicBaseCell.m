//
//  DynamicBaseCell.m
//  动态
//
//  Created by zhao on 16/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "DynamicBaseCell.h"
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

@end

@implementation DynamicBaseCell

- (void)awakeFromNib {
    [super awakeFromNib];
    
}

- (instancetype)initWithStyle:(UITableViewCellStyle)style reuseIdentifier:(NSString *)reuseIdentifier
{
    if (self = [super initWithStyle:style reuseIdentifier:reuseIdentifier]) {
        [self initBaseUi];
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
    self.bttomView=[[UIView alloc]initWithFrame:self.bounds];
    [self addSubview:self.bttomView];
    
    
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
    self.infoLabel.frame=CGRectMake(100, 55, self.width-200, 20);
    self.bttomView.frame=CGRectMake(50, self.height-40, self.width, 30);
    self.followBut.frame=CGRectMake(self.width-100, 10, 80, 40);
}

-(void)refrishUi;
{
 
    
    self.usenameLabel.text=@"赵佳能";
    self.timeLabel.text=@"3天前";
     self.infoLabel.text=@"美丽得误会。就从看了我得图中发现！";
    self.userHeadImagView.image= [UIImage imageNamed:@"redbaseusehead"];
    
    [self layoutSubviews];
    
}
-(void)setCellData:(DynamicBaseVo*)value;
{
    if(value){
        self.datavo=value;
      
          [self refrishUi];
        self.backgroundColor=[UIColor redColor];
    }
  
}
- (void)setSelected:(BOOL)selected animated:(BOOL)animated {
    [super setSelected:selected animated:animated];
    
}

@end
