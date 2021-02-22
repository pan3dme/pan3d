//
//  TestShader.h
//  iosgl
//
//  Created by pan3dme on 2021/2/22.
//  Copyright © 2021 zhao. All rights reserved.
//

#import "Shader3D.h"

#ifdef __METAL_VERSION__
#define NS_ENUM(_type, _name) enum _name : _type _name; enum _name : _type
#define NSInteger metal::int32_t
#else
#import <Foundation/Foundation.h>
#endif

#include <simd/simd.h>


NS_ASSUME_NONNULL_BEGIN

@interface TestShader : Shader3D

@end

NS_ASSUME_NONNULL_END
