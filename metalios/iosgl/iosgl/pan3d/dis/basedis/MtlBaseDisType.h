//
//  MtlBaseLineType.h
//  iosgl
//
//  Created by pan3dme on 2021/1/24.
//  Copyright © 2021 zhao. All rights reserved.
//

#ifndef MtlBaseLineType_h
#define MtlBaseLineType_h

#ifdef __METAL_VERSION__
#define NS_ENUM(_type, _name) enum _name : _type _name; enum _name : _type
#define NSInteger metal::int32_t
#else
#import <Foundation/Foundation.h>
#endif

#include <simd/simd.h>

 
typedef struct
{
vector_float3 position;
} VertexbaseFloat3;

typedef struct
{
    matrix_float4x4 matrix;
} MaterialBaseMatrix;


//typedef struct
//{
//   matrix_float4x4 projectionMatrix;
//   matrix_float4x4 modelViewMatrix;
//} DisMatrixView;

#endif /* MtlBaseLineType_h */
