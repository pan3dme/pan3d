//
//  ParticleMetalType.h
//  iosgl
//
//  Created by pan3dme on 2021/2/18.
//  Copyright © 2021 zhao. All rights reserved.
//

#ifndef ParticleMetalType_h
#define ParticleMetalType_h


#endif /* ParticleMetalType_h */


typedef struct
{
    matrix_float4x4 viewMatrix;
    matrix_float4x4 camMatrix;
    matrix_float4x4 modeMatrix;
} ParticleMetalMatrixData;

typedef struct
{
    matrix_float4x4 viewMatrix;
    matrix_float4x4 camMatrix;
    matrix_float4x4 modeMatrix;
    matrix_float4x4 rotMatrix;
} ParticleMetalBallMatrixData;
