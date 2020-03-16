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
 
typedef void (^SuccessBlock)(NSDictionary *responseJson);
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
/*
 static PLATFORM_GAME_USER_IMPORT = '/user/import';
 //添加动态
 static PLATFORM_GAME_BLOG_ADD = '/blog/add';
 //删除内容
 static PLATFORM_GAME_BLOG_DELETE = '/blog/delete';
 //查看某人动态 我的或者别人的
 static PLATFORM_GAME_BLOG_SELF = '/blog/list_self';
 //增加评论
 static PLATFORM_GAME_BLOG_COMMENTS = '/blog/add_comments';
 //点赞
 static PLATFORM_GAME_BLOG_ADD_LIKES = '/blog/add_likes';
 //获取某条动态评论信息
 static PLATFORM_GAME_BLOG_GET_COMMENTS = '/blog/get_comments';
 //获取全部动态 begin_id=1从第几条开始 count=10要多少条
 static PLATFORM_GAME_BLOG_LIST_ALL = '/blog/list_all';
 //获取关注动态
 static PLATFORM_GAME_BLOG_LIST_FOLLOWS = '/blog/list_follows';
 //获取推荐动态
 static PLATFORM_GAME_BLOG_LIST_TUIJIAN = '/blog/list_tuijian';

 //更新关注列表
 static PLATFORM_USER_FOLLOWS = '/user/update_follows';
 //获取分享URL
 static PLATFORM_BLOG_SHARE_URL = '/blog/get_blog_share_url';
 //获取广告
 static PLATFORM_BLOG_GET_LIST = '/blog/get_ad_list';
 //解锁
 static PLATFORM_BLOG_UNLOCK_BLOG = '/blog/unlock_blog';
 //获取消息
 static PLATFORM_BLOG_GET_BLOG_REMIND = '/blog/get_blog_remind';
 //获取单独动态
 static PLATFORM_BLOG_GET_TEMP_BLOG = '/blog/get_blog';
 //游戏配置
 static PLATFORM_BLOG_GET_CONFIG_LIST = '/blog/config_list';
 */
