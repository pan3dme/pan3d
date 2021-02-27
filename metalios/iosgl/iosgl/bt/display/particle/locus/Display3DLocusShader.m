//
//  Display3DLocusShader.m
//  iosgl
//
//  Created by zhao on 25/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Display3DLocusShader.h"
#import "Scene3D.h"

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
        float4 clipSpacePosition [[position]];
        float2 textureCoordinate;
        
    } OutData;
                                     
                                     
                                     
                                     vertex OutData // 顶点
                                     vertexShader(uint vertexID [[ vertex_id ]],
                                                  constant BaseFloat3 *vertexArray [[ buffer(0) ]],
                                                  constant BaseFloat2 *uvsArray [[ buffer(1) ]],
                                                  constant BaseFloat4 *nrmsArray [[ buffer(2) ]],
                                                  constant ParticleMetalMatrixData *matrixdic [[ buffer(3) ]]
                                                  
                                                  ) {
        OutData out;
     
        
        out.clipSpacePosition = matrixdic->viewMatrix *matrixdic->camMatrix  * matrixdic->modeMatrix*  float4(vertexArray[vertexID].position, 1);
        
        
        out.textureCoordinate = uvsArray[vertexID].position;
        return out;
    }
                                     
                                     fragment half4 // 片元
                                     fragmentShader(OutData input [[stage_in]],
                                                    texture2d<half> textureColor [[ texture(0) ]],
                                                    constant FcItemInfo *infodata [[ buffer(1) ]]
                                    
                                                    
                                                    )
                                     {
        
        
        constexpr sampler textureSampler (mag_filter::linear,
                                          min_filter::linear);
        
        half4 colorTex = textureColor.sample(textureSampler, input.textureCoordinate);
        
       
          return colorTex;
        
        
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
    char* relplayChat =
    "attribute vec3 v3Position;\n"
    "attribute vec2 v2TexCoord;\n"
    "attribute vec4 v3Normal;\n"
    "uniform mat4 viewMatrix;\n"
    "uniform mat4 camMatrix;\n"
    "uniform mat4 modeMatrix;\n"
    "uniform vec4 vcmat30;\n"
    "uniform vec4 vcmat31;\n"
    "varying vec2 v0;\n"
    "varying vec2 v1;\n"
    "varying vec4 v2;\n"
    "void main()"
    "{"
    
        "vec2 tempv0 = v2TexCoord;\n"
        "tempv0.x -= vcmat30.x;\n"
        "float alpha = tempv0.x/vcmat30.y;\n"
        "alpha = 1.0 - clamp(abs(alpha),0.0,1.0);\n"
        "float kill = -tempv0.x;\n"
        "kill *= tempv0.x - vcmat30.z;\n"
        "v2 = vec4(kill,0.0,0.0,alpha);\n"
        "v1 = v2TexCoord;\n"
        "v0 = tempv0;\n"
 
        "vec4 tempPos = modeMatrix * vec4(v3Position.xyz,1.0);\n"
        "vec3 mulPos = vec3(tempPos.x,tempPos.y,tempPos.z);\n"
        "vec3 normals = vec3(v3Normal.x,v3Normal.y,v3Normal.z);\n"
        "mulPos = normalize(vec3(vcmat31.xyz) - mulPos);\n"
        "mulPos = cross(mulPos, normals);\n"
        "mulPos = normalize(mulPos);\n"
        "mulPos *= v3Normal.w*1.0  ;\n"
        "tempPos.xyz = mulPos.xyz + v3Position.xyz;\n"
    
        "gl_Position = tempPos*modeMatrix* camMatrix* viewMatrix;\n"
    
    "}";
    return    [ NSString stringWithFormat:@"%s" ,relplayChat];
    
}

-(NSString *)getFragmentShaderString;{
    char* relplayChat =
    "precision mediump float;"
    "uniform sampler2D fs0;"
    "uniform sampler2D fs1;"
    "uniform vec4 fc[1];"
    "varying vec2 v0;"
    "varying vec4 v2;"
    "varying vec2 v1;"
    "void main(void){"
    "vec4 ft0 = texture2D(fs0,v0);"
    "ft0.xyz *= ft0.w;"
    "vec4 ft1 = texture2D(fs1,v1);"
    "ft1.xyz = ft1.xyz * ft1.w;"
    "vec4 ft2 = ft0 * ft1;"
    "ft0 = ft2 * v2.w;"
    "ft1.xyz = ft0.xyz;"
    "ft1.w = ft0.w;"
    "if(v2.x<fc[0].x){discard;}"
    "gl_FragColor = ft1;"
    "}";
    return    [ NSString stringWithFormat:@"%s" ,relplayChat];
}
 
@end

/*
 "uniform sampler2D fs0;"
 "uniform sampler2D fs1;"
 "uniform vec4 fc[1];"
 "varying vec2 v0;"
 "varying vec4 v2;"
 "varying vec2 v1;"
 "void main(void){"
     "vec4 ft0 = texture2D(fs0,v0);"
     "ft0.xyz *= ft0.w;"
     "vec4 ft1 = texture2D(fs1,v1);"
     "ft1.xyz = ft1.xyz * ft1.w;"
     "vec4 ft2 = ft0 * ft1;"
     "ft0 = ft2 * v2.w;"
     "ft1.xyz = ft0.xyz;"
     "ft1.w = ft0.w;"
     "if(v2.x<fc[0].x){discard;}"
     "gl_FragColor = ft1;"
 "}";
 */
