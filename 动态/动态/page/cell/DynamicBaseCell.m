//
//  DynamicBaseCell.m
//  动态
//
//  Created by zhao on 16/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "DynamicBaseCell.h"

@interface DynamicBaseCell()
@property(nonatomic,strong)UIImageView* userHeadImagView;
@property(nonatomic,strong)UILabel * usenameLabel;

@end

@implementation DynamicBaseCell
+(NSString*)CELL_STR;
{
    return  @"DynamicBaseCell";
}
- (void)awakeFromNib {
    [super awakeFromNib];
 
}

- (instancetype)initWithStyle:(UITableViewCellStyle)style reuseIdentifier:(NSString *)reuseIdentifier
{
    if (self = [super initWithStyle:style reuseIdentifier:reuseIdentifier]) {
        [self initBaseUi];
    }
    return self;
    
}
-(void)initBaseUi;
{
    self.userHeadImagView=[[UIImageView alloc]initWithFrame:CGRectMake(0, 0, 60, 60)];
    [self addSubview:self.userHeadImagView];
    
    self.usenameLabel=[[UILabel alloc]initWithFrame:CGRectMake(100, 0, 60, 60)];
    self.usenameLabel.text=@"赵佳能";
    [self addSubview:self.usenameLabel];
 
    self.userHeadImagView.image= [UIImage imageNamed:@"redbaseusehead"];
    
}
-(void)refrishUi;
{
    
}
-(void)setCellData:(DynamicBaseVo*)value;
{
    
}
- (void)setSelected:(BOOL)selected animated:(BOOL)animated {
    [super setSelected:selected animated:animated];
    
    // Configure the view for the selected state
}

@end
