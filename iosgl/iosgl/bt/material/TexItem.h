//
//  TexItem.h
//  iosgl
//
//  Created by zhao on 9/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "TextureRes.h"
NS_ASSUME_NONNULL_BEGIN

@interface TexItem : NSObject
 
@property (nonatomic, assign)  int   id;
@property (nonatomic, strong)  NSString*   url;
@property (nonatomic, assign)  TextureRes*   textureRes;
@property (nonatomic, assign)  BOOL   isDynamic;
@property (nonatomic, strong)  NSString*   paramName;
@property (nonatomic, assign)  BOOL   isParticleColor;
@property (nonatomic, assign)  BOOL   isMain;
@property (nonatomic, assign)  float   type;
@property (nonatomic, assign)  GLchar    name;
@property (nonatomic, assign)  float   wrap;
@property (nonatomic, assign)  float   filter;
@property (nonatomic, assign)  float   mipmap;

@end

NS_ASSUME_NONNULL_END
