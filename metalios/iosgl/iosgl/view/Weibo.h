//
//  Weibo.h
//  iosgl
//
//  Created by pan3dme on 2021/3/14.
//  Copyright © 2021 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface Weibo : NSObject
@property (nonatomic, copy) NSString *text;         // 内容
@property (nonatomic, copy) NSString *icon;         // 头像图片名称
@property (nonatomic, copy) NSString *name;         // 昵称图片名称
@property (nonatomic, copy) NSString *picture;      // 配图图片名称
@property (nonatomic, assign) BOOL vip;             // 判断用户是不是Vip

-(id)initWithDict:(NSDictionary *)dict;
+(id)weiboWithDict:(NSDictionary *)dict;
@end

NS_ASSUME_NONNULL_END
