//
//  DynamicTabelVo.h
//  动态
//
//  Created by zhao on 16/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "TabelBaseNSObject.h"

NS_ASSUME_NONNULL_BEGIN

@interface DynamicTabelVo : TabelBaseNSObject

@property(nonatomic,assign)NSInteger  id;
@property(nonatomic,assign)NSInteger  recommend_end;
@property(nonatomic,assign)NSInteger  status;
@property(nonatomic,assign)NSInteger  user_level;
@property(nonatomic,assign)NSMutableArray*  lock_info;
@property(nonatomic,assign)NSInteger  likes;
@property(nonatomic,assign)NSInteger  recommend_begin;
@property(nonatomic,assign)NSInteger  is_ban;
@property(nonatomic,assign)NSInteger  delete_time;
@property(nonatomic,assign)NSInteger  read_time;
@property(nonatomic,assign)NSInteger  add_time;
@property(nonatomic,assign)NSInteger  is_lock;
@property(nonatomic,assign)NSInteger  recommend;
@property(nonatomic,assign)NSInteger  comments;
@property(nonatomic,assign)NSInteger  gift_total;

@property(nonatomic,assign)NSString*  content;
@property(nonatomic,assign)NSString*  username;
@property(nonatomic,assign)NSString*  nick_name;
@property(nonatomic,assign)NSString*  head;
@property(nonatomic,assign)NSString*  vidio_url;

@property(nonatomic,assign)NSString*  image1;
@property(nonatomic,assign)NSString*  image2;
@property(nonatomic,assign)NSString*  image3;
@property(nonatomic,assign)NSString*  image4;
@property(nonatomic,assign)NSString*  image5;
@property(nonatomic,assign)NSString*  image6;
@property(nonatomic,assign)NSString*  image7;
@property(nonatomic,assign)NSString*  image8;
@property(nonatomic,assign)NSString*  image9;


-(void)refrishData:(NSDictionary *)value;
@end

NS_ASSUME_NONNULL_END
