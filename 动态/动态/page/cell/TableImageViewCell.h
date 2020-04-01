//
//  TableImageViewCell.h
//  动态
//
//  Created by zhao on 16/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "DynamicBaseCell.h"
#import "DynamicBaseVo.h"

NS_ASSUME_NONNULL_BEGIN



@interface TableImageViewCell : DynamicBaseCell
@property(nonatomic,strong)UIImageViewLock * img00;
@property(nonatomic,strong)UIImageViewLock * img01;
@property(nonatomic,strong)UIImageViewLock * img02;
@property(nonatomic,strong)UIImageViewLock * img03;
+(NSString*)CELL_STR;
+(TableImageViewCell *)makeViewCell:(UITableView*)tableView    dataVo:(DynamicBaseVo*)dataVo;
@end

NS_ASSUME_NONNULL_END
