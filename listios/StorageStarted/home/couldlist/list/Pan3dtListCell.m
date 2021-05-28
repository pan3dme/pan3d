//
//  ProductListCell.m
//  StorageStarted
//
//  Created by XiaoXu on 2018/7/23.
//  Copyright © 2018年 cuiyiran. All rights reserved.
//

#import "Pan3dListCell.h"
#import "Scene_data.h"
#import <AVOSCloud/AVOSCloud.h>
#import <SDWebImage/UIImageView+WebCache.h>



@interface Pan3dListCell()
 
@property (weak, nonatomic) IBOutlet UILabel *titleLabel;
@property (weak, nonatomic) IBOutlet UILabel *txtLabel;
@property (weak, nonatomic) IBOutlet UILabel *timeLabel;
@property (weak, nonatomic) IBOutlet UIImageView *productImage000;
@property (weak, nonatomic) IBOutlet UIImageView *productImage001;
@property (weak, nonatomic) IBOutlet UIImageView *productImage002;
@property (weak, nonatomic) IBOutlet UIView *imgbgbox;
@end

@implementation Pan3dListCell

- (void)awakeFromNib {
    [super awakeFromNib];
    _imgbgbox.backgroundColor= [UIColor clearColor];
    
    UITapGestureRecognizer * tapGesture = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(event:)];
    
    [tapGesture setNumberOfTapsRequired:1];
    
     [_imgbgbox addGestureRecognizer:tapGesture];
}

+ (instancetype)cellWithTableView:(UITableView *)tableView{
    static NSString * ProductListCellID = @"Pan3dListCell";
    Pan3dListCell *cell = [tableView dequeueReusableCellWithIdentifier:ProductListCellID];
    if(!cell){
        cell = [[[NSBundle mainBundle] loadNibNamed:@"Pan3dListCell" owner:nil options:nil] firstObject];
    }
    cell.selectionStyle = UITableViewCellSelectionStyleNone;
    tableView.separatorStyle =UITableViewCellSeparatorStyleNone;
    
     

    return cell;
}

-(void)setPan3dListVo:(Pan3dListVo *)product{
    _pan3dListVo = product;
    self.titleLabel.text = product.title;
    self.txtLabel.text = product.text;
 
    NSDateFormatter *dateFmt2 = [[NSDateFormatter alloc]init];
    dateFmt2.dateFormat = @"yyyy年MM年dd日";
    self.timeLabel.text =[dateFmt2 stringFromDate:(NSDate*)product.createdAt] ;
    
  
    
    [self loadImageByInfoimgBase:_productImage000 arr:product.images  idx:0];
    [self loadImageByInfoimgBase:_productImage001 arr:product.images  idx:1];
    [self loadImageByInfoimgBase:_productImage002 arr:product.images  idx:2];
 
    
    
    
}
-(void)loadImageByInfoimgBase:(UIImageView*)img arr:(NSArray*)arr idx:(int)idx
{
   
    if( arr.count>idx){
        NSString* baseUrl=[arr objectAtIndex:idx];
        NSString* url=    [NSString stringWithFormat:@"%@%@", @"https://webpan.oss-cn-shanghai.aliyuncs.com/pan/leancloud/",baseUrl];;
        [img sd_setImageWithURL:[NSURL URLWithString:url]   placeholderImage:[UIImage imageNamed:@"downloadFailed"]];
        [img setHidden:NO];
    }else{
        img.image=[UIImage imageNamed:@""];
        [img setHidden:YES];
    }
}

-(void)loadImageByInfoimg:(UIImageView*)img avFile:(AVFile*)avFile
{
    if(avFile){
        NSString* url=    [avFile.url stringByReplacingOccurrencesOfString:@"http" withString:@"https"];
        [img sd_setImageWithURL:[NSURL URLWithString:url]   placeholderImage:[UIImage imageNamed:@"downloadFailed"]];
        [img setHidden:NO];
    }else{
        img.image=[UIImage imageNamed:@""];
        [img setHidden:YES];
    }
}

- (IBAction)clikEditButton
{
    [self.delegate editByCell:self.pan3dListVo];
}
-(void)event:(UITapGestureRecognizer *)gesture
{
    [self.delegate selectByCell:self.pan3dListVo];
}
@end
