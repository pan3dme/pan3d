//
//  UserInfoVo.h
//  动态
//
//  Created by zhao on 18/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "TabelBaseNSObject.h"

NS_ASSUME_NONNULL_BEGIN

@interface UserInfoVo : TabelBaseNSObject
/*
[0]    (null)    @"id" : (long)397
[1]    (null)    @"extra" : @""
[2]    (null)    @"parent_id" : @""
[3]    (null)    @"reg_ip" : @""
[4]    (null)    @"last_login" : (long)1584519767
[5]    (null)    @"avatar" : @"http://oss.ipigweb.com/public/attachment/201907/26/17/5d3ac6301da46.png?x-oss-process=image/resize,m_mfit,h_260,w_260"
[6]    (null)    @"token" : @"b4ab83d1d5c8f3b783fe5b36ec6d3861"
[7]    (null)    @"username" : @"29894631"
[8]    (null)    @"nickname" : @"哈哈level"
[9]    (null)    @"create_time" : (long)1584519767
[10]    (null)    @"update_time" : (long)1584520912
[11]    (null)    @"extra_blog" : 4 key/value pairs
*/
@property(nonatomic,assign)NSInteger  id;
//@property(nonatomic,strong)NSString*   extra;
//@property(nonatomic,strong)NSString*   parent_id;
//@property(nonatomic,strong)NSString*   reg_ip;
//@property(nonatomic,strong)NSString*   last_login;
//@property(nonatomic,strong)NSString*  avatar;
@property(nonatomic,strong)NSString*   token;
@property(nonatomic,strong)NSString*   username;
@property(nonatomic,strong)NSString*   nickname;
//@property(nonatomic,assign)NSInteger  create_time;
//@property(nonatomic,assign)NSInteger  update_time;
//@property(nonatomic,assign)NSInteger  extra_blog;
 

-(void)refrishData:(NSDictionary *)value;
@end

NS_ASSUME_NONNULL_END
