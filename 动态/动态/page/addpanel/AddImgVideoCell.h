//
//  AddImgVideoCell.h
//  动态
//
//  Created by zhao on 19/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "AddVideoView.h"

NS_ASSUME_NONNULL_BEGIN

@protocol AddImgVideoCellDelegate<NSObject>

-(void) clikAddNextUrlEvet ;
-(void) clearFileByUrl:(NSString*)url ;

@end

@interface AddImgVideoCell : UIView

@property(assign,nonatomic) id<AddImgVideoCellDelegate>delegate;
-(void)setImageUrl:(NSString*)url;
-(void)progressToCellLabel:(float)num;
@property (nonatomic,strong)UIImageView* picImage;
@property (nonatomic,strong)UIImageView* camIcamBut;
@property (nonatomic,strong)UIButton* closeXbut;
@property (nonatomic,strong)UILabel* progressLabel;
@property (nonatomic,strong)NSString* soureUrl;

@property (nonatomic,strong)AddVideoView* addVideoView;

 

@end

NS_ASSUME_NONNULL_END
