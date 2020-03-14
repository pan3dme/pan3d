//
//  TextureLoad.h
//  iosgl
//
//  Created by zhao on 15/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "GL_Header.h"

NS_ASSUME_NONNULL_BEGIN

@interface TextureLoad : NSObject
@property (nonatomic, strong)  SuccessMaterial fun;
@property (nonatomic, strong)  SuccessMaterialInfo funinfo;
@property (nonatomic, strong)  NSObject*  info;
@property (nonatomic, strong)  NSString*  url;
@property (nonatomic, assign)  int  wrap;
@property (nonatomic, assign)  int  filter;
@property (nonatomic, assign)  int  mipmap;

@end

NS_ASSUME_NONNULL_END
