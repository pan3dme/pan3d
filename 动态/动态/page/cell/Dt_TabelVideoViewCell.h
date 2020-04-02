//
//  TabelVideoViewCell.h
//  动态
//
//  Created by zhao on 17/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Dt_DynamicBaseCell.h"

NS_ASSUME_NONNULL_BEGIN

@interface Dt_TabelVideoViewCell : Dt_DynamicBaseCell
+(NSString*)CELL_STR;
+(Dt_TabelVideoViewCell *)makeViewCell:(UITableView*)tableView    dataVo:(DynamicBaseVo*)dataVo;
@end

NS_ASSUME_NONNULL_END
