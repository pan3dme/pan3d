//
//  RotationSahderType.h
//  base
//
//  Created by pan3dme on 2021/1/17.
//

#ifndef RotationSahderType_h
#define RotationSahderType_h

#ifdef __METAL_VERSION__
#define NS_ENUM(_type, _name) enum _name : _type _name; enum _name : _type
#define NSInteger metal::int32_t
#else
#import <Foundation/Foundation.h>
#endif

#include <simd/simd.h>

 

#endif /* RotationSahderType_h */
