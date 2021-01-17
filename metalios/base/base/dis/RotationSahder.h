 


//
//  ShaderTypes.h
//  UniformBuffer
//
//  Created by Xinhou Jiang on 2020/3/17.
//  Copyright © 2020 Xinhou Jiang. All rights reserved.
//

//
//  Header containing types and enum constants shared between Metal shaders and Swift/ObjC source
//
#ifndef RotationSahder_h
#define RotationSahder_h

#ifdef __METAL_VERSION__
#define NS_ENUM(_type, _name) enum _name : _type _name; enum _name : _type
#define NSInteger metal::int32_t
#else
#import <Foundation/Foundation.h>
#endif

#include <simd/simd.h>
 

typedef struct
{
    matrix_float4x4 projectionMatrix;
    matrix_float4x4 modelViewMatrix;
} RotationMatrix;

typedef struct
{
    vector_float4 position;
    vector_float3 color;
    vector_float2 textureCoordinate;
} RotationVertex;
 
typedef enum RotationVertexInputIndex
{
    RotationVertexInputIndexVertices_0     = 0,
    RotationVertexInputIndexMatrix_1       = 1,
} RotationVertexInputIndex;
typedef enum RotationFragmentInputIndex
{
    RotationFragmentInputIndexTexture_0     = 0,
} RotationFragmentInputIndex;

 
#endif /* ShaderTypes_h */

