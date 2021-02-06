//
//  MtlMoveDisplayType.h
//  iosgl
//
//  Created by pan3dme on 2021/2/2.
//  Copyright © 2021 zhao. All rights reserved.
//

#ifndef MtlMoveDisplayType_h
#define MtlMoveDisplayType_h


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
} VertexRoleFloat3;
typedef struct
{
    vector_float4 position;
} VertexRoleFloat4;
typedef struct
{
   matrix_float4x4 projectionMatrix;
   matrix_float4x4 modelViewMatrix;
} LineMatrixRoleView;

typedef struct
{
    vector_float4 boneQ[54];
    vector_float3 boneD[54];
 
} BoneQDrole;

 

#endif /* MtlMoveDisplayType_h */
