//
//  Display3DFacetShader.m
//  iosgl
//
//  Created by zhao on 29/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Display3DFacetShader.h"
#import "Scene3D.h"

@implementation Display3DFacetShader
+(NSString*)shaderStr;
{
    return @"Display3DFacetShader";
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
                                       float4 clipSpacePosition [[position]];
                                       float2 textureCoordinate;
                                       
                                   } ModelRasterizerData;
                                   vertex ModelRasterizerData // 顶点
                                   vertexShadeFacet(uint vertexID [[ vertex_id ]],
                                                constant ModelVertex *vertexArray [[ buffer(0) ]],
                                                constant ModelMatrixView *matrix [[ buffer(1) ]]) {
                                       ModelRasterizerData out;
                                       out.clipSpacePosition = matrix->projectionMatrix * matrix->modelViewMatrix * vertexArray[vertexID].position;
                                       out.textureCoordinate = vertexArray[vertexID].textureCoordinate;
                                     
                                       
                                       return out;
                                   }
                                    
                                   fragment float4 // 片元
                                     fragmentShadeFacet(ModelRasterizerData input [[stage_in]],
                                                  texture2d<half> textureColor [[ texture(0) ]])
                                   {
                                       constexpr sampler textureSampler (mag_filter::linear,
                                                                         min_filter::linear);
                                       
                                       half4 colorTex = textureColor.sample(textureSampler, input.textureCoordinate);
                                    
                                       return float4(colorTex);
                                   }
 
                                     )];
 
 
 
    
    return [NSString stringWithFormat:@"%@\n%@\n%@", includes, imports, code];
}
 

-(void)mtlEncode
{
    MTKView *mtkView=self.scene3D.context3D. mtkView;
 
    __autoreleasing NSError *error = nil;
    NSString* librarySrc = [self makeTestShader];
    id<MTLLibrary> defaultLibrary = [mtkView.device newLibraryWithSource:librarySrc options:nil error:&error];
    id<MTLFunction> vertexFunction = [defaultLibrary newFunctionWithName:@"vertexShadeFacet"];
    id<MTLFunction> fragmentFunction = [defaultLibrary newFunctionWithName:@"fragmentShadeFacet"];
    
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

//uvMove
-(NSString *)getVertexShaderString;{
    char* relplayChat =
    "attribute vec3 v3Position;\n"
    "attribute vec2 v2TexCoord;\n"
    "uniform mat4 viewMatrix;\n"
    "uniform mat4 camMatrix;\n"
    "uniform mat4 modeMatrix;\n"
    "uniform mat4 rotMatrix;\n"
    "uniform vec2 uvMove;\n"
    "varying vec2 v0;\n"
    "void main()"
    "{"
         "v0=v2TexCoord.xy+uvMove.xy;\n"
        "vec4 vPos = vec4(v3Position.xyz,1.0);\n"
        "gl_Position = vPos*rotMatrix*modeMatrix* camMatrix* viewMatrix;\n"
    "}";
    return    [ NSString stringWithFormat:@"%s" ,relplayChat];
    
}
-(NSString *)getFragmentShaderString;{
    char* relplayChat =
    "precision mediump float;\n"
    "uniform sampler2D fs0;\n"
    "varying vec2 v0;\n"
    "void main()"
    "{"
        "vec4 infoUv   =texture2D(fs0,v0.xy);\n"
        "gl_FragColor =infoUv;\n"
    "}";
    return    [ NSString stringWithFormat:@"%s" ,relplayChat];
}
@end

