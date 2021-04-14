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
    matrix_float4x4 rotMatrix;
} ParticleMetalMatrixData;

typedef struct
{
    matrix_float4x4 viewMatrix;
    matrix_float4x4 camMatrix;
    matrix_float4x4 modeMatrix;
    matrix_float4x4 rotMatrix;
} ParticleMetalModelMatrixData;

typedef struct
{
    matrix_float4x4 viewMatrix;
    matrix_float4x4 camMatrix;
    matrix_float4x4 modeMatrix;
    matrix_float4x4 rotMatrix;
} ParticleMetalBallMatrixData;


typedef struct
{
    matrix_float4x4 viewMatrix;
    matrix_float4x4 camMatrix;
    matrix_float4x4 modeMatrix;

} ParticleMetalLocusMatrixData;


typedef struct
{
    vector_float4 vcmat50;
    vector_float4 vcmat51;
    vector_float4 vcmat52;
    vector_float4 vcmat53;
    
} ParticleMetalBallVcmatData;
typedef struct
{
    vector_float4 vcmat30;
    vector_float4 vcmat31;
 
    
} ParticleMetalLocusVcmatData;
