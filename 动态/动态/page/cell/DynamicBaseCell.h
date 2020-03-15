//
//  DynamicBaseCell.h
//  动态
//
//  Created by zhao on 16/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "DynamicBaseVo.h"

NS_ASSUME_NONNULL_BEGIN

@protocol DynamicBaseCellDelegate<NSObject>
-(void) selectUseHead :(DynamicBaseVo*)value ;
@end

@interface DynamicBaseCell : UITableViewCell
+(NSString*)CELL_STR;
@property(assign,nonatomic) id<DynamicBaseCellDelegate>delegate;
@property(nonatomic,strong)DynamicBaseVo * datavo;
-(void)initBaseUi;
-(void)refrishUi;
-(void)setCellData:(DynamicBaseVo*)value;

@end

NS_ASSUME_NONNULL_END
