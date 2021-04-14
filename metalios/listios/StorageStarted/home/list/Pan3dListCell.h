//
//  ProductListCell.h
//  StorageStarted
//
//  Created by XiaoXu on 2018/7/23.
//  Copyright © 2018年 cuiyiran. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "Pan3dListVo.h"
@interface Pan3dListCell : UITableViewCell

+ (instancetype)cellWithTableView:(UITableView *)tableView;

@property (nonatomic,strong) Pan3dListVo  * product;

@end
