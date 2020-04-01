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
#import "DtAlertView.h"



@interface TableImageViewCell()
<
UITextFieldDelegate
>


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
    self.img00=[self makeImageLockView];
    self.img01=[self makeImageLockView];
    self.img02=[self makeImageLockView];
    self.img03=[self makeImageLockView];
    
    
    self.img00.tag = 100;
    [self.img00 addGestureRecognizer:[[UITapGestureRecognizer alloc]initWithTarget:self action:@selector(actionTap:)]];
    self.img01.tag = 101;
    [self.img01 addGestureRecognizer:[[UITapGestureRecognizer alloc]initWithTarget:self action:@selector(actionTap:)]];
    self.img02.tag = 102;
    [self.img02 addGestureRecognizer:[[UITapGestureRecognizer alloc]initWithTarget:self action:@selector(actionTap:)]];
    self.img03.tag = 103;
    [self.img03 addGestureRecognizer:[[UITapGestureRecognizer alloc]initWithTarget:self action:@selector(actionTap:)]];
    
}
-(UIImageViewLock*)makeImageLockView;
{
    UIImageViewLock* temp=[[UIImageViewLock alloc]initWithFrame:CGRectMake(0, 0, 89, 89)];
    temp.userInteractionEnabled = YES;
    [self.infoBg addSubview:temp];
    return temp;
    
}
-(void)actionTap:(UITapGestureRecognizer *)sender;
{
    
    if( [self showAlertLock]){
        return;
    }
    
    
    TableImageViewCell *cell = self;
    NSMutableArray* browserDataArr=[[NSMutableArray alloc]init];
    NSMutableArray*  imagesArr =cell.datavo.images;
    
    
    for(int i=0;i<imagesArr.count;i++){
        YBImageBrowseCellData *data = [YBImageBrowseCellData new];
        data.url =     [NSURL URLWithString:imagesArr[i]];
        data.sourceObject= [cell valueForKey:[NSString stringWithFormat:@"img0%d",i]];
        [browserDataArr addObject:data];
    }
    
    
    YBImageBrowser *browser = [YBImageBrowser new];
    browser.dataSourceArray = browserDataArr;
    browser.currentIndex = sender.view.tag-100;
    [browser show];
 
}
 
- (void)setCellData:(DynamicBaseVo *)value
{
    [super setCellData:value];
    NSArray<NSString*>*  minis =  self.datavo.miniimages;
    
    if( self.datavo.tabelVo.is_lock){
        
    }
    for (int i=0; i<minis.count; i++) {
        NSString* keystr=[NSString stringWithFormat:@"img0%d",i];
        UIImageViewLock *lockView=[self valueForKey:keystr];
        lockView.lock=YES;
        [self imgLockLoadByUrl:minis[i]  imgView:lockView blurum:3];
    }
    
    
}
- (void)layoutSubviews;
{
    [super layoutSubviews];
    if(self.datavo){
        for (int i=0; i<4; i++) {
            UIImageViewLock *cellImg=[self valueForKey:[NSString stringWithFormat:@"img0%d",i]];
            cellImg.frame=CGRectMake(i%2*100, i/2*100, 89, 89);
            
            if(i>=self.datavo.miniimages.count){
                cellImg.hidden=YES;
            }else{
                cellImg.hidden=NO;
                if(self.datavo.tabelVo.is_lock>0){
                    [cellImg setLock:YES];
                }else{
                    [cellImg setLock:NO];
                }
                
                if(self.datavo.miniimages.count==1){
                    cellImg.frame=CGRectMake(0, 0, 139, 139);
                }
            }
   
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
