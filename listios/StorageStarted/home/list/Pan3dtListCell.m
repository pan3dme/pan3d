//
//  ProductListCell.m
//  StorageStarted
//
//  Created by XiaoXu on 2018/7/23.
//  Copyright © 2018年 cuiyiran. All rights reserved.
//

#import "Pan3dListCell.h"
#import "Scene_data.h"
#import <SDWebImage/UIImageView+WebCache.h>
@interface Pan3dListCell()
@property (weak, nonatomic) IBOutlet UIImageView *avatarImageView;
@property (weak, nonatomic) IBOutlet UILabel *name;
@property (weak, nonatomic) IBOutlet UILabel *time;
@property (weak, nonatomic) IBOutlet UILabel *price;
@property (weak, nonatomic) IBOutlet UILabel *title;
@property (weak, nonatomic) IBOutlet UIImageView *productImage000;
@property (weak, nonatomic) IBOutlet UIImageView *productImage001;
@property (weak, nonatomic) IBOutlet UIImageView *productImage002;

@end

@implementation Pan3dListCell

- (void)awakeFromNib {
    [super awakeFromNib];
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
    self.name.text = product.title;
    self.time.text = product.text;
    self.price.text =@"编辑";
    self.title.text =@"--";
    
 
    NSString* url=[[Scene_data default]getWorkUrlByFilePath:[product.picitem objectAtIndex:0]];
  
    [self.avatarImageView sd_setImageWithURL:[NSURL URLWithString:url] placeholderImage:[UIImage imageNamed:@"not_logged_in"]];
 
 
  
 
//    [self setImageById:0 product:product img:self.productImage000];
    [self setImageById:1 product:product img:self.productImage001];
    [self setImageById:2 product:product img:self.productImage002];
    
    [self.productImage000 sd_setImageWithURL:[NSURL URLWithString:product.productImageUrl]
                            placeholderImage:[UIImage imageNamed:@"downloadFailed"]];
    
    
    //   "6084464c47454649c5604da0"
    
    
 
}
-(void)setImageById:(int)idx product:(Pan3dListVo *)product img:(UIImageView*)img
{
    
    if(idx<product.picitem.count){
        
       NSString* url =  [[Scene_data default]getWorkUrlByFilePath:[product.picitem objectAtIndex:idx]];
        
        [img sd_setImageWithURL:[NSURL URLWithString:url] placeholderImage:[UIImage imageNamed:@"downloadFailed"]];
    }

    
}
 
@end
