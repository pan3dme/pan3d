//
//  AddImgVideoCell.h
//  动态
//
//  Created by zhao on 19/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@protocol AddImgVideoCellDelegate<NSObject>
-(void) clikAddNextUrlEvet ;
@end
@interface AddImgVideoCell : UIView
@property(assign,nonatomic) id<AddImgVideoCellDelegate>delegate;
-(void)setImageUrl:(NSString*)url;
@end

NS_ASSUME_NONNULL_END
