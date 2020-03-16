//
//  TableImageViewCell.m
//  动态
//
//  Created by zhao on 16/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "TableImageViewCell.h"
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
    [super setCellData:value];
    
    
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
