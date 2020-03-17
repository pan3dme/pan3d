//
//  TabelVideoViewCell.m
//  动态
//
//  Created by zhao on 17/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "TabelVideoViewCell.h"
@interface TabelVideoViewCell()

@property(nonatomic,strong)UIImageView * videoport;
 

@end
@implementation TabelVideoViewCell
+(NSString*)CELL_STR;
{
    return @"TabelVideoViewCell";
}
- (void)awakeFromNib {
    [super awakeFromNib];
    // Initialization code
}
-(void)initBaseUi;
{
    [super initBaseUi];
    self.videoport=[self makeImageView];
 
    
}
- (void)setCellData:(DynamicBaseVo *)value
{
  
    [super setCellData:value];
  
    NSString* picUrl=self.datavo.video_post;
  self.videoport.image = [UIImage imageWithData:[NSData dataWithContentsOfURL:[NSURL URLWithString:picUrl]]];
  
}
-(UIImageView*)makeImageView;
{
    UIImageView* temp=[[UIImageView alloc]initWithFrame:CGRectMake(0, 0, 89, 89)];
    temp.image=[UIImage imageNamed:@"avatar2.e90b2411"];
    [self.infoBg addSubview:temp];
    return temp;
    
}
- (void)setSelected:(BOOL)selected animated:(BOOL)animated {
    [super setSelected:selected animated:animated];

  

}

- (void)layoutSubviews;
{
    [super layoutSubviews];
    
     self.videoport.frame=CGRectMake(0, 0,   self.datavo.videoSize.x, self.datavo.videoSize.y);
    
}

+(TabelVideoViewCell *)makeViewCell:(UITableView*)tableView    dataVo:(DynamicBaseVo*)dataVo;
{
    TabelVideoViewCell *cell=[tableView dequeueReusableCellWithIdentifier:TabelVideoViewCell.CELL_STR];
    if(cell==nil){
        cell=[[TabelVideoViewCell alloc]initWithStyle:UITableViewCellStyleSubtitle reuseIdentifier:TabelVideoViewCell.CELL_STR];
    }
   [cell setCellData:dataVo];
    return cell;
}
@end
