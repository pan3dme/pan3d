//
//  LoadInfo.h
//  iosgl
//
//  Created by zhao on 9/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN
/*
public url: string;

   public type: string;

   public fun: Function;

   public info: any;

   public progressFun: Function;
*/
@interface LoadInfo : NSObject
@property (nonatomic, assign) NSInteger  type;
@property (nonatomic, strong) NSString*  url;
@property (nonatomic, assign) NSDictionary*  info;
@property (nonatomic, strong) NSObject*  progressFun;
@end

NS_ASSUME_NONNULL_END
