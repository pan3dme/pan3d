//
//  LoadInfo.h
//  iosgl
//
//  Created by zhao on 9/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "GL_Header.h"
NS_ASSUME_NONNULL_BEGIN
 
@interface LoadInfo : NSObject
@property (nonatomic, assign) NSInteger  type;
@property (nonatomic, strong) NSString*  url;
@property (nonatomic, assign) NSDictionary*  info;
@property (nonatomic, strong) ProceeseBlock  progressFun;
@property (nonatomic, strong) SuccessMaterial  fun;
@property (nonatomic, strong) SuccessMaterialInfo  funinfo;


- (instancetype)initUrl:(NSString*)url type:(int)type fun:(SuccessBlock)fun info:(NSDictionary*)info progressFun:(ProceeseBlock)progressFun;
@end

NS_ASSUME_NONNULL_END
