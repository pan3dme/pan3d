//
//  Display3DBoneShader.m
//  StorageStarted
//
//  Created by pan3dme on 2021/6/1.
//  Copyright © 2021 cuiyiran. All rights reserved.
//

#import "Display3DBoneShader.h"
#import "Scene3D.h"

@implementation Display3DBoneShader

+(NSString*)shaderStr;
{
    return @"Display3DBoneShader";
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
 
 
    code=   [code stringByAppendingString:[self getVertexShaderString]];
    code=   [code stringByAppendingString:[self getFragmentShaderString]];
    
    return [NSString stringWithFormat:@"%@\n%@\n%@", includes, imports, code];
}
-(NSString*)getVertexShaderString
{
  
//                  "attribute vec3 pos;" +
//                  "attribute vec2 v2uv;" +
//                  "attribute vec4 boneWeight;" +
//                  "attribute vec4 boneID;" +
//                  "uniform vec4 boneQ[54];\n" +
//                  "uniform vec3 boneD[54];\n" +
    
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


-(NSString*)getFragmentShaderString
{
  
 
 
    
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
 
  
@end
