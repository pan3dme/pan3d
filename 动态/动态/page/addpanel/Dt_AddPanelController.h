//
//  AddPanelController.h
//  动态
//
//  Created by zhao on 19/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "Dt_AddImgVideoCell.h"

NS_ASSUME_NONNULL_BEGIN

@interface Dt_AddPanelController : UIViewController

+ (instancetype)default;

-(void)setFristtUrl:(NSString*)url;

@property(nonatomic,strong)NSMutableArray<NSString*>*  imgItems;
@property(nonatomic,strong)UITextField*  inputTextField;
@property(nonatomic,strong)UILabel*  totalNumLabel;
@property(nonatomic,strong)UIView*  picListView;
@property(nonatomic,strong)NSMutableArray<Dt_AddImgVideoCell*>*  cellItems;

@end

NS_ASSUME_NONNULL_END
