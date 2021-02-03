//
//  MtkBaseLine.metal
//  iosgl
//
//  Created by pan3dme on 2021/1/24.
//  Copyright © 2021 zhao. All rights reserved.
//

#include <metal_stdlib>
using namespace metal;
#include "MtlMoveDisplayType.h"


typedef struct
{
    float4 clipSpacePosition [[position]];
    float3 pixelColor;
    float2 textureCoordinate;
    
} RoleRasterizerData;
vertex RoleRasterizerData // 顶点
vertexShaderLineRole(uint vertexID [[ vertex_id ]],
             constant VertexRoleLine *vertexArray [[ buffer(0) ]],
             constant LineMatrixRoleView *matrix [[ buffer(1) ]]) {
    RoleRasterizerData out;
    out.clipSpacePosition = matrix->projectionMatrix * matrix->modelViewMatrix * vertexArray[vertexID].position;
    out.textureCoordinate = vertexArray[vertexID].textureCoordinate;
    out.pixelColor = vertexArray[vertexID].color;
    
    return out;
}
 
fragment float4 // 片元
samplingShaderLineRole(RoleRasterizerData input [[stage_in]],
               texture2d<half> textureColor [[ texture(0) ]])
{
  
    
//    half4 colorTex = textureColor.sample(textureSampler, input.textureCoordinate);
//    half4 colorTex = half4(input.pixelColor.x, input.pixelColor.y, input.pixelColor.z, 1);
    half4 colorTex = half4(1, 0,0, 1);
    return float4(colorTex);
}
