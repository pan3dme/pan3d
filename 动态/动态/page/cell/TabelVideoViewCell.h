//
//  TabelVideoViewCell.h
//  动态
//
//  Created by zhao on 17/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "DynamicBaseCell.h"

NS_ASSUME_NONNULL_BEGIN

@interface TabelVideoViewCell : DynamicBaseCell
+(NSString*)CELL_STR;
+(TabelVideoViewCell *)makeViewCell:(UITableView*)tableView    dataVo:(DynamicBaseVo*)dataVo;
@end

NS_ASSUME_NONNULL_END
