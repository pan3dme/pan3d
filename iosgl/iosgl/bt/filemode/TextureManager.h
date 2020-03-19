//
//  TextureManager.h
//  iosgl
//
//  Created by zhao on 14/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "GL_Header.h"
#import "DynamicTexListVo.h"
#import "TextureRes.h"
NS_ASSUME_NONNULL_BEGIN

@interface TextureManager : NSObject
+ (instancetype)default;

-(void)getTexture:(NSString*)url fun:(void (^)(TextureRes*))fun;
-(void)getTexture:(NSString*)url fun:(void (^)(TextureRes*,DynamicTexListVo*))fun texListVo:(DynamicTexListVo*)texListVo;
@end

NS_ASSUME_NONNULL_END
