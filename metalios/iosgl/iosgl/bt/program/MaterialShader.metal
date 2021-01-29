//
//  MaterialShader.metal
//  iosgl
//
//  Created by pan3dme on 2021/1/28.
//  Copyright © 2021 zhao. All rights reserved.
//

#include <metal_stdlib>
#include "MaterialShaderType.h"

using namespace metal;


 
typedef struct
{
  float4 vPosition [[position]];
  float2 vTextCoord;
  
} MaterialShaderData;

vertex MaterialShaderData
vertexMaterialShader(uint vertexID [[ vertex_id ]],
           constant MaterialShaderVertex *vertexArray [[ buffer(0) ]],
                     constant MaterialShaderViewMatrix *viewMatrix [[ buffer(1) ]],
                     constant MaterialShaderMatrixView *posMatrix [[ buffer(2) ]]
                     ) {
    MaterialShaderData out;
  out.vPosition = viewMatrix->matrix * posMatrix->matrix * vertexArray[vertexID].position;
  out.vTextCoord = vertexArray[vertexID].textureCoordinate;
  return out;
}

fragment float4
fragmentMaterialShader(MaterialShaderData input [[stage_in]],
             texture2d<half> textureColor [[ texture(0) ]])
{
  constexpr sampler textureSampler (mag_filter::linear,
                                    min_filter::linear);
  
  half4 colorTex = textureColor.sample(textureSampler, input.vTextCoord);
//    half4 colorTex = half4(1, 0,0, 1);
  return float4(colorTex);
}
 
 
