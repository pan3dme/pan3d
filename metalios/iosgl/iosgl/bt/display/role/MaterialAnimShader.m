//
//  MaterialAnimShader.m
//  iosgl
//
//  Created by zhao on 4/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "MaterialAnimShader.h"
#import "Scene3D.h"
 
@implementation MaterialAnimShader
+(NSString*)shaderStr;
{
    return @"MaterialAnimShader";
}
- (void)encodeVstr:(NSString *)vstr encodeFstr:(NSString *)fstr
{
    [self mtlEncode];
    
    
    
}

- (NSString *)makeTestShader
{
    NSString *includes = stringifyIncludesArray(@[@"metal_stdlib", @"simd/simd.h" ]);
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
                                         vector_float4 boneQ[54];
                                         vector_float3 boneD[54];
                                      
                                     } BoneQDrole;
                                     
                                     
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
                                                          constant VertexRoleFloat2 *uvs [[ buffer(2) ]],
                                                          constant VertexRoleFloat4 *boneID [[ buffer(3) ]],
                                                          constant VertexRoleFloat4 *boneWeight [[ buffer(4) ]],
                                                          constant VertexRoleFloat4 *boneQ [[ buffer(5) ]],
                                                          constant VertexRoleFloat3 *boneD [[ buffer(6) ]]
                                                         
                                                           
                                                  )
                                      

                                     {
                                        
                                        
                                         RoleRasterizerData out;
                                      
                                         float4 vt0 = getQDdata(vertexArray[vertexID].position,boneID[vertexID].position,boneWeight[vertexID].position,boneQ,boneD );;
                                      
                                     //    vt0=float4(vertexArray[vertexID].position, 1);
                                         
                                         out.clipSpacePosition = matrix->projectionMatrix * matrix->modelViewMatrix * vt0;
                                         
                                         out.textureCoordinate = uvs[vertexID].position;
                                         
                                         out.outColor=float4(1,0,0, 1);
                                      
                                         
                                         return out;
                                     }
                                      
                                     fragment float4 // 片元
                                     samplingShaderLineRole(RoleRasterizerData input [[stage_in]],
                                                    texture2d<half> textureColor [[ texture(0) ]])
                                     {
                                         constexpr sampler textureSampler (mag_filter::linear,
                                                                           min_filter::linear);
                                         
                                         half4 colorTex = textureColor.sample(textureSampler, input.textureCoordinate);
                                     //    half4 colorTex = half4(input.pixelColor.x, input.pixelColor.y, input.pixelColor.z, 1);
                                     //    half4 colorTex = half4(1, 0,0, 1);
                                     //    half4 colorTex = half4(input.outColor.x, input.outColor.y, input.outColor.z, 1);
                                         return float4(colorTex);
                                     }

                                     
                                     )];
 
 
  
    
    return [NSString stringWithFormat:@"%@\n%@\n%@", includes, imports, code];
}
-(NSString*)getVertexShaderStringMtk
{
  
    NSString* str=  @"vertex MaterialOutVertices   vertexMaterialShader (uint vertexID [[ vertex_id ]],\n"
    "constant MaterialShaderVertexFloat4 *v3Position [[ buffer(0) ]],\n"
    "constant MaterialShaderVertexFloat2 *v2TexCoord [[ buffer(1) ]],\n";
 
    
    
 

    return str;
}

-(void)mtlEncode
{
    MTKView *mtkView=self.scene3D.context3D. mtkView;
 
    __autoreleasing NSError *error = nil;
    NSString* librarySrc = [self makeTestShader];
    id<MTLLibrary> defaultLibrary = [mtkView.device newLibraryWithSource:librarySrc options:nil error:&error];
    id<MTLFunction> vertexFunction = [defaultLibrary newFunctionWithName:@"vertexShaderLineRole"];
    id<MTLFunction> fragmentFunction = [defaultLibrary newFunctionWithName:@"samplingShaderLineRole"];
    
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
 
    "attribute vec3 pos;\n"
    "attribute vec2 v2Uv;\n"
    "attribute vec4 boneID;\n"
    "attribute vec4 boneWeight;\n"
    "uniform vec4 boneQ[54];\n"
    "uniform vec3 boneD[54];\n"

    
    "varying vec2 v0;\n"
    "varying vec4 colorvec4;\n"
    "uniform mat4 viewMatrix;\n"
    "uniform mat4 posMatrix;\n"
    
 
    "vec4 qdv(vec4 q,vec3 d, vec3 v ){\n"
        "vec3 t = 2.0 * cross(q.xyz, v);\n"
        "vec3 f = v + q.w * t + cross(q.xyz, t);\n"
        "return  vec4(f.x+d.x,f.y+d.y,f.z+d.z,1.0);\n"
    "}\n"
    "vec4 getQDdata(vec3 vdata){\n"
        "vec4 tempnum = qdv(boneQ[int(boneID.x)],boneD[int(boneID.x)],vdata) * boneWeight.x;\n"
        "tempnum += qdv(boneQ[int(boneID.y)],boneD[int(boneID.y)],vdata) * boneWeight.y;\n"
        "tempnum += qdv(boneQ[int(boneID.z)],boneD[int(boneID.z)],vdata)* boneWeight.z;\n"
        "tempnum += qdv(boneQ[int(boneID.w)],boneD[int(boneID.w)],vdata) * boneWeight.w;\n"
        "tempnum.x = tempnum.x*-1.0;\n"
        "return  tempnum;\n"
    "}\n"
        "vec4 qdvNrm(vec4 q, vec3 v ){\n"
        "vec3 t = 2.0 * cross(q.xyz, v);\n"
        "vec3 f = v + q.w * t + cross(q.xyz, t);\n"
        "return  vec4(f.x,f.y,f.z,1.0);\n"
    "}\n"
    "vec4 getQDdataNrm(vec3 vdata){\n"
        "vec4 tempnum = qdvNrm(boneQ[int(boneID.x)],vdata) * boneWeight.x;\n"
        "tempnum += qdvNrm(boneQ[int(boneID.y)],vdata) * boneWeight.y;\n"
        "tempnum += qdvNrm(boneQ[int(boneID.z)],vdata)* boneWeight.z;\n"
        "tempnum += qdvNrm(boneQ[int(boneID.w)],vdata) * boneWeight.w;\n"
        "tempnum.x = tempnum.x*-1.0;\n"
        "tempnum.xyz = normalize(tempnum.xyz);\n"
        "return  tempnum;\n"
    "}\n"
  
    "void main()"
    "{"
        "colorvec4 =vec4(1.0,1.0,1.0,1.0);\n"
        " v0 = v2Uv;\n"
         "vec4 vt0 = getQDdata(vec3(pos.x,pos.y,pos.z));\n"
         "vec4 vPos = vec4(vt0.xyz,1.0);\n"
         "gl_Position = vPos * posMatrix* viewMatrix;\n"
    "}";
    return    [ NSString stringWithFormat:@"%s" ,relplayChat];
    
}
 
-(NSString *)getFragmentShaderString;{
    char* relplayChat =
    "precision mediump float;\n"
     "uniform sampler2D fs0;\n"
    "varying vec4 colorvec4;\n"
    "varying vec2 v0;\n"
    "void main()"
    "{"
        "vec4 infoUvf   =texture2D(fs0,v0.xy);\n"
        "if (infoUvf.w <= 0.5) {\n"
            "discard;\n"
        "};\n"
  
        "gl_FragColor =infoUvf;\n"
    "}";
    return    [ NSString stringWithFormat:@"%s" ,relplayChat];
}
/*
 uniform sampler2D fs0;
 uniform vec4 fc[1];
 varying vec2 v0;
 void main(void){

 vec4 ft0 = texture2D(fs0,v0);
 ft0.xyz *= ft0.w;
 vec4 ft1 = vec4(ft0.xyz,1.0);
 vec4 ft2 = vec4(0,0,0,1);
 ft2.xyz = ft1.xyz;
 ft2.w = ft0.w;
 ft2.xyz = ft2.xyz * ft2.w;
 if(ft0.w<fc[0].x){discard;}
 gl_FragColor = ft2;
 */
@end
