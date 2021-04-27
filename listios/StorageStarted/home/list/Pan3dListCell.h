//
//  ProductListCell.h
//  StorageStarted
//
//  Created by XiaoXu on 2018/7/23.
//  Copyright © 2018年 cuiyiran. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "Pan3dListVo.h"

@protocol Pan3dListCellDelegate <NSObject>
- (void)deleByCell:(Pan3dListVo *)val;
- (void)editByCell:(Pan3dListVo *)val;
 
@end


@interface Pan3dListCell : UITableViewCell

+ (instancetype)cellWithTableView:(UITableView *)tableView;

@property (assign, nonatomic) id<Pan3dListCellDelegate> delegate;
@property (nonatomic,strong) Pan3dListVo  * product;

@end
