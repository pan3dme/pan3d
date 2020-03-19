//
//  DynamicModel.h
//  动态
//
//  Created by zhao on 18/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "UserInfoVo.h"

NS_ASSUME_NONNULL_BEGIN

@interface DynamicModel : NSObject
+ (instancetype)default;
@property(nonatomic,strong)UserInfoVo*   selfUserInfoVo;
@property(nonatomic,strong)NSString* rootUrl;
-(void)userImport:(SuccessBlock)PostSuccess;
//-(void)listAll:(SuccessBlock)PostSuccess;
-(void)GetDynamicByValue:(NSString*)url beginId:(NSString*)beginId count:(NSString*)count PostSuccess:(SuccessBlock)PostSuccess ;
-(void)imagePickerController:(UIImagePickerController *)picker didFinishPickingMediaWithInfo:(NSDictionary *)info bfun:(void (^)(NSString* url ))bfun;
@end

NS_ASSUME_NONNULL_END
