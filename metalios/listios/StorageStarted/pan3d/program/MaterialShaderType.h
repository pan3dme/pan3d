//
//  MaterialShaderType.h
//  iosgl
//
//  Created by pan3dme on 2021/1/28.
//  Copyright © 2021 zhao. All rights reserved.
//
 

#ifndef MaterialShaderType_h
#define MaterialShaderType_h


#ifdef __METAL_VERSION__
#define NS_ENUM(_type, _name) enum _name : _type _name; enum _name : _type
#define NSInteger metal::int32_t
#else
#import <Foundation/Foundation.h>
#endif

#include <simd/simd.h>


typedef struct
{
    vector_float4 position;
    vector_float2 textureCoordinate;
} MaterialShaderVertex;

typedef struct
{
   matrix_float4x4 matrix;
} MaterialShaderMatrixView;

typedef struct
{
   matrix_float4x4 matrix;
} MaterialShaderViewMatrix;


#endif /* MaterialShaderType_h */
