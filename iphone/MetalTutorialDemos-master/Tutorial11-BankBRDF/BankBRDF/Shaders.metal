#include <metal_stdlib>
#include <simd/simd.h>
#include "ShaderTypes.h"
using namespace metal;

typedef struct
{
    float3 position [[attribute(0)]];
    float2 texCoord [[attribute(1)]];
    half3 normal    [[attribute(2)]];
    //half3 tangent   [[attribute(3)]];
    //half3 bitangent [[attribute(4)]];
} Vertex;

typedef struct
{
    float4 position [[position]];
    float4 worldPos;
    float2 texCoord;
    float4 normal;
} ColorInOut;

vertex ColorInOut vertexShaderOne(Vertex in [[ stage_in ]],
                               constant UniformsOne & uniforms [[ buffer(1) ]])
{
    ColorInOut out;
    float4 position = float4(in.position, 1.0);
    out.position = uniforms.projectionMatrix * uniforms.modelViewMatrix * position;
    out.worldPos = uniforms.modelMatrix * position;
    out.texCoord = in.texCoord;
    out.normal = normalize(uniforms.modelMatrix * float4((float3)in.normal,0));
    return out;
}


fragment half4 fragmentShaderOne(ColorInOut in [[ stage_in ]],
                              constant UniformsOne & uniforms [[ buffer(1) ]],
                              texture2d<half> baseColorMap [[ texture(0) ]])
{
    constexpr sampler linearSampler(mip_filter::linear, mag_filter::linear, min_filter::linear, s_address::repeat, t_address::repeat);
    
    half4 color_sample  = half4(0,0.7,0.2,1.0);//
    color_sample=baseColorMap.sample(linearSampler,in.texCoord.xy);
    
    // 法线
    float3 N = in.normal.xyz;
    // 入射光方向
    float3 L = - normalize(uniforms.directionalLightDirection);
    // 视线方向
    float3 V = normalize(uniforms.cameraPos - in.worldPos.xyz);
    // 反射光方向
    //float3 R = normalize(2 * fmax(dot(N, L), 0) * N - L);
    // 半角向量
    float3 H = normalize(L + V);
    
    float Rs = 0;
    float nv = dot(N, V);
    float nl = dot(N, L);
    
    bool front = (nv > 0) && (nl > 0); // 正面
    
    if(front)
    {
        float nh = dot(N, H);
        float vh = dot(V, H);
        
        // F
        float F = uniforms.f + (1 - uniforms.f) * pow(1 - vh, 5.0);
        
        // D
        float temp = (nh * nh - 1) / (uniforms.m * uniforms.m * nh * nh);
        float D = exp(temp) / (uniforms.m * uniforms.m) * pow(nh, 4.0);
        
        // G
        float G1 = (2 * nh * nv) / vh;
        float G2 = (2 * nh * nl) / vh;
        float G = fmin3(1.0, G1, G2);
        
        // Rs
        Rs = (F * D * G) / (nv * nl);
    }
    
    // Lambert diffuse
    float diffuse = uniforms.IL * uniforms.Kd * max(dot(float3(in.normal.xyz),L),0.0);
    
    // Specular(cook-torrance)
    float specular = uniforms.IL * uniforms.Ks * Rs;
    
    // Ambient Glow
    float ambient = uniforms.Ia * uniforms.Ka;
    
    float3 out = float3(uniforms.directionalLightColor) * float3(color_sample.xyz) * (diffuse + specular + ambient);
    
    return half4(half3(out.xyz),1.0f);
}


vertex ColorInOut vertexShaderTwo(Vertex in [[ stage_in ]],
                               constant UniformsTwo & uniforms [[ buffer(1) ]])
{
    ColorInOut out;
    float4 position = float4(in.position, 1.0);
    out.position = uniforms.projectionMatrix * uniforms.modelViewMatrix * position;
    out.worldPos = uniforms.modelMatrix * position;
    out.texCoord = in.texCoord;
    out.normal = normalize(uniforms.modelMatrix * float4((float3)in.normal,0));
    return out;
}
fragment half4 fragmentShaderTwo(ColorInOut in [[ stage_in ]],
                              constant UniformsTwo & uniforms [[ buffer(1) ]],
                              texture2d<half> baseColorMap [[ texture(0) ]])
{
    constexpr sampler linearSampler(mip_filter::linear, mag_filter::linear, min_filter::linear, s_address::repeat, t_address::repeat);
    
    half4 color_sample    =baseColorMap.sample(linearSampler,in.texCoord.xy);
    
  
    
    return half4(half3(color_sample.xyz),1.0f);
}

typedef struct
{
    float2 pos[[attribute(0)]];
    float2 uv[[attribute(1)]];
} VertexAttr;

vertex ColorInOut vertexShader(VertexAttr in [[stage_in]])
{
    ColorInOut out;

    float4 position = vector_float4(in.pos.xy, 1 , 2);
    out.position = position;
    out.texCoord = in.uv;

    return out;
}

fragment half4 fragmentShader(ColorInOut in [[stage_in]],
                               texture2d<half> mtltexture01 [[texture(0)]])
{
    // 纹理采样对象
    constexpr sampler textureSampler (mag_filter::linear,
    min_filter::linear);
    
    // 采样贴图
    const half4 color = mtltexture01.sample(textureSampler, in.texCoord);
    
    return color;
}


vertex ColorInOut vertexShaderRect(constant VertexRed *vertexArr [[buffer(0)]],
                               uint vid [[vertex_id]])
{
    ColorInOut out;

    float4 position = vector_float4(vertexArr[vid].pos.x*0.6,vertexArr[vid].pos.y*0.6, vertexArr[vid].pos.z*0.6 ,0.6);
    out.position = position;

    return out;
}

fragment float4 fragmentShaderRect(ColorInOut in [[stage_in]])
{
    return float4(1.0,0,0,1);
}
