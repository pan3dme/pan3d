//
//  Display3DModelShader.m
//  iosgl
//
//  Created by zhao on 20/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Display3DModelShader.h"
#import "Scene3D.h"

@implementation Display3DModelShader
+(NSString*)shaderStr;
{
    return @"Display3DModelShader";
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
    
    
    
    
    MTLRenderPipelineColorAttachmentDescriptor *renderbufferAttachment = pipelineStateDescriptor.colorAttachments[0];
    
    renderbufferAttachment.pixelFormat = MTLPixelFormatBGRA8Unorm;
    
    
    renderbufferAttachment.blendingEnabled = YES;
    renderbufferAttachment.rgbBlendOperation = MTLBlendOperationAdd;
    renderbufferAttachment.alphaBlendOperation = MTLBlendOperationAdd;
    
    renderbufferAttachment.sourceRGBBlendFactor = MTLBlendFactorOne;
    renderbufferAttachment.destinationRGBBlendFactor = MTLBlendFactorOne;
    
    renderbufferAttachment.sourceAlphaBlendFactor = MTLBlendFactorSourceAlpha;
    renderbufferAttachment.destinationAlphaBlendFactor = MTLBlendFactorSourceAlpha;
    
    
    
    
    self.pipelineState = [mtkView.device newRenderPipelineStateWithDescriptor:pipelineStateDescriptor
                                                                        error:NULL];
    
    
    MTLDepthStencilDescriptor *depthStateDesc = [[MTLDepthStencilDescriptor alloc] init];
    
    {
        depthStateDesc.depthCompareFunction = MTLCompareFunctionLessEqual;
        depthStateDesc.depthWriteEnabled = NO;
        self.relaxedDepthState = [self.scene3D.mtkView.device newDepthStencilStateWithDescriptor:depthStateDesc];
    }
}

-(NSString *)getVertexShaderString;{
    NSString *code     = [NSString stringWithFormat:@"%s",
                          _STRINGIFY(
                                     using namespace metal;
                                     
                                     
                                     typedef struct
                                     {
        float2 position;
    } BaseFloat2;
                                     typedef struct
                                     {
        float3 position;
    } BaseFloat3;
                                     
                                     typedef struct
                                     {
        float4 position;
    } BaseFloat4;
                                     
          
                                     
                                     typedef struct
                                     {
        float4 fc[1];
  

    } FcItemInfo;
                                     
                                     typedef struct
                                     {
        float4x4 matrix;
    }  BaseMatrix;
                                     
                                     typedef struct
                                     {
        float4x4 viewMatrix;
        float4x4 camMatrix;
        float4x4 modeMatrix;
        float4x4 rotMatrix;
    } ParticleMetalModelMatrixData;
                                     
                                     typedef struct
                                     {
        float4 clipSpacePosition [[position]];
        float2 textureCoordinate;
        
    } OutData;
                                     
                                     
                                     
                                     vertex OutData // 顶点
                                     vertexShader(uint vertexID [[ vertex_id ]],
                                                  constant BaseFloat3 *vertexArray [[ buffer(0) ]],
                                                  constant BaseFloat2 *uvsArray [[ buffer(1) ]],
                                                  constant ParticleMetalModelMatrixData *matrixdic [[ buffer(2) ]]
                                                  
                                                  ) {
        OutData out;
        //                                         out.clipSpacePosition =  projectionMatrix->matrix * modelViewMatrix->matrix * float4(vertexArray[vertexID].position, 1);
        
        
        out.clipSpacePosition = matrixdic->viewMatrix *matrixdic->camMatrix  * matrixdic->modeMatrix*matrixdic->rotMatrix * float4(vertexArray[vertexID].position, 1);
        
        
        out.textureCoordinate = uvsArray[vertexID].position;
        return out;
    }
                                     
         
                                     
                                     )];
    
    return code;
    
}
-(NSString *)getFragmentShaderString;{
    
    NSString *code     = [NSString stringWithFormat:@"%s",
                          _STRINGIFY(
                                   
                                     fragment half4 // 片元
                                     fragmentShader(OutData input [[stage_in]],
                                                    texture2d<half> textureColor [[ texture(0) ]],
                                                    constant FcItemInfo *infodata [[ buffer(1) ]]
                                    
                                                    
                                                    )
                                     {
        
        
        constexpr sampler textureSampler (mag_filter::linear,
                                          min_filter::linear,address::repeat);
        
 
        
        half4 colorTex = textureColor.sample(textureSampler, input.textureCoordinate);
        
                colorTex =colorTex* half4(infodata->fc[0]);
   
        return colorTex;
        
   
        
        
    }
                                     
                                     )];
    
    return  code;
}
@end

