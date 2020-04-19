//
//  TextureManager.h
//  iosgl
//
//  Created by zhao on 14/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "GL_Header.h"
#import "ResGC.h"
#import "DynamicTexListVo.h"
#import "TextureRes.h"
NS_ASSUME_NONNULL_BEGIN

@interface TextureManager : ResGC
+ (instancetype)default;
-(void)addRes:(NSString*)url img:(UIImage*)img;
-(void)getTexture:(NSString*)url fun:(void (^)(NSObject* any))fun wrapType:(int)wrapType info:(NSObject*)info filteType:(int)filteType mipmapType:(int)mipmapType;
@end

NS_ASSUME_NONNULL_END
