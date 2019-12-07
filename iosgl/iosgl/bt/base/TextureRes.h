//
//  TextureRes.h
//  iosgl
//
//  Created by zhao on 8/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//
#import <GLKit/GLKit.h>
#import "ResCount.h"

NS_ASSUME_NONNULL_BEGIN

@interface TextureRes : ResCount
@property (nonatomic,copy) GLKTextureInfo *texture;
@end

NS_ASSUME_NONNULL_END
