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
@property (weak, nonatomic) IBOutlet UIImageView *avatarImageView;
@property (weak, nonatomic) IBOutlet UILabel *titleLabel;
@property (weak, nonatomic) IBOutlet UILabel *txtLabel;
@property (weak, nonatomic) IBOutlet UILabel *timeLabel;
@property (weak, nonatomic) IBOutlet UIImageView *productImage000;
@property (weak, nonatomic) IBOutlet UIImageView *productImage001;
@property (weak, nonatomic) IBOutlet UIImageView *productImage002;
@property (weak, nonatomic) IBOutlet UIButton *deleBut;
@property (weak, nonatomic) IBOutlet UIButton *editBut;
@property (weak, nonatomic) IBOutlet UIView *imgbgbox;
@end

@implementation Pan3dListCell

- (void)awakeFromNib {
    [super awakeFromNib];
    self.imgbgbox.backgroundColor= [UIColor clearColor];
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

-(void)setProduct:(Pan3dListVo *)product{
    _product = product;
    self.titleLabel.text = product.title;
    self.txtLabel.text = product.text;
    self.timeLabel.text =@"2021-4-25";
 
   
    [self loadImageByInfoimg:self.avatarImageView avFile:product.avFile0];
    [self loadImageByInfoimg:self.productImage000 avFile:product.avFile0];
    [self loadImageByInfoimg:self.productImage001 avFile:product.avFile1];
    [self loadImageByInfoimg:self.productImage002 avFile:product.avFile2];
    
 
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
- (IBAction)clickDeleButton
{
    [self.delegate deleByCell:self.product];
}
- (IBAction)clikEditButton
{
    [self.delegate editByCell:self.product];
}
 
@end
