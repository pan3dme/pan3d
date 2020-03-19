//
//  TableImageViewCell.m
//  动态
//
//  Created by zhao on 16/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "TableImageViewCell.h"
#import "UIImageView+WebCache.h"
#import "YBImageBrowser.h"
 
@interface TableImageViewCell()
 


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
    
  
    self.img00.tag = 100;
    [self.img00 addGestureRecognizer:[[UITapGestureRecognizer alloc]initWithTarget:self action:@selector(actionTap:)]];
    self.img01.tag = 101;
    [self.img01 addGestureRecognizer:[[UITapGestureRecognizer alloc]initWithTarget:self action:@selector(actionTap:)]];
    self.img02.tag = 102;
    [self.img02 addGestureRecognizer:[[UITapGestureRecognizer alloc]initWithTarget:self action:@selector(actionTap:)]];
    self.img03.tag = 103;
    [self.img03 addGestureRecognizer:[[UITapGestureRecognizer alloc]initWithTarget:self action:@selector(actionTap:)]];
    
}
-(void)actionTap:(UITapGestureRecognizer *)sender;
{
    
    TableImageViewCell *cell = self;
      NSMutableArray* browserDataArr=[[NSMutableArray alloc]init];
      NSMutableArray*  imagesArr =cell.datavo.images;
      for(int i=0;i<imagesArr.count;i++){
          YBImageBrowseCellData *data = [YBImageBrowseCellData new];
          data.url =     [NSURL URLWithString:imagesArr[i]];
          if(i==0){
              data.sourceObject = cell.img00;
          }
          if(i==1){
              data.sourceObject = cell.img01;
          }
          if(i==2){
              data.sourceObject = cell.img02;
          }
          if(i==3){
              data.sourceObject = cell.img03;
          }
          [browserDataArr addObject:data];
      }
      YBImageBrowser *browser = [YBImageBrowser new];
      browser.dataSourceArray = browserDataArr;
      browser.currentIndex = sender.view.tag-100;
      [browser show];
 
    //[self.delegate imglistClik:self idx:sender.view.tag-100];
    
   
}
/*
-(UIImageView*)makeImageView;
{
   
    UIImageView* temp=[[UIImageView alloc]initWithFrame:CGRectMake(0, 0, 89, 89)];
    temp.image=[UIImage imageNamed:@"avatar2.e90b2411"];
    [self.infoBg addSubview:temp];
    temp.userInteractionEnabled = YES;
    return temp;
    
}
*/
- (void)setCellData:(DynamicBaseVo *)value
{
    [super setCellData:value];
    NSArray<NSString*>*  minis =  self.datavo.miniimages;
    //[0]    __NSCFString *    @"http://34.87.12.20:20080//static/upload/107762834426d05fae60b594cc2a071e.jpeg"    0x0000000283cc2100

    if(minis.count>=1){
        [self imgLoadByUrl:minis[0]  imgView:self.img00];
    }
    if(minis.count>=2){
        [self imgLoadByUrl:minis[1]  imgView:self.img01];
    }
    if(minis.count>=3){
        [self imgLoadByUrl:minis[2]  imgView:self.img02];
    }
    if(minis.count>=4){
        [self imgLoadByUrl:minis[3]  imgView:self.img03];
    }
    
}
- (void)layoutSubviews;
{
    [super layoutSubviews];
    self.img00.frame=CGRectMake(0, 0, 89, 89);
    self.img01.frame=CGRectMake(100, 0, 89, 89);
    self.img02.frame=CGRectMake(0, 100, 89, 89);
    self.img03.frame=CGRectMake(100, 100, 89, 89);
    
    if(self.datavo){
        self.img00.hidden=YES;
        self.img01.hidden=YES;
        self.img02.hidden=YES;
        self.img03.hidden=YES;
        switch (self.datavo.miniimages.count) {
            case 1:
                self.img00.hidden=NO;
                 self.img00.frame=CGRectMake(0, 0, 139, 139);
                
                break;
            case 2:
                self.img00.hidden=NO;
                self.img01.hidden=NO;
                break;
            case 3:
                self.img00.hidden=NO;
                self.img01.hidden=NO;
                self.img02.hidden=NO;
                break;
            case 4:
                self.img00.hidden=NO;
                self.img01.hidden=NO;
                self.img02.hidden=NO;
                self.img03.hidden=NO;
                break;
            default:
                break;
        }
    }
 
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
