//
//  DynamicBaseCell.h
//  动态
//
//  Created by zhao on 16/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "Dt_DynamicBaseVo.h"
#import "Dt_UIImageViewLock.h"
#import "Dt_DynamicBaseCell.h"

NS_ASSUME_NONNULL_BEGIN

@protocol DynamicBaseCellDelegate<NSObject>
-(void) selectUseHead :(Dt_DynamicBaseVo*)value ;
-(void) clikOpenMsgPanel :(Dt_DynamicBaseVo*)value ;
-(void) deleSelectCell :(Dt_DynamicBaseVo*)value ;
-(void) listReloadData ;
-(void) imglistClik :(UITableViewCell*)value idx:(NSInteger)idx;
@end


@interface Dt_DynamicBaseCell : UITableViewCell
@property(assign,nonatomic) id<DynamicBaseCellDelegate>delegate;
@property(nonatomic,strong)Dt_DynamicBaseVo * datavo;
@property(nonatomic,strong)UIView * infoBg;
-(void)imgLoadByUrl:(NSString*)url imgView:(UIImageView*)imgView;
-(void)imgLockLoadByUrl:(NSString*)url imgView:(UIImageView*)imgView blurum:(CGFloat)blurum;
-(UIImageView*)makeImageView;
-(Dt_UIImageViewLock*)makeImageLockView;
-(void)initBaseUi;
-(void)refrishUi;
-(void)setCellData:(Dt_DynamicBaseVo*)value;
-(BOOL)showAlertLock;
 
@end

NS_ASSUME_NONNULL_END
