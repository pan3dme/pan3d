//
//  DynamicModel.h
//  动态
//
//  Created by zhao on 18/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "UserInfoVo.h"
#import "Header.h"
#import "UpImageVo.h"
#import "NetHttpsManager.h"

NS_ASSUME_NONNULL_BEGIN

@interface DynamicModel : NSObject
+ (instancetype)default;
@property(nonatomic,strong)UserInfoVo*   selfUserInfoVo;
@property(nonatomic,strong)NSString* rootUrl;
-(void)userImport:(SuccessBlock)PostSuccess;
 
-(void)GetDynamicSelfBlog:(NSString*)url paramDict:(NSMutableDictionary*)paramDict   PostSuccess:(SuccessBlock)PostSuccess ;
-(void)GetDynamicByValue:(NSString*)url paramDict:(NSMutableDictionary*)paramDict   PostSuccess:(SuccessBlock)PostSuccess ;
-(void)basePostToUrl:(NSString*)url paramDict:(NSMutableDictionary*)paramDict   PostSuccess:(SuccessBlock)PostSuccess ;
-(void)imagePickerController:(UIImagePickerController *)picker didFinishPickingMediaWithInfo:(NSDictionary *)info bfun:(void (^)(NSString* url ))bfun progressfun:(ProgressUpLoad)progressfun ;
-(BOOL)heartByKey:(NSString*)key ;
-(void)setHdeartByKey:(NSString*)key num:(NSNumber*)num ;

@end

NS_ASSUME_NONNULL_END
