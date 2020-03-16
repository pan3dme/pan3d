//
//  Header.h
//  动态
//
//  Created by zhao on 16/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#ifndef Header_h
#define Header_h
#include "UIButton+XBZKeyBoard.h"
#include "UIView+XBZKeyBoard.h"
#include "UIColor+XBZKeyBoard.h"
#include "UIImage+XBZKeyBoard.h"
#include "UIScrollView+XBZKeyBoard.h"
#include "NSString+XBZKeyBoard.h"
 


// 屏幕frame,bounds,size,scale
#define kScreenFrame            [UIScreen mainScreen].bounds
#define kScreenBounds           [UIScreen mainScreen].bounds
#define kScreenSize             [UIScreen mainScreen].bounds.size
#define kScreenScale            [UIScreen mainScreen].scale
#define kScreenW                [[UIScreen mainScreen] bounds].size.width
#define kScreenH                [[UIScreen mainScreen] bounds].size.height
#define kScaleW                 (kScreenW)*(kScreenScale)
#define kScaleH                 (kScreenH)*(kScreenScale)

#define kScaleWidth             [[UIScreen mainScreen] bounds].size.width/375.00
#define kScaleHeight            [[UIScreen mainScreen] bounds].size.height/667.00


#endif /* Header_h */
