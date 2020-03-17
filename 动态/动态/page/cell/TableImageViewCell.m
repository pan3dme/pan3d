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
    [super setCellData:value];
    NSArray<NSString*>*  minis =  self.datavo.miniimages;
    
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
