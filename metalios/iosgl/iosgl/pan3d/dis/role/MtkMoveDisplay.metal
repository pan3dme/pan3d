//
//  MtkMoveDisplay.metal
//  iosgl
//
//  Created by pan3dme on 2021/2/2.
//  Copyright © 2021 zhao. All rights reserved.
//

#include <metal_stdlib>
using namespace metal;

#include "../model/MtlModelDisplayType.h"

  
typedef struct
{
    float4 clipSpacePosition [[position]];
    float2 textureCoordinate;
    
} ModelRasterizerData;
vertex ModelRasterizerData // 顶点
vertexShaderRoleModel(uint vertexID [[ vertex_id ]],
             constant ModelVertex *vertexArray [[ buffer(0) ]],
             constant ModelMatrixView *matrix [[ buffer(1) ]]) {
    ModelRasterizerData out;
    out.clipSpacePosition = matrix->projectionMatrix * matrix->modelViewMatrix * vertexArray[vertexID].position;
    out.textureCoordinate = vertexArray[vertexID].textureCoordinate;
  
    
    return out;
}
 
fragment float4 // 片元
samplingShaderRoleModel(ModelRasterizerData input [[stage_in]],
               texture2d<half> textureColor [[ texture(0) ]])
{
    constexpr sampler textureSampler (mag_filter::linear,
                                      min_filter::linear);
    
    half4 colorTex = textureColor.sample(textureSampler, input.textureCoordinate);
 
    return float4(colorTex);
}


