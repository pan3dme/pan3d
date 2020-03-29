//
//  LoadManager.h
//  iosgl
//
//  Created by zhao on 9/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "GL_Header.h"

 
typedef NS_ENUM(NSInteger, LOAD_MANAGER_TYPE)
{
       BYTE_TYPE   =0,
       IMG_TYPE  =1,
       XML_TYPE =2
};
 
NS_ASSUME_NONNULL_BEGIN
 
@interface LoadManager : NSObject
<NSURLConnectionDataDelegate>
+ (instancetype)default;
-(void)loadUrl:(NSString*)url type:(int)type fun:(SuccessBlock)fun;
-(void)loadUrl:(NSString*)url type:(int)type fun:(SuccessBlock)fun info:(NSDictionary*)info progressFun:(ProceeseBlock)progressFun;
// public load($url: string, $type: string, $fun: Function, $info: any = null, $progressFun: Function = null): void {
-(void)load:(NSString*)url type:(int)type fun:(void (^)(NSObject* any))fun info:(NSObject*)info progressFun:(ProceeseBlock)progressFun;
-(void)loadWaitList;
@end

NS_ASSUME_NONNULL_END
