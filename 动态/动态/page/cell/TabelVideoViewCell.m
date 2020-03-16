//
//  TabelVideoViewCell.m
//  动态
//
//  Created by zhao on 17/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "TabelVideoViewCell.h"

@implementation TabelVideoViewCell
+(NSString*)CELL_STR;
{
    return @"TabelVideoViewCell";
}
- (void)awakeFromNib {
    [super awakeFromNib];
    // Initialization code
}

- (void)setSelected:(BOOL)selected animated:(BOOL)animated {
    [super setSelected:selected animated:animated];

    // Configure the view for the selected state
}
+(TabelVideoViewCell *)makeViewCell:(UITableView*)tableView    dataVo:(DynamicBaseVo*)dataVo;
{
    TabelVideoViewCell *cell=[tableView dequeueReusableCellWithIdentifier:TabelVideoViewCell.CELL_STR];
    if(cell==nil){
        cell=[[TabelVideoViewCell alloc]initWithStyle:UITableViewCellStyleSubtitle reuseIdentifier:TabelVideoViewCell.CELL_STR];
    }
   [cell setCellData:dataVo];
    return cell;
}
@end
