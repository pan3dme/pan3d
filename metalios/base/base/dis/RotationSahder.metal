//
//  RotationSahder.metal
//  base
//
//  Created by pan3dme on 2021/1/17.
//

#include <metal_stdlib>
#include "../ShaderTypes.h"
#include <simd/simd.h>

using namespace metal;

 

typedef struct
{
    float4 clipSpacePosition [[position]];
    float3 pixelColor;
    float2 textureCoordinate;
    
} RasterizerDataCopy;

vertex RasterizerDataCopy // 顶点
vertexShaderBaseCopyet(uint vertexID [[ vertex_id ]],
             constant LYVertex *vertexArray [[ buffer(LYVertexInputIndexVertices) ]],
             constant LYMatrix *matrix [[ buffer(LYVertexInputIndexMatrix) ]]) {
    RasterizerDataCopy out;
    out.clipSpacePosition = matrix->projectionMatrix * matrix->modelViewMatrix * vertexArray[vertexID].position;
    out.textureCoordinate = vertexArray[vertexID].textureCoordinate;
    out.pixelColor = vertexArray[vertexID].color;
    
    return out;
}
 
