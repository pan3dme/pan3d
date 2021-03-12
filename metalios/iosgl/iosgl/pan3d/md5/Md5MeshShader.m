//
//  Md5MeshShader.m
//  iosgl
//
//  Created by pan3dme on 2020/11/12.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Md5MeshShader.h"
#import "Scene3D.h"

@implementation Md5MeshShader
+(NSString*)shaderStr;
{
    return @"Md5MeshShader";
}
- (void)encodeVstr:(NSString *)vstr encodeFstr:(NSString *)fstr
{
    [self mtlEncode];
    
    
    
}

- (NSString *)makeTestShader
{
    NSString *includes = stringifyImportsArray(@[@"metal_stdlib", @"simd/simd.h" ]);
    NSString *imports  =@"";
    includes=@"";
    
    
    NSString *code     = [NSString stringWithFormat:@"%s",
                          _STRINGIFY(
                                     using namespace metal;
                                     
                               
                                                         
typedef struct
{
vector_float3 position;
} VertexRoleFloat3;
typedef struct
{
vector_float2 position;
} VertexRoleFloat2;
typedef struct
{
vector_float4 position;
} VertexRoleFloat4;
typedef struct
{
float4x4 projectionMatrix;
float4x4 modelViewMatrix;
} LineMatrixRoleView;

typedef struct
{
float4x4 matrix;
} MaterialMatrix;
 
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
 
                                     )];
 
 
    code=   [code stringByAppendingString:[self getVertexShaderStringMtk]];
    code=   [code stringByAppendingString:[self getFragmentShaderStringMtk]];
    
    return [NSString stringWithFormat:@"%@\n%@\n%@", includes, imports, code];
}
-(NSString*)getVertexShaderStringMtk
{
  
    NSString *baseStr     = [NSString stringWithFormat:@"%s",
                          _STRINGIFY(
                                     vertex RoleRasterizerData // 顶点
                                     vertexShaderRoleStr(uint vertexID [[ vertex_id ]],
                                                          constant LineMatrixRoleView *matrix [[ buffer(0) ]],
                                                          constant VertexRoleFloat3 *vertexArray [[ buffer(1) ]],
                                                          constant VertexRoleFloat2 *uvs [[ buffer(2) ]],
                                                          constant VertexRoleFloat4 *boneID [[ buffer(3) ]],
                                                          constant VertexRoleFloat4 *boneWeight [[ buffer(4) ]],
                                                          constant VertexRoleFloat4 *boneQ [[ buffer(5) ]],
                                                          constant VertexRoleFloat3 *boneD [[ buffer(6) ]]
                                                  )
                                     {
                                         RoleRasterizerData out;
                                         float4 vt0 = getQDdata(vertexArray[vertexID].position,boneID[vertexID].position,boneWeight[vertexID].position,boneQ,boneD );
                                         out.clipSpacePosition = matrix->projectionMatrix * matrix->modelViewMatrix * vt0;
                                         out.textureCoordinate = uvs[vertexID].position;
                                         out.outColor=float4(1,0,0, 1);
                                         return out;
                                     }
                                     )];
 
    
    NSString* changeStr=@" vertex RoleRasterizerData  vertexShaderRoleStr(uint vertexID [[ vertex_id ]],\n"
                    "constant LineMatrixRoleView *matrix [[ buffer(0) ]],\n"
                    "constant VertexRoleFloat3 *vertexArray [[ buffer(1) ]],\n"
                    "constant VertexRoleFloat2 *uvs [[ buffer(2) ]],\n"
                    "constant VertexRoleFloat4 *boneID [[ buffer(3) ]],\n"
                    "constant VertexRoleFloat4 *boneWeight [[ buffer(4) ]],\n"
                    "constant VertexRoleFloat4 *boneQ [[ buffer(5) ]],\n"
                    "constant VertexRoleFloat3 *boneD [[ buffer(6) ]]\n"
        
                ")\n"
                "{\n"
                    "RoleRasterizerData out;\n"
                    "float4 vt0 = getQDdata(vertexArray[vertexID].position,boneID[vertexID].position,boneWeight[vertexID].position,boneQ,boneD );\n"
                    "out.clipSpacePosition = matrix->projectionMatrix * matrix->modelViewMatrix * vt0;\n"
                    "out.textureCoordinate = uvs[vertexID].position;\n"
                    "out.outColor=float4(0,1,0, 1);\n"
                    "return out;\n"
                "}";
    
 
    
 

    return changeStr;
}


-(NSString*)getFragmentShaderStringMtk
{
  
    NSString *baseStr     = [NSString stringWithFormat:@"%s",
                          _STRINGIFY(
                                     fragment float4 // 片元
                                     fragmentShaderRoleStr(RoleRasterizerData input [[stage_in]],
                                                    texture2d<half> textureColor [[ texture(0) ]])
                                     {
                                         constexpr sampler textureSampler (mag_filter::linear,
                                                                           min_filter::linear);
                                         
                                         half4 colorTex = textureColor.sample(textureSampler, input.textureCoordinate);
 
                                         return float4(colorTex);
                                     }
                                     )];
 
    
    NSString* changeStr=@ "fragment float4 \n"
    "fragmentShaderRoleStr(RoleRasterizerData input [[stage_in]], texture2d<half> textureColor [[ texture(0) ]])\n"
    "{\n"
    "constexpr sampler textureSampler (mag_filter::linear,  min_filter::linear);\n"
        
    "half4 colorTex = textureColor.sample(textureSampler, input.textureCoordinate);\n"

//    "half4 colorTex = half4(1, 0,0, 1);\n"
    
    "return float4(colorTex);\n"
"}\n";
    
 
    
 

    return changeStr;
}

-(void)mtlEncode
{
    MTKView *mtkView=self.scene3D.context3D. mtkView;
 
    __autoreleasing NSError *error = nil;
    NSString* librarySrc = [self makeTestShader];
    id<MTLLibrary> defaultLibrary = [mtkView.device newLibraryWithSource:librarySrc options:nil error:&error];
    id<MTLFunction> vertexFunction = [defaultLibrary newFunctionWithName:@"vertexShaderRoleStr"];
    id<MTLFunction> fragmentFunction = [defaultLibrary newFunctionWithName:@"fragmentShaderRoleStr"];
    
    MTLRenderPipelineDescriptor *pipelineStateDescriptor = [[MTLRenderPipelineDescriptor alloc] init];
    pipelineStateDescriptor.vertexFunction = vertexFunction;
    pipelineStateDescriptor.fragmentFunction = fragmentFunction;
    pipelineStateDescriptor.colorAttachments[0].pixelFormat = mtkView.colorPixelFormat;
    pipelineStateDescriptor.depthAttachmentPixelFormat =  mtkView.depthStencilPixelFormat;
    pipelineStateDescriptor.stencilAttachmentPixelFormat = mtkView.depthStencilPixelFormat;
    
    self.pipelineState = [mtkView.device newRenderPipelineStateWithDescriptor:pipelineStateDescriptor
                                                                        error:NULL];
    
    
    MTLDepthStencilDescriptor *depthStateDesc = [[MTLDepthStencilDescriptor alloc] init];
    
    {
        depthStateDesc.depthCompareFunction = MTLCompareFunctionLessEqual;
        depthStateDesc.depthWriteEnabled = YES;
        self.relaxedDepthState = [self.scene3D.mtkView.device newDepthStencilStateWithDescriptor:depthStateDesc];
    }
}

-(NSString *)getVertexShaderString;{
    char* relplayChat =
    "attribute vec3 pos;"
    "attribute vec2 v2Uv;"
    "attribute vec4 boneID;"
    "attribute vec4 boneWeight;"
    "varying vec2 v0;"
    "uniform vec4 boneQ[54];"
    "uniform vec3 boneD[54];"
    "uniform mat4 vpMatrix3D;"
    "uniform mat4 posMatrix3D;"
    
    "vec4 qdv(vec4 q, vec3 d, vec3 v ){"
    "   vec3 t = 2.0 * cross(q.xyz, v);"
    "   vec3 f = v + q.w * t + cross(q.xyz, t);"
    "   return vec4(f.x + d.x, f.y + d.y, f.z + d.z, 1.0);"
    " }"
    "vec4 getQDdata(vec3 vdata){"
    "   vec4 tempnum = qdv(boneQ[int(boneID.x)], boneD[int(boneID.x)], vdata) * boneWeight.x;"
    "   tempnum += qdv(boneQ[int(boneID.y)], boneD[int(boneID.y)], vdata) * boneWeight.y;"
    "   tempnum += qdv(boneQ[int(boneID.z)], boneD[int(boneID.z)], vdata) * boneWeight.z;"
    "   tempnum += qdv(boneQ[int(boneID.w)], boneD[int(boneID.w)], vdata) * boneWeight.w;"
    "   tempnum.x = tempnum.x * -1.0;"
    "   return tempnum;"
    " }"
    "vec4 qdvNrm(vec4 q, vec3 v ){"
    "      vec3 t = 2.0 * cross(q.xyz, v);"
    "      vec3 f = v + q.w * t + cross(q.xyz, t);"
    "      return vec4(f.x, f.y, f.z, 1.0);\n"
    "}"
    " vec4 getQDdataNrm(vec3 vdata){"
    "    vec4 tempnum = qdvNrm(boneQ[int(boneID.x)], vdata) * boneWeight.x;"
    "    tempnum += qdvNrm(boneQ[int(boneID.y)], vdata) * boneWeight.y;"
    "    tempnum += qdvNrm(boneQ[int(boneID.z)], vdata) * boneWeight.z;"
    "    tempnum += qdvNrm(boneQ[int(boneID.w)], vdata) * boneWeight.w;"
    "    tempnum.x = tempnum.x * -1.0;"
    "    tempnum.xyz = normalize(tempnum.xyz);"
    "    return tempnum;"
    "}"
    " void main(void){"
    "    v0 = v2Uv;"
    "    vec4 vt0 = getQDdata(vec3(pos.x, pos.y, pos.z));"
    "    vt0 = posMatrix3D * vt0;"
    "    vt0 =vt0* vpMatrix3D ;"
    "    gl_Position = vt0;\n"
    "  }";
    return    [ NSString stringWithFormat:@"%s" ,relplayChat];
    
}
-(NSString *)getFragmentShaderString;{
    char* relplayChat =
    "precision mediump float;\n"
    "uniform sampler2D fs0;\n"
    "varying vec2 v0;\n"
    "void main(void)\n"
    "{\n"
    "vec4 infoUv = texture2D(fs0, v0.xy);\n"
    "gl_FragColor =infoUv;\n"
    "}";
    return    [ NSString stringWithFormat:@"%s" ,relplayChat];
}

@end

