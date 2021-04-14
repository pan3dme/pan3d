//
//  Display3DShader.m
//  iosgl
//
//  Created by zhao on 26/2/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Display3DShader.h"

@implementation Display3DShader

+(NSString*)shaderStr;
{
    return @"Display3DShader";
}
- (NSString *)makeTestShader
{
//    include <stdio.h>
//    #include <stdlib.h>
//    #include <math.h>
    //NSString *includes = stringifyIncludesArray(@[@"metal_stdlib", @"simd/simd.h"]);
    NSString *includes = stringifyHeaderincludeArray(@[@"metal_stdlib",  @"metal_math" ]);
    NSString *imports  =stringifyImportsArray(@[@"metal_math.h"  ]);
 
//    includes=@"";
    imports=@"";
    
    
    
    
    return [NSString stringWithFormat:@"%@\n%@\n%@%@", includes, imports, [self getVertexShaderString],[self getFragmentShaderString]];
}
-(void)mtlEncode
{
    
    MTKView *mtkView=self.scene3D.context3D. mtkView;
    
//    id<MTLLibrary> defaultLibrary = [mtkView.device newDefaultLibrary];
    
    __autoreleasing NSError *error = nil;
    NSString* librarySrc = [self makeTestShader];
    id<MTLLibrary> defaultLibrary = [mtkView.device newLibraryWithSource:librarySrc options:nil error:&error];
    
    
    
    
    id<MTLFunction> vertexFunction = [defaultLibrary newFunctionWithName:@"vertexShader"];
    id<MTLFunction> fragmentFunction = [defaultLibrary newFunctionWithName:@"fragmentShader"];
    
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
- (NSString *)getVertexShaderString
{
    
    NSString *code     = [NSString stringWithFormat:@"%s",
                          _STRINGIFY(
                                     using namespace metal;
                                     
                                     
                                     typedef struct
                                     {
        float3 position;
                                     } BaseFloat3;
                                     
                                     typedef struct
                                     {
        float2 position;
                                     } BaseFloat2;

                                     typedef struct
                                     {
        float4x4 matrix;
                                     }  BaseMatrix;
                                     
                                     typedef struct
                                     {
                                         float4 clipSpacePosition [[position]];
        float2 uvs;
                                         
                                     } OutData;
                                     
                                     




                                     vertex OutData // 顶点
                                     vertexShader(uint vertexID [[ vertex_id ]],
                                                  constant BaseFloat3 *vertexArray [[ buffer(0) ]],
                                                  constant BaseFloat2 *uvsArray [[ buffer(1) ]],
                                                     constant BaseMatrix *projectionMatrix [[ buffer(2) ]],
                                                     constant BaseMatrix *modelViewMatrix [[ buffer(3) ]]) {
//        float abc=sin(0.2f);
        OutData out;
                                         out.clipSpacePosition =  projectionMatrix->matrix * modelViewMatrix->matrix * float4(vertexArray[vertexID].position, 1);
                                      
        out.uvs=uvsArray[vertexID].position;
                                         return out;
                                     }
                                       
                                     
                                     )];
    
    return code;
}
- (NSString *)getFragmentShaderString
{
    
    NSString *code     = [NSString stringWithFormat:@"%s",
                          _STRINGIFY(
                             
                                      
                                     fragment float4 // 片元
                                     fragmentShader(OutData input [[stage_in]],
                                                    texture2d<half> textureColor [[ texture(0) ]])
                                     {
 
        constexpr sampler textureSampler (mag_filter::linear,
                                          min_filter::linear);
        
        half4 colorTexBase = textureColor.sample(textureSampler, input.uvs);
        
                                         half4 colorTex = half4(input.uvs.x,input.uvs.y,0, 1);
                                         return float4(colorTexBase);
                                     }
                                     
                                     )];
    return code;
}
@end
