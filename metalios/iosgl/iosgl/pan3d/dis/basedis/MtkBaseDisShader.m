//
//  MtkBaseLineShader.m
//  iosgl
//
//  Created by pan3dme on 2021/1/23.
//  Copyright © 2021 zhao. All rights reserved.
//

#import "MtkBaseDisShader.h"
#import <UIKit/UIKit.h>

@implementation MtkBaseDisShader


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
        float3 position;
                                     } BaseFloat3;

                                     typedef struct
                                     {
        float4x4 matrix;
                                     }  BaseMatrix;
                                     
                                     typedef struct
                                     {
                                         float4 clipSpacePosition [[position]];
                                      
                                         
                                     } OutData;
                                     
                                     




                                     vertex OutData // 顶点
                                     vertexShader(uint vertexID [[ vertex_id ]],
                                                  constant BaseFloat3 *vertexArray [[ buffer(0) ]],
                                                     constant BaseMatrix *projectionMatrix [[ buffer(1) ]],
                                                     constant BaseMatrix *modelViewMatrix [[ buffer(2) ]]) {
        OutData out;
                                         out.clipSpacePosition =  projectionMatrix->matrix * modelViewMatrix->matrix * float4(vertexArray[vertexID].position, 1);
                                      
                                         
                                         return out;
                                     }
                                      
                                     fragment float4 // 片元
                                     fragmentShader(OutData input [[stage_in]],
                                                    texture2d<half> textureColor [[ texture(0) ]])
                                     {
                                 
                                         half4 colorTex = half4(1, 1,0, 1);
                                         return float4(colorTex);
                                     }
                                     
                                     )];
    
    
    
    return [NSString stringWithFormat:@"%@\n%@\n%@", includes, imports, code];
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

@end
