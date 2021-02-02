//
//  MtlMoveDisplayType.h
//  iosgl
//
//  Created by pan3dme on 2021/2/2.
//  Copyright © 2021 zhao. All rights reserved.
//

#ifndef MtlMoveDisplayType_h
#define MtlMoveDisplayType_h

typedef struct
{
    vector_float4 position;
    vector_float2 textureCoordinate;
} ModelRoleVertex;
typedef struct
{
    vector_float4 data;
} ModelVertexfloat4;
typedef struct
{
    vector_float2 data;
} ModelRoleVertexfloat2;

typedef struct
{
   matrix_float4x4 projectionMatrix;
   matrix_float4x4 modelViewMatrix;
} ModelRoleMatrixView;

 


#endif /* MtlMoveDisplayType_h */
