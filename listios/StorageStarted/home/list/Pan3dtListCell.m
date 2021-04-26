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
    
 
 
  
 
 

   
    
//    [self.productImage000 sd_setImageWithURL:[NSURL URLWithString:product.productImageUrl]
//                            placeholderImage:[UIImage imageNamed:@"downloadFailed"]];
    
 
    
    [self loadImageByInfoimg:self.avatarImageView idx:0];
    [self loadImageByInfoimg:self.productImage000 idx:0];
//    [self loadImageByInfoimg:self.productImage001 idx:0];
//    [self loadImageByInfoimg:self.productImage002 idx:0];
    
 
}
-(void)loadImageByInfoimg:(UIImageView*)img idx:(int)idx
{
    AVFile* object = [_product.images objectAtIndex:idx];
    AVQuery *query = [AVQuery queryWithClassName:@"_File"];
    [query whereKey:@"objectId" equalTo:object.objectId];
    [query getFirstObjectInBackgroundWithBlock:^(AVObject *todo, NSError *error) {
        NSString* url=    [todo objectForKey:@"url"];
        url=  [url stringByReplacingOccurrencesOfString:@"http" withString:@"https"];
        [img sd_setImageWithURL:[NSURL URLWithString:url] placeholderImage:[UIImage imageNamed:@"downloadFailed"]];
    }];
    
}
//-(void)setImageById:(int)idx product:(Pan3dListVo *)product img:(UIImageView*)img
//{
//
//    if(idx<product.picitem.count){
//
//       NSString* url =  [[Scene_data default]getWorkUrlByFilePath:[product.picitem objectAtIndex:idx]];
//
//        [img sd_setImageWithURL:[NSURL URLWithString:url] placeholderImage:[UIImage imageNamed:@"downloadFailed"]];
//    }
//
//
//}
 
@end
