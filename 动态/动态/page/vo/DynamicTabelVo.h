//
//  DynamicTabelVo.h
//  动态
//
//  Created by zhao on 16/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface DynamicTabelVo : NSObject
@property(nonatomic,assign)NSInteger  id;
@property(nonatomic,assign)NSInteger type;
@property(nonatomic,assign)NSInteger  recommend;
@property(nonatomic,assign)NSInteger  shenghestatus;
@property(nonatomic,assign)NSInteger  recommend_begin;
@property(nonatomic,assign)NSInteger  recommend_end;
@property(nonatomic,assign)NSInteger  isHeart;
@property(nonatomic,assign)NSInteger  isfollowNum;
@property(nonatomic,assign)NSInteger  comments;


@property(nonatomic,strong)NSArray<NSString*>* images;
@property(nonatomic,strong)NSArray<NSString*>* imagesbig;

@property(nonatomic,assign)NSNumber* likes;
@property(nonatomic,assign)NSNumber* add_time;
@property(nonatomic,assign)NSNumber* delete_time;
@property(nonatomic,assign)NSNumber* timestr;
@property(nonatomic,assign)NSNumber* videowidth;
@property(nonatomic,assign)NSNumber* videoheight;


@property(nonatomic,assign)BOOL  live;
@property(nonatomic,assign)BOOL  is_lock;
@property(nonatomic,assign)BOOL  isMine;


@property(nonatomic,strong)NSString *preview_tab;
@property(nonatomic,strong)NSString *nick_name;
@property(nonatomic,strong)NSString *videourl;
@property(nonatomic,strong)NSString *posterurl;
@property(nonatomic,strong)NSString *posterurlPlay;;
@property(nonatomic,strong)NSString *username;
@property(nonatomic,strong)NSString * header;
@property(nonatomic,strong)NSString *content;


@end

NS_ASSUME_NONNULL_END
