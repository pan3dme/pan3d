//
//  Display3DLocusShader.m
//  iosgl
//
//  Created by zhao on 25/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Display3DLocusShader.h"
#import "Scene3D.h"
#import "Shader3D.h"

@implementation Display3DLocusShader
+(NSString*)shaderStr;
{
    return @"Display3DLocusShader";
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
     
    
    
    return [NSString stringWithFormat:@"%@\n%@\n%@%@", includes, imports, [self getVertexShaderString],  [self getFragmentShaderString]];
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
 - (NSString *)getVertexShaderString
{
    NSInteger isWatchEye=  [[self.paramAry objectAtIndex:0]integerValue] ;
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
        
    } ParticleMetalMatrixData;
                                     
                                     typedef struct
                                     {
        float4 vcmat30;
        float4 vcmat31;
        
        
    } ParticleMetalLocusVcmatData;
                                     
                                     typedef struct
                                     {
        float4 clipSpacePosition [[position]];
        
        float2 v0;
        float2 v1;
        float4 v2;
        
    } OutData;
                                     
                                     
                                     )];
    
    
    
    NSString* inputStr= @"";
    
    inputStr=[inputStr stringByAppendingFormat:@"%s",
              "vertex OutData \n"
              "vertexShader(uint vertexID [[ vertex_id ]],\n"
              "constant BaseFloat3 *vertexArray [[ buffer(0) ]]\n"
              ",constant BaseFloat2 *uvsArray [[ buffer(1) ]]\n"
              " ,constant ParticleMetalMatrixData *matrixdic [[ buffer(2) ]]\n"
              " ,constant ParticleMetalLocusVcmatData *vcmatDatadic [[ buffer(3) ]]\n"
              ];
    
    if(isWatchEye>0){
        inputStr=[inputStr stringByAppendingFormat:@"%s",
                  ",constant BaseFloat4 *nrmsArray [[ buffer(4) ]]\n"
                  ];
    }
    
    
    inputStr=[inputStr stringByAppendingFormat:@"%s",
              "     ) {\n"
              ];
    
    inputStr=[inputStr stringByAppendingFormat:@"%s",
              "OutData out;\n"
              "float4 vcmat30=vcmatDatadic->vcmat30;\n"
              "float4 vcmat31=vcmatDatadic->vcmat31;\n"
              "float2 v2TexCoord= uvsArray[vertexID].position.xy ;\n"
              "float2 tempv0 = v2TexCoord.xy;\n"
              "tempv0.x -= vcmat30.x;\n"
              "float alpha = tempv0.x/vcmat30.y;\n"
              "alpha = 1.0 - clamp(abs(alpha),0.0,1.0);\n"
              "float kill = -tempv0.x;\n"
              "kill *= tempv0.x - vcmat30.z;\n"
              "out.v2 = float4(kill,0.0,0.0,alpha);\n"
              "out.v1 = v2TexCoord;\n"
              "out.v0 = tempv0;\n"
              ];
    
    
    inputStr=[inputStr stringByAppendingFormat:@"%s",
              "float3 v3Position= vertexArray[vertexID].position.xyz ;\n"
              "float4 tempPos=matrixdic->modeMatrix*float4(v3Position.xyz,1.0);\n"
              "float3 mulPos = float3(tempPos.x,tempPos.y,tempPos.z);\n"
              
              
              ];
    
    if(isWatchEye>0){
        inputStr=[inputStr stringByAppendingFormat:@"%s",
                  
                  "float4 v3Normal= nrmsArray[vertexID].position.xyzw ;\n"
                  "float3 normals = float3(v3Normal.x,v3Normal.y,v3Normal.z);\n"
                  "mulPos=normalize(vcmat31.xyz-mulPos.xyz);\n"
                  "mulPos = cross(mulPos, normals);\n"
                  "mulPos = normalize(mulPos);\n"
                  "mulPos *= v3Normal.w*1.0  ;\n"
                  
                  ];
    }
    
    inputStr=[inputStr stringByAppendingFormat:@"%s",
              
              "tempPos.xyz = mulPos.xyz + v3Position.xyz;\n"
              "out.clipSpacePosition = matrixdic->viewMatrix *matrixdic->camMatrix\n" "*matrixdic->modeMatrix  *tempPos;\n"
              
              "return out;\n"
              ];
    
    inputStr=[inputStr stringByAppendingFormat:@"%s",
              "}\n"
              ];
    
    
    
    
    code=[code stringByAppendingString:inputStr];
    
    return code;
}
- (NSString *)getFragmentShaderString
{
    char* relplayChat =_STRINGIFY( fragment half4 // 片元
                                  fragmentShader(OutData input [[stage_in]],
                                                 texture2d<half> textureBase [[ texture(0) ]],
                                                 texture2d<half> textureColor [[ texture(1) ]],
                                                 constant FcItemInfo *infodata [[ buffer(2) ]]
                                                 
                                                 
                                                 )
                                  {
        
        
        constexpr sampler textureSampler (mag_filter::linear,
                                          min_filter::linear);
        
        
        float4 fc0=infodata->fc[0];
        
        half4 baseTex = textureBase.sample(textureSampler, input.v1);
        half4 colorTex = textureColor.sample(textureSampler, input.v1);
        colorTex*=baseTex;
        
        colorTex*=input.v2.w;
        if(input.v2.x<fc0.x){
            colorTex.x=0;
            colorTex.y=0;
            colorTex.z=0;
            colorTex.w=0;
        }
        
        
        return colorTex;
        
        
    }
                                  );
    return    [ NSString stringWithFormat:@"%s" ,relplayChat];
}

@end
 
