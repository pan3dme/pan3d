//
//  DynamicModel.h
//  动态
//
//  Created by zhao on 18/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "Dt_UserInfoVo.h"
#import "Header.h"
#import "Dt_UpImageVo.h"
#import "NetHttpsManager.h"

NS_ASSUME_NONNULL_BEGIN

@interface Dt_DynamicModel : NSObject
+ (instancetype)default;
@property(nonatomic,strong)Dt_UserInfoVo*   selfUserInfoVo;
@property(nonatomic,strong)NSString* rootUrl;
-(void)userImport:(SuccessBlock)PostSuccess;
 
-(void)GetDynamicSelfBlog:(NSString*)url paramDict:(NSDictionary*)paramDict   PostSuccess:(SuccessBlock)PostSuccess ;
-(void)GetDynamicByValue:(NSString*)url paramDict:(NSDictionary*)paramDict   PostSuccess:(SuccessBlock)PostSuccess ;
-(void)basePostToUrl:(NSString*)url paramDict:(NSDictionary*)paramDict   PostSuccess:(SuccessBlock)PostSuccess ;
-(void)imagePickerController:(UIImagePickerController *)picker didFinishPickingMediaWithInfo:(NSDictionary *)info bfun:(void (^)(NSString* url ))bfun progressfun:(ProgressUpLoad)progressfun ;
-(int)heartByKey:(NSString*)key ;
-(void)setHdeartByKey:(NSString*)key num:(NSNumber*)num ;

-(BOOL)isfollowByUserName:(NSString*)userName ;
-(void)addFollowByUserId:(NSString*)userName data:(BOOL)data ;

-(NSString*)getTimeStr:(double)time;
 
@end

NS_ASSUME_NONNULL_END
