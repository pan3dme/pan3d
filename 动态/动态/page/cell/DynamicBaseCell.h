//
//  DynamicBaseCell.h
//  动态
//
//  Created by zhao on 16/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "DynamicBaseVo.h"
#import "DynamicBaseCell.h"

NS_ASSUME_NONNULL_BEGIN

@protocol DynamicBaseCellDelegate<NSObject>
-(void) selectUseHead :(DynamicBaseVo*)value ;
-(void) imglistClik :(UITableViewCell*)value img:(UIImageView*)img pos:(CGPoint)pos;
@end

@interface DynamicBaseCell : UITableViewCell
@property(assign,nonatomic) id<DynamicBaseCellDelegate>delegate;
@property(nonatomic,strong)DynamicBaseVo * datavo;
@property(nonatomic,strong)UIView * infoBg;
-(void)imgLoadByUrl:(NSString*)url imgView:(UIImageView*)imgView;
-(UIImageView*)makeImageView;
-(void)initBaseUi;
-(void)refrishUi;
-(void)setCellData:(DynamicBaseVo*)value;
 
@end

NS_ASSUME_NONNULL_END
