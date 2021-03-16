#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@class Weibo;

@interface WeiboFrameVo : NSObject

/*
 *  数据模型提供所需要的子控件的内容，数据;frame模型计算,保存每个子控件的frame和cell行高
 */

/*
 *  1.数据模型
 */
//        [self setValuesForKeysWithDictionary:dict];
 


@property (nonatomic, copy) NSString *text;         // 内容
@property (nonatomic, copy) NSString *icon;         // 头像图片名称
@property (nonatomic, copy) NSString *name;         // 昵称图片名称
@property (nonatomic, copy) NSString *picture;      // 配图图片名称
@property (nonatomic, copy) NSString *age;      // 配图图片名称
@property (nonatomic, assign) BOOL vip;             // 判断用户是不是Vip

/*
 *  2.frame模型
 */

//头像的frame
@property (nonatomic, assign) CGRect iconF;
//昵称的frame
@property (nonatomic, assign) CGRect nameF;
//vip的frame
@property (nonatomic, assign) CGRect vipF;
//正文的frame
@property (nonatomic, assign) CGRect introF;
//配图的frame
@property (nonatomic, assign) CGRect pictrueF;
//行高
@property (nonatomic, assign) CGFloat cellHeight;

- (void)setWeiboInfo;

@end
