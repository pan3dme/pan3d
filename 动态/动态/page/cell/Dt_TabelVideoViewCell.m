//
//  TabelVideoViewCell.m
//  动态
//
//  Created by zhao on 17/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Dt_TabelVideoViewCell.h"
#import "YBImageBrowser.h"
#import "UIImageView+WebCache.h"
#import "UIView+XBZKeyBoard.h"

@interface Dt_TabelVideoViewCell()

@property(nonatomic,strong)Dt_UIImageViewLock * videoport;
@property(nonatomic,strong)UIImageView * plicIcon;
 
 
 

@end
@implementation Dt_TabelVideoViewCell
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
    self.videoport=[self makeImageLockView];
 
    self.plicIcon=[self makeImageView];
    self.plicIcon.image=[UIImage imageNamed:@"play_48px"];
    [self.plicIcon addGestureRecognizer:[[UITapGestureRecognizer alloc]initWithTarget:self action:@selector(actionTap:)]];
      
}

-(void)actionTap:(UITapGestureRecognizer *)sender;
{
    if( [self showAlertLock]){
        return;
    }
   
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
- (void)setCellData:(Dt_DynamicBaseVo *)value
{
  
    [super setCellData:value];
    
    if( self.datavo.tabelVo.is_lock){
        [self imgLockLoadByUrl:self.datavo.video_post  imgView:self.videoport blurum:3];
        self.videoport.lock=YES;
  
    }else{
        [self imgLockLoadByUrl:self.datavo.video_post  imgView:self.videoport blurum:-1];
        self.videoport.lock=NO;
 
    }
 
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

+(Dt_TabelVideoViewCell *)makeViewCell:(UITableView*)tableView    dataVo:(Dt_DynamicBaseVo*)dataVo;
{
    Dt_TabelVideoViewCell *cell=[tableView dequeueReusableCellWithIdentifier:Dt_TabelVideoViewCell.CELL_STR];
    if(cell==nil){
        cell=[[Dt_TabelVideoViewCell alloc]initWithStyle:UITableViewCellStyleSubtitle reuseIdentifier:Dt_TabelVideoViewCell.CELL_STR];
    }
   [cell setCellData:dataVo];
    return cell;
}
@end
