//
//  GridLineShader.m
//  iosgl
//
//  Created by zhao on 8/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "GridLineShader.h"
#import "Scene3D.h"

@implementation GridLineShader
+(NSString*)shaderStr;
{
    return @"GridLineShader";
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
                                         float4 clipSpacePosition [[position]];
                                         float3 pixelColor;
                
                                         
                                     } RotationRasterizerData;
                                     
                                     typedef struct
                                     {
        float4 position;
        float3 color;
 
                                     } VertexLine;
                                     typedef struct
                                     {
        float4x4 projectionMatrix;
        float4x4 modelViewMatrix;
                                     } LineMatrixView;
                                     
                                     
                                     vertex RotationRasterizerData // 顶点
                                     vertexShaderLine(uint vertexID [[ vertex_id ]],
                                                  constant VertexLine *vertexArray [[ buffer(0) ]],
                                                  constant LineMatrixView *matrix [[ buffer(1) ]]) {
                                         RotationRasterizerData out;
                                         out.clipSpacePosition = matrix->projectionMatrix * matrix->modelViewMatrix * vertexArray[vertexID].position;
                                     
                                         out.pixelColor = vertexArray[vertexID].color;
                                         
                                         return out;
                                     }
                                      
                                     fragment float4 // 片元
                                     samplingShaderLine(RotationRasterizerData input [[stage_in]],
                                                    texture2d<half> textureColor [[ texture(0) ]])
                                     {
                                         constexpr sampler textureSampler (mag_filter::linear,
                                                                           min_filter::linear);
                                         
                                
                                 
                                         half4 colorTex = half4( input.pixelColor.x, input.pixelColor.y, input.pixelColor.z, 1);
                                
                                         return float4(colorTex);
                                     }
                                     
                                     
                                     )];
    
    
 
   
    
    
    
 
    
    
    return [NSString stringWithFormat:@"%@\n%@\n%@", includes, imports, code  ];
}
- (void)encodeVstr:(NSString *)vstr encodeFstr:(NSString *)fstr
{
    [self mtlEncode];
}
-(void)mtlEncode
{
  
   MTKView *mtkView=self.scene3D.context3D. mtkView;
   
    __autoreleasing NSError *error = nil;
    NSString* librarySrc = [self makeTestShader];
    id<MTLLibrary> defaultLibrary = [mtkView.device newLibraryWithSource:librarySrc options:nil error:&error];
 
   id<MTLFunction> vertexFunction = [defaultLibrary newFunctionWithName:@"vertexShaderLine"];
   id<MTLFunction> fragmentFunction = [defaultLibrary newFunctionWithName:@"samplingShaderLine"];
   
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
