//
//  TabelVideoViewCell.m
//  动态
//
//  Created by zhao on 17/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "TabelVideoViewCell.h"
#import "YBImageBrowser.h"
@interface TabelVideoViewCell()

@property(nonatomic,strong)UIImageView * videoport;
@property(nonatomic,strong)UIImageView * plicIcon;
//play_48px.953e893c

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
    self.plicIcon=[self makeImageView];
    self.plicIcon.image=[UIImage imageNamed:@"play_48px"];
    
     [self.plicIcon addGestureRecognizer:[[UITapGestureRecognizer alloc]initWithTarget:self action:@selector(actionTap:)]];
}
-(void)actionTap:(UITapGestureRecognizer *)sender;
{
    
   
    NSMutableArray* browserDataArr=[[NSMutableArray alloc]init];
     
    YBVideoBrowseCellData *data = [YBVideoBrowseCellData new];
    data.url =   [NSURL URLWithString:self.datavo.videourl];
    data.sourceObject = self.videoport;
    data.autoPlayCount=1;
    
    [browserDataArr addObject:data];
  
    YBImageBrowser *browser = [YBImageBrowser new];
    browser.dataSourceArray = browserDataArr;
    browser.currentIndex =0;
    [browser show];
 
}
- (void)setCellData:(DynamicBaseVo *)value
{
  
    [super setCellData:value];
    
    [self imgLoadByUrl:self.datavo.video_post  imgView:self.videoport];
  
}
 
- (void)setSelected:(BOOL)selected animated:(BOOL)animated {
    [super setSelected:selected animated:animated];

  

}

- (void)layoutSubviews;
{
    [super layoutSubviews];
     self.videoport.frame=CGRectMake(0, 0,   self.datavo.videoSize.x, self.datavo.videoSize.y);
     self.plicIcon.frame=CGRectMake( (self.datavo.videoSize.x-48)/2, (self.datavo.videoSize.y-48)/2,   48,48);
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
