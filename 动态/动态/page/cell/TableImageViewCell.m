//
//  TableImageViewCell.m
//  动态
//
//  Created by zhao on 16/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "TableImageViewCell.h"
#import "UIImageView+WebCache.h"

@interface TableImageViewCell()

@property(nonatomic,strong)UIImageView * img00;
@property(nonatomic,strong)UIImageView * img01;
@property(nonatomic,strong)UIImageView * img02;
@property(nonatomic,strong)UIImageView * img03;

@end
@implementation TableImageViewCell
+(NSString*)CELL_STR;
{
    return @"TableImageViewCell";
}
- (void)awakeFromNib {
    [super awakeFromNib];
    // Initialization code
}
-(void)initBaseUi;
{
    [super initBaseUi];
    self.img00=[self makeImageView];
    self.img01=[self makeImageView];
    self.img02=[self makeImageView];
    self.img03=[self makeImageView];
    
}
-(UIImageView*)makeImageView;
{
    UIImageView* temp=[[UIImageView alloc]initWithFrame:CGRectMake(0, 0, 89, 89)];
    temp.image=[UIImage imageNamed:@"avatar2.e90b2411"];
    [self.infoBg addSubview:temp];
    return temp;
    
}
- (void)setCellData:(DynamicBaseVo *)value
{
    //url001    __NSCFString *    @"http://34.87.12.20:20080//static/upload/dt/20191118/2e6664cb2a2e4d8e9e0acb10f4d94dbe.jpg "    0x000000028107f100
    [super setCellData:value];
  
    if(self.datavo.miniimages.count==1){
        self.img00.image = [UIImage imageWithData:[NSData dataWithContentsOfURL:[NSURL URLWithString:self.datavo.miniimages[0]]]];
    }
    if(self.datavo.miniimages.count==2){
        self.img01.image = [UIImage imageWithData:[NSData dataWithContentsOfURL:[NSURL URLWithString:self.datavo.miniimages[1]]]];
    }
    if(self.datavo.miniimages.count==3){
        self.img02.image = [UIImage imageWithData:[NSData dataWithContentsOfURL:[NSURL URLWithString:self.datavo.miniimages[2]]]];
    }
    if(self.datavo.miniimages.count==4){
        self.img03.image = [UIImage imageWithData:[NSData dataWithContentsOfURL:[NSURL URLWithString:self.datavo.miniimages[3]]]];
    }
}
- (void)layoutSubviews;
{
    [super layoutSubviews];
    self.img00.frame=CGRectMake(0, 0, 89, 89);
    self.img01.frame=CGRectMake(100, 0, 89, 89);
    self.img02.frame=CGRectMake(0, 100, 89, 89);
    self.img03.frame=CGRectMake(100, 100, 89, 89);
}
- (void)setSelected:(BOOL)selected animated:(BOOL)animated {
    [super setSelected:selected animated:animated];
}
+(TableImageViewCell *)makeViewCell:(UITableView*)tableView    dataVo:(DynamicBaseVo*)dataVo;
{
    TableImageViewCell *cell=[tableView dequeueReusableCellWithIdentifier:TableImageViewCell.CELL_STR];
    if(cell==nil){
        cell=[[TableImageViewCell alloc]initWithStyle:UITableViewCellStyleSubtitle reuseIdentifier:TableImageViewCell.CELL_STR];
    }
    [cell setCellData:dataVo];
    return cell;
}

@end
