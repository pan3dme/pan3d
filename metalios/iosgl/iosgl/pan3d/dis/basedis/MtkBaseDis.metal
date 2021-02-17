//
//  MtkBaseLine.metal
//  iosgl
//
//  Created by pan3dme on 2021/1/24.
//  Copyright © 2021 zhao. All rights reserved.
//

#include <metal_stdlib>
using namespace metal;
#include "MtlBaseDisType.h"


typedef struct
{
    float4 clipSpacePosition [[position]];
 
    
} RotationRasterizerData;




vertex RotationRasterizerData // 顶点
vertexShaderDis(uint vertexID [[ vertex_id ]],
             constant VertexbaseFloat3 *vertexArray [[ buffer(0) ]],
                constant MaterialBaseMatrix *projectionMatrix [[ buffer(1) ]],
                constant MaterialBaseMatrix *modelViewMatrix [[ buffer(2) ]]) {
    RotationRasterizerData out;
    out.clipSpacePosition =  projectionMatrix->matrix * modelViewMatrix->matrix * float4(vertexArray[vertexID].position, 1);
 
    
    return out;
}
 
fragment float4 // 片元
samplingShaderDis(RotationRasterizerData input [[stage_in]],
               texture2d<half> textureColor [[ texture(0) ]])
{
//    constexpr sampler textureSampler (mag_filter::linear,
//                                      min_filter::linear);
    
//    half4 colorTex = textureColor.sample(textureSampler, input.textureCoordinate);
//    half4 colorTex = half4(input.pixelColor.x, input.pixelColor.y, input.pixelColor.z, 1);
    half4 colorTex = half4(1, 0,0, 1);
    return float4(colorTex);
}
