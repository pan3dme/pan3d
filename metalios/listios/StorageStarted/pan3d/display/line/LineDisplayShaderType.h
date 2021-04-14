//
//  LineDisplayShaderType.h
//  iosgl
//
//  Created by pan3dme on 2021/3/10.
//  Copyright © 2021 zhao. All rights reserved.
//

#ifndef LineDisplayShaderType_h
#define LineDisplayShaderType_h


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
    vector_float3 color;
 
} VertexLine1;
typedef struct
{
   matrix_float4x4 projectionMatrix;
   matrix_float4x4 modelViewMatrix;
} LineMatrixView1;

#endif /* LineDisplayShaderType_h */
