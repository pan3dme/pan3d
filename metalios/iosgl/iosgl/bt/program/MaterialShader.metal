//
//  MaterialShader.metal
//  iosgl
//
//  Created by pan3dme on 2021/1/28.
//  Copyright © 2021 zhao. All rights reserved.
//

#include <metal_stdlib>
using namespace metal;
#include "MaterialShaderType.h"

 
 
typedef struct
{
  float4 clipSpacePosition [[position]];
  float2 textureCoordinate;
  
} MaterialShaderData;
vertex MaterialShaderData // 顶点
vertexMaterialShader(uint vertexID [[ vertex_id ]],
           constant MaterialShaderVertex *vertexArray [[ buffer(0) ]],
           constant MaterialShaderMatrixView *matrix [[ buffer(1) ]]) {
    MaterialShaderData out;
  out.clipSpacePosition = matrix->projectionMatrix * matrix->modelViewMatrix * vertexArray[vertexID].position;
  out.textureCoordinate = vertexArray[vertexID].textureCoordinate;

  
  return out;
}

fragment float4 // 片元
fragmentMaterialShader(MaterialShaderData input [[stage_in]],
             texture2d<half> textureColor [[ texture(0) ]])
{
  constexpr sampler textureSampler (mag_filter::linear,
                                    min_filter::linear);
  
  half4 colorTex = textureColor.sample(textureSampler, input.textureCoordinate);
//    half4 colorTex = half4(1, 0,0, 1);
  return float4(colorTex);
}
 
 
