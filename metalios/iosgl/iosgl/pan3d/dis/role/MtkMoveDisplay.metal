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
    float4 outColor;
    float2 textureCoordinate;
    
} RoleRasterizerData;
float4 qdv( float4 q ,float3 d ,float3 v  )
{
    float3 t = 2.0 * cross(q.xyz, v);
    float3 f = v + q.w * t + cross(q.xyz, t);
    return float4(f.x + d.x, f.y + d.y, f.z + d.z, 1.0);
}
float4 getQDdata(float3 vdata,float4 boneID,float4 boneWeight,constant VertexRoleFloat4 *boneQ  ,constant VertexRoleFloat3 *boneD){
    
    
    float4 tempnum = qdv(boneQ[int(boneID.x)].position, boneD[int(boneID.x)].position, vdata) * boneWeight.x;
    tempnum += qdv(boneQ[int(boneID.y)].position, boneD[int(boneID.y)].position, vdata) * boneWeight.y;
    tempnum += qdv(boneQ[int(boneID.z)].position, boneD[int(boneID.z)].position, vdata) * boneWeight.z;
    tempnum += qdv(boneQ[int(boneID.w)].position, boneD[int(boneID.w)].position, vdata) * boneWeight.w;
    tempnum.x = tempnum.x * -1.0;
    return tempnum;
    
    
}

vertex RoleRasterizerData // 顶点
vertexShaderLineRole(uint vertexID [[ vertex_id ]],
                     constant LineMatrixRoleView *matrix [[ buffer(0) ]],
                     constant VertexRoleFloat3 *vertexArray [[ buffer(1) ]],
                     constant VertexRoleFloat4 *boneID [[ buffer(2) ]],
                     constant VertexRoleFloat4 *boneWeight [[ buffer(3) ]],
                     constant VertexRoleFloat4 *boneQ [[ buffer(4) ]],
                     constant VertexRoleFloat3 *boneD [[ buffer(5) ]]
                    
                      
             )
 

{
   
   
    RoleRasterizerData out;
 
    float4 vt0 = getQDdata(vertexArray[vertexID].position,boneID[vertexID].position,boneWeight[vertexID].position,boneQ,boneD );;
 
    vt0=float4(vertexArray[vertexID].position, 1);
    
    out.clipSpacePosition = matrix->projectionMatrix * matrix->modelViewMatrix * vt0;
    

    
    out.outColor=float4(boneID[vertexID].position.x,0,0, 1);
 
    
    return out;
}
 
fragment float4 // 片元
samplingShaderLineRole(RoleRasterizerData input [[stage_in]],
               texture2d<half> textureColor [[ texture(0) ]])
{
  
    
//    half4 colorTex = textureColor.sample(textureSampler, input.textureCoordinate);
//    half4 colorTex = half4(input.pixelColor.x, input.pixelColor.y, input.pixelColor.z, 1);
//    half4 colorTex = half4(1, 0,0, 1);
    half4 colorTex = half4(input.outColor.x, input.outColor.y, input.outColor.z, 1);
    return float4(colorTex);
}
