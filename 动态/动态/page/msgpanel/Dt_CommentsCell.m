//
//  CommentsCell.m
//  动态
//
//  Created by zhao on 26/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Dt_CommentsCell.h"
#import <UIKit/UIKit.h>
#import "Header.h"
#import "Dt_DynamicModel.h"
#import "Dt_CommentsTabelVo.h"
#import "UIImageView+WebCache.h"

@interface Dt_CommentsCell()
@property(nonatomic,strong)UIImageView* userHeadImagView;
@property(nonatomic,strong)UILabel * usenameLabel;
@property(nonatomic,strong)UILabel * timeLabel;
@property(nonatomic,strong)UILabel * infoLabel;
@property(nonatomic,strong)UILabel * replyLabel;
@property(nonatomic,strong)UIButton * heartBut;
@property(nonatomic,strong)UIButton * messageBut;

@property(nonatomic,strong)UIView * replyTxtBg;
@property(nonatomic,strong)UIView * bttomlineView;

@property(nonatomic,strong)Dt_CommentsTabelVo * datavo;

@end

@implementation Dt_CommentsCell
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
    self.timeLabel.font =[UIFont systemFontOfSize:16];
    self.timeLabel.textColor=RGBOF(0xbfbfbf);
    [self addSubview:self.timeLabel];
    
    self.infoLabel=[[UILabel alloc]initWithFrame:CGRectMake(100, 35, 60, 20)];
    self.infoLabel.font =[UIFont systemFontOfSize:16];
    self.infoLabel.numberOfLines=0;
    [self addSubview:self.infoLabel];
    
    
    self.replyTxtBg=[[UIView alloc]initWithFrame:CGRectMake(100, 35, 60, 20)];
    self.replyTxtBg.backgroundColor=RGBOF(0xf1f1f1);
    [self addSubview:self.replyTxtBg];
    
    self.replyLabel=[[UILabel alloc]initWithFrame:self.replyTxtBg.bounds];
    self.replyLabel.autoresizingMask = UIViewAutoresizingFlexibleHeight | UIViewAutoresizingFlexibleWidth;
    self.replyLabel.font =[UIFont systemFontOfSize:16];
    self.replyLabel.numberOfLines=0;
    [self.replyTxtBg addSubview:self.replyLabel];
    
    
    self.heartBut=[self makeImagesBut:@"dt_xihuan_bai" perentUi:self];
    self.messageBut=[self makeImagesBut:@"dt_liaotian" perentUi:self];
    
    
    self.heartBut.frame=CGRectMake(100, 50, 25, 20);
    self.messageBut.frame=CGRectMake(100, 50,  25, 20);
    [self.heartBut addGestureRecognizer:[[UITapGestureRecognizer alloc]initWithTarget:self action:@selector(heartButClikEvent:)]];
    [self.messageBut addGestureRecognizer:[[UITapGestureRecognizer alloc]initWithTarget:self action:@selector(messageButClikEvent:)]];
}
-(void)heartButClikEvent:(UITapGestureRecognizer *)sender;
{
    if([[ Dt_DynamicModel default] heartByKey:self.heartKey]==1){
        [[ Dt_DynamicModel default] setHdeartByKey:self.heartKey num:@1];
    }else{
        [[ Dt_DynamicModel default] setHdeartByKey:self.heartKey num:@2];
    }
    
    [self refrishUi];
    
}
-(NSString*)heartKey;
{
    NSString* key=[NSString stringWithFormat:@"%@_%d",@"comment",(int)self.datavo.id ];
    return key;
}
-(void)messageButClikEvent:(UITapGestureRecognizer *)sender;
{
    [_delegate clikCellMessage:self.datavo];
}
- (void)layoutSubviews
{
    self.usenameLabel.frame= CGRectMake(100, 5, self.width-200, 24);
    self.bttomlineView.frame=CGRectMake(0, self.height-1, self.width, 1);
    self.heartBut.frame=CGRectMake(self.width-50 , self.height-30, 25, 20);
    self.messageBut.frame=CGRectMake(self.width-100 , self.height-30, 25, 20);
    self.timeLabel.frame= CGRectMake(100, self.height-30, 100, 20);
    
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
 
    [imgView sd_setImageWithURL:[NSURL URLWithString:url] ];
 
}

-(void)refrishUi;
{
    CGFloat tw150=130;
    self.usenameLabel.text=self.datavo.nick_name;
     self.timeLabel.text=[[Dt_DynamicModel default] getTimeStr: [self.datavo.add_time doubleValue]];
 
    self.infoLabel.text=self.datavo.content;
    CGSize infoSize = [self.infoLabel.text boundingRectWithSize:CGSizeMake(kScreenW-tw150, 200) options:NSStringDrawingUsesLineFragmentOrigin attributes:@{NSFontAttributeName:[UIFont systemFontOfSize:16]}  context:nil].size;
    
    self.infoLabel.frame=CGRectMake(100, 35, kScreenW-tw150, infoSize.height+2);
    [self imgLoadByUrl:@"http://34.87.12.20:20080//static/upload/dt/20191118/0aabf400d747b6955ce73bd97836fa9b_mini.jpg" imgView:self.userHeadImagView];
    
    if(self.datavo.sonitem.count){
        self.replyTxtBg.hidden=NO;
        NSMutableAttributedString *butedStr = [[NSMutableAttributedString alloc] initWithString:self.datavo.replyContent];
        NSString* tempStr=@"";
        for (int i=0; i<self.datavo.sonitem.count; i++) {
            [butedStr addAttribute:NSForegroundColorAttributeName value:RGBOF(0x29b6f6) range:NSMakeRange(tempStr.length, self.datavo.sonitem[i].nick_name.length )];
            tempStr = [ tempStr stringByAppendingString: self.datavo.sonitem[i].nick_name];
            tempStr = [ tempStr stringByAppendingString:@":"];
            tempStr = [ tempStr stringByAppendingString: self.datavo.sonitem[i].content];
            if(i< self.datavo.sonitem.count-1){
                tempStr = [ tempStr stringByAppendingString:@"\n"];
            }
        }
        self.replyLabel.attributedText = butedStr;
        CGSize replySize = [tempStr boundingRectWithSize:CGSizeMake(kScreenW-tw150-10, 200) options:NSStringDrawingUsesLineFragmentOrigin attributes:@{NSFontAttributeName:[UIFont systemFontOfSize:16]}  context:nil].size;
        
        self.replyTxtBg.frame=CGRectMake(100, 60, kScreenW-tw150, replySize.height+10);
        self.replyLabel.frame=CGRectMake(5, 5, self.replyTxtBg.width-5, replySize.height);
        
    }else{
        self.replyTxtBg.hidden=YES;
        self.replyTxtBg.frame=CGRectMake(100, 40, kScreenW-tw150, 20);
    }
    
    if([[ Dt_DynamicModel default] heartByKey:self.heartKey]){
         [self.heartBut setImage:[UIImage imageNamed:@"dt_xihuan_hong"] forState:UIControlStateNormal];
     }else{
         [self.heartBut setImage:[UIImage imageNamed:@"dt_xihuan_bai"] forState:UIControlStateNormal];
     }
}
- (void)setCellData:(Dt_CommentsTabelVo *)value
{
    self.datavo=value;
    [self refrishUi];
    
    
}
+(Dt_CommentsCell *)makeViewCell:(UITableView*)tableView    dataVo:(Dt_CommentsTabelVo*)dataVo;
{
    Dt_CommentsCell *cell=[tableView dequeueReusableCellWithIdentifier:Dt_CommentsCell.CELL_STR];
    if(cell==nil){
        cell=[[Dt_CommentsCell alloc]initWithStyle:UITableViewCellStyleSubtitle reuseIdentifier:Dt_CommentsCell.CELL_STR];
    }
    [cell setCellData:dataVo];
    return cell;
}
@end
