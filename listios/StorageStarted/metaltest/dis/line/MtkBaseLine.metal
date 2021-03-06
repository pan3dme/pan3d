//
//  MtkBaseLine.metal
//  iosgl
//
//  Created by pan3dme on 2021/1/24.
//  Copyright © 2021 zhao. All rights reserved.
//

#include <metal_stdlib>
using namespace metal;
#include "MtlBaseLineType.h"


typedef struct
{
    float4 clipSpacePosition [[position]];
    float3 pixelColor;
    float2 textureCoordinate;
    
} RotationRasterizerData;
vertex RotationRasterizerData // 顶点
vertexShaderLine(uint vertexID [[ vertex_id ]],
             constant VertexLine *vertexArray [[ buffer(0) ]],
             constant LineMatrixView *matrix [[ buffer(1) ]]) {
    RotationRasterizerData out;
    out.clipSpacePosition = matrix->projectionMatrix * matrix->modelViewMatrix * vertexArray[vertexID].position;
    out.textureCoordinate = vertexArray[vertexID].textureCoordinate;
    out.pixelColor = vertexArray[vertexID].color;
    
    return out;
}
 
fragment float4 // 片元
samplingShaderLine(RotationRasterizerData input [[stage_in]],
               texture2d<half> textureColor [[ texture(0) ]])
{
    constexpr sampler textureSampler (mag_filter::linear,
                                      min_filter::linear);
    
//    half4 colorTex = textureColor.sample(textureSampler, input.textureCoordinate);
    float abc=sin(0.0);
    half4 colorTex = half4( input.pixelColor.x, input.pixelColor.y, input.pixelColor.z, 1);
//    half4 colorTex = half4(1, 0,0, 1);
    return float4(colorTex);
}
