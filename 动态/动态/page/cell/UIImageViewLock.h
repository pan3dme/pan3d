//
//  UIImageViewLock.h
//  动态
//
//  Created by zhao on 1/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface UIImageViewLock : UIImageView
@property(nonatomic,strong)UIImageView  * lockimg;
-(void)setLock:(BOOL)value;
-(BOOL)lock;
@end

NS_ASSUME_NONNULL_END
