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
#import "ColorHeader.h"
 

typedef void (^FailureBlock)(NSError *error);

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
 

static NSString * const PLATFORM_GAME_USER_IMPORT                          = @"/user/import";
static NSString * const PLATFORM_GAME_BLOG_LIST_ALL                          = @"/blog/list_all";
static NSString * const PLATFORM_GAME_BLOG_LIST_FOLLOWS                          = @"/blog/list_follows";
static NSString * const PLATFORM_GAME_BLOG_LIST_TUIJIAN                          = @"/blog/list_tuijian";
static NSString * const PLATFORM_GAME_BLOG_SELF                          = @"/blog/list_self";
static NSString * const PLATFORM_GAME_BLOG_ADD                          = @"/blog/add";

static NSString * const PLATFORM_GAME_BLOG_DELETE                          = @"/blog/delete";
static NSString * const PLATFORM_GAME_BLOG_COMMENTS                          = @"/blog/add_comments";
static NSString * const PLATFORM_GAME_BLOG_ADD_LIKES                          = @"/blog/add_likes";
 
static NSString * const PLATFORM_USER_FOLLOWS                          = @"/user/update_follows";
static NSString * const PLATFORM_GAME_BLOG_GET_COMMENTS                          = @"/blog/get_comments";

static NSString * const PLATFORM_BLOG_UNLOCK_BLOG                          = @"/blog/unlock_blog";

  
