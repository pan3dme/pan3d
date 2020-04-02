//
//  AddPanelController.h
//  动态
//
//  Created by zhao on 19/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "AddImgVideoCell.h"

NS_ASSUME_NONNULL_BEGIN

@interface AddPanelController : UIViewController

+ (instancetype)default;

-(void)setFristtUrl:(NSString*)url;

@property(nonatomic,strong)NSMutableArray<NSString*>*  imgItems;
@property(nonatomic,strong)UITextField*  inputTextField;
@property(nonatomic,strong)UILabel*  totalNumLabel;
@property(nonatomic,strong)UIView*  picListView;
@property(nonatomic,strong)NSMutableArray<AddImgVideoCell*>*  cellItems;

@end

NS_ASSUME_NONNULL_END
