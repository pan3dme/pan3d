//
//  CommentsCell.m
//  动态
//
//  Created by zhao on 26/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "CommentsCell.h"
#import <UIKit/UIKit.h>
#import "Header.h"
#import "CommentsTabelVo.h"
#import "UIImageView+WebCache.h"

@interface CommentsCell()
@property(nonatomic,strong)UIImageView* userHeadImagView;
@property(nonatomic,strong)UILabel * usenameLabel;
@property(nonatomic,strong)UILabel * timeLabel;
@property(nonatomic,strong)UILabel * infoLabel;
@property(nonatomic,strong)UIButton * heartBut;
@property(nonatomic,strong)UIButton * messageBut;
@property(nonatomic,strong)UIView * bttomlineView;
@property(nonatomic,strong)CommentsTabelVo * datavo;

@end

@implementation CommentsCell
+(NSString*)CELL_STR;
{
    return @"CommentsCell";
}
- (void)awakeFromNib {
    [super awakeFromNib];
 
}

- (void)setSelected:(BOOL)selected animated:(BOOL)animated {
    [super setSelected:selected animated:animated];

    // Configure the view for the selected state
}

- (instancetype)initWithStyle:(UITableViewCellStyle)style reuseIdentifier:(NSString *)reuseIdentifier
{
    if (self = [super initWithStyle:style reuseIdentifier:reuseIdentifier]) {
        [self initBaseUi];
        self.selectionStyle = UITableViewCellSelectionStyleNone;
    }
    return self;
    
}

-(void)initBaseUi;
{
    
    self.bttomlineView =[[UIView alloc]initWithFrame:self.bounds];
    self.bttomlineView.backgroundColor=RGBOF(0xe4e4e4);
    [self addSubview:self.bttomlineView];
    
   
    
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
     
 
    self.heartBut=[self makeImagesBut:@"dt_xihuan_bai" perentUi:self];
    self.messageBut=[self makeImagesBut:@"dt_liaotian" perentUi:self];
 
 
    self.heartBut.frame=CGRectMake(100, 50, 25, 20);
    self.messageBut.frame=CGRectMake(100, 50,  25, 20);
    [self.messageBut addGestureRecognizer:[[UITapGestureRecognizer alloc]initWithTarget:self action:@selector(messageButClikEvent:)]];
}
- (void)layoutSubviews
{
    self.bttomlineView.frame=CGRectMake(0, self.height-1, self.width, 1);
    self.heartBut.frame=CGRectMake(self.width-50 , self.height-25, 25, 20);
    self.messageBut.frame=CGRectMake(self.width-100 , self.height-25, 25, 20);
    
}
-(void)messageButClikEvent:(UITapGestureRecognizer *)sender;
{
 
    
}
-(UIButton*)makeImagesBut:(NSString*)picStr perentUi:(UIView*)perentUi;
{
    UIButton *btn =[[UIButton alloc]initWithFrame: CGRectMake(0, 0, 40, 40)] ;
    [btn setImage:[UIImage imageNamed:picStr] forState:UIControlStateNormal];
    [perentUi addSubview:btn];
    return btn;
}


-(void)imgLoadByUrl:(NSString*)url imgView:(UIImageView*)imgView;
{
    //imgView.image = [UIImage imageWithData:[NSData dataWithContentsOfURL:[NSURL URLWithString:url]]];
    
    [imgView sd_setImageWithURL:[NSURL URLWithString:url] ];
    
    
}

-(void)refrishUi;
{

    self.usenameLabel.text=self.datavo.nick_name;
    self.timeLabel.text=@"3天前";
    self.infoLabel.text=self.datavo.content;
    [self imgLoadByUrl:@"http://34.87.12.20:20080//static/upload/dt/20191118/0aabf400d747b6955ce73bd97836fa9b_mini.jpg" imgView:self.userHeadImagView];
}
- (void)setCellData:(CommentsTabelVo *)value
{
    self.datavo=value;
    [self refrishUi];
    
    
}
+(CommentsCell *)makeViewCell:(UITableView*)tableView    dataVo:(CommentsTabelVo*)dataVo;
{
    CommentsCell *cell=[tableView dequeueReusableCellWithIdentifier:CommentsCell.CELL_STR];
    if(cell==nil){
        cell=[[CommentsCell alloc]initWithStyle:UITableViewCellStyleSubtitle reuseIdentifier:CommentsCell.CELL_STR];
    }
    [cell setCellData:dataVo];
    return cell;
}
@end
