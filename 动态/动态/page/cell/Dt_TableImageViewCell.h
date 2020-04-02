//
//  TableImageViewCell.h
//  动态
//
//  Created by zhao on 16/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Dt_DynamicBaseCell.h"
#import "DynamicBaseVo.h"

NS_ASSUME_NONNULL_BEGIN



@interface Dt_TableImageViewCell : Dt_DynamicBaseCell
@property(nonatomic,strong)Dt_UIImageViewLock * img00;
@property(nonatomic,strong)Dt_UIImageViewLock * img01;
@property(nonatomic,strong)Dt_UIImageViewLock * img02;
@property(nonatomic,strong)Dt_UIImageViewLock * img03;
+(NSString*)CELL_STR;
+(Dt_TableImageViewCell *)makeViewCell:(UITableView*)tableView    dataVo:(DynamicBaseVo*)dataVo;
@end

NS_ASSUME_NONNULL_END
