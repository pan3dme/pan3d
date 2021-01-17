//
//  TextureManager.h
//  base
//
//  Created by pan3dme on 2021/1/17.
//

#import "ResCount.h"
#import "Scene3D.h"

NS_ASSUME_NONNULL_BEGIN

@interface TextureManager : ResCount
- (id<MTLTexture>)setupTexture;

@end

NS_ASSUME_NONNULL_END
