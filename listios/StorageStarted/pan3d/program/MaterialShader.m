//
//  MaterialShader.m
//  iosgl
//
//  Created by zhao on 22/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "MaterialShader.h"
#import "Scene3D.h"
#import "MaterialShaderType.h"


@implementation MaterialShader
+(NSString*)shaderStr;
{
    return @"MaterialShader";
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
        float4 vPosition [[position]];
        float2 vTextCoord;
        float2 vTextLight;
        
    } MaterialOutVertices;
                                     
           
                                     
      
                                     
                                     typedef struct
           {
               float4 position;
           } BaseFloat4;
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
    } MaterialMatrix;
                                     
                                     
  
       
                                     )];
    
    //输入索引，顶点，纹理，矩阵
    NSString * outBaseStr    = [self getVertexShaderString];
    NSString * outfragmentStr    = [self getFragmentShaderString];
    code=   [code stringByAppendingString:outBaseStr];
    code=   [code stringByAppendingString:outfragmentStr];
 
  
    
    return [NSString stringWithFormat:@"%@\n%@\n%@", includes, imports, code];
}
- (NSString *)getFragmentShaderString
{
    MaterialShader* this=self;
    BOOL noLight = [this.paramAry[6]boolValue];
    
    
  

    
    NSString* baseStr=  @"fragment float4   fragmentMaterialShader(MaterialOutVertices input [[stage_in]],\n"
    "texture2d<half> textureColor [[ texture(0)]] )\n"
    "{\n"
    "constexpr sampler textureSampler (mag_filter::linear, min_filter::linear);\n"
    "half4 colorTexA = textureColor.sample(textureSampler, input.vTextCoord);\n"
 
    "float4 outInfo=float4(colorTexA);\n"
  
    "return outInfo;\n"
    "}";
    
    NSString* lightUvTextureStr=@"texture2d<half> textureColor [[ texture(0)]]\n";
    if(!noLight){
        lightUvTextureStr= [lightUvTextureStr stringByAppendingString:@",texture2d<half> lightTexture [[ texture(1)]]\n"];
    }
    NSString* mainStr=@ " ";
    if(noLight){
        mainStr=@ "float4 outInfo=float4(colorTexA);\n";
    }else{
        mainStr=@ "half4 colorTexB = lightTexture.sample(textureSampler, input.vTextLight);\n"
        "float4 outInfo=float4(colorTexA*colorTexB*2.0f);\n";
    }
    NSString* kkk=[NSString stringWithFormat:@"%s%@%s%@%s", "fragment float4   fragmentMaterialShader(MaterialOutVertices input [[stage_in]],\n"
                   ,lightUvTextureStr,
                   "){\n"
                   "constexpr sampler textureSampler (mag_filter::linear, min_filter::linear);\n"
                   "half4 colorTexA = textureColor.sample(textureSampler, input.vTextCoord);\n"
                
                   "if (colorTexA.w <= 0.8) {\n"
                 
                    "   discard_fragment();\n"
                  "};\n"

                   
                   ,mainStr,
                 
                   "return outInfo;\n"
                   "}"];

    
    return kkk;
}
-(NSString*)getVertexShaderString
{
    MaterialShader* this=self;
    BOOL usePbr    = [this.paramAry[0] boolValue];
    BOOL useNormal = [this.paramAry[1]boolValue];
//    BOOL hasFresnel = [this.paramAry[2] boolValue];
//    BOOL useDynamicIBL = [this.paramAry[3] boolValue];
//    BOOL lightProbe = [this.paramAry[4]boolValue];
    BOOL directLight = [this.paramAry[5]boolValue];
    BOOL noLight = [this.paramAry[6]boolValue];
    BOOL fogMode = [this.paramAry[7]boolValue];
    
    int matrix_star_id=2;
 
    
    NSString* str=  @"vertex MaterialOutVertices   vertexMaterialShader (uint vertexID [[ vertex_id ]],\n"
    "constant BaseFloat3 *v3Position [[ buffer(0) ]],\n"
    "constant BaseFloat2 *v2TexCoord [[ buffer(1) ]],\n";
    NSString* addstr=@"";
    
    if (directLight) {
//        addstr= @"varying vec3 v2;\n";
//        str=  [str stringByAppendingString:addstr];
    } else if (noLight) {
        
    } else {
        matrix_star_id++; //3索引加1
        addstr=
        @"constant BaseFloat2 *v2LightUv [[ buffer(2) ]],\n";
        str=  [str stringByAppendingString:addstr];
    }
    if (usePbr) {
        /*
        addstr=
        @"attribute vec3 v3Normal;\n"
        "varying vec3 v1;\n";
        str=  [str stringByAppendingString:addstr];
        if (!useNormal) {
            addstr=  @"varying vec3 v4;\n";
            str=  [str stringByAppendingString:addstr];
        } else {
            addstr= @"varying mat3 v4;\n";
            str=  [str stringByAppendingString:addstr];
        }
        */
    } else if (fogMode != 0) {
        /*
        addstr=
        @"varying vec3 v1;\n";
        str=  [str stringByAppendingString:addstr];
         */
    }
    if (useNormal) {
        /*
        addstr=
        @"attribute vec3 v3Tangent;\n"
        "attribute vec3 v3Bitangent;\n";
        str=  [str stringByAppendingString:addstr];
         */
    }
    if (directLight) {
        /*
        if (!usePbr) {
            addstr=
            @"attribute vec3 v3Normal;\n";
            str=  [str stringByAppendingString:addstr];
        }
        addstr=
        @"uniform vec3 sunDirect;\n"
        "uniform vec3 sunColor;\n"
        "uniform vec3 ambientColor;\n";
        str=  [str stringByAppendingString:addstr];
         */
    }
    addstr=[NSString stringWithFormat:
    @"constant MaterialMatrix *viewMatrix [[ buffer(%d) ]],\n" //3
    "constant MaterialMatrix *posMatrix [[ buffer(%d) ]]\n"    //4
    ")\n",matrix_star_id,matrix_star_id+1];
    str=  [str stringByAppendingString:addstr];
 
    addstr=@"{\n"
    "MaterialOutVertices out;\n"
  
    
    "out.vPosition = viewMatrix->matrix * posMatrix->matrix * float4(v3Position[vertexID].position.xyz,1.0);\n"
    "out.vTextCoord = v2TexCoord[vertexID].position.xy;\n"  ;
    
    str=  [str stringByAppendingString:addstr];
     
    if (!(directLight || noLight)) {
        addstr=  @"out.vTextLight = v2LightUv[vertexID].position.xy;\n";
        str=  [str stringByAppendingString:addstr];
      
    }
    if (usePbr || fogMode != 0) {
        /*
        addstr=
        @"v1 = vec3(vt0.x,vt0.y,vt0.z);\n";
        str=  [str stringByAppendingString:addstr];
        */
    }
    /*
    addstr=
    @"vt0 = vt0*vpMatrix3D ;\n";
    str=  [str stringByAppendingString:addstr];
    */
    if (usePbr) {
        /*
        if (!useNormal) {
            addstr=  @"v4 =v3Normal* rotationMatrix3D ;\n";
            str=  [str stringByAppendingString:addstr];
        } else {
            addstr=
            @"v4 = mat3(v3Tangent*rotationMatrix3D  ,v3Bitangent*rotationMatrix3D ,v3Normal* rotationMatrix3D );\n";
            str=  [str stringByAppendingString:addstr];
        }
        */
    }
    if (directLight) {/*
        if (!usePbr) {
            addstr=
            @"vec3 n = v3Normal*rotationMatrix3D ;\n"
            "float suncos = dot(n.xyz,sunDirect.xyz);\n";
            str=  [str stringByAppendingString:addstr];
        } else {
            addstr=
            @"float suncos = dot(v4.xyz,sunDirect.xyz);\n";
            str=  [str stringByAppendingString:addstr];
        }
        
        addstr=
        @"suncos = clamp(suncos,0.0,1.0);\n"
        "v2 = sunColor * suncos + ambientColor;";
        str=  [str stringByAppendingString:addstr];
                       */
        
    }
    addstr=@"return out;\n}";
    str=  [str stringByAppendingString:addstr];
 

    return str;
}

-(void)mtlEncode
{
    MTKView *mtkView=self.scene3D.context3D. mtkView;
 
    __autoreleasing NSError *error = nil;
    NSString* librarySrc = [self makeTestShader];
    id<MTLLibrary> defaultLibrary = [mtkView.device newLibraryWithSource:librarySrc options:nil error:&error];
    id<MTLFunction> vertexFunction = [defaultLibrary newFunctionWithName:@"vertexMaterialShader"];
    id<MTLFunction> fragmentFunction = [defaultLibrary newFunctionWithName:@"fragmentMaterialShader"];
    
    MTLRenderPipelineDescriptor *pipelineStateDescriptor = [[MTLRenderPipelineDescriptor alloc] init];
    pipelineStateDescriptor.vertexFunction = vertexFunction;
    pipelineStateDescriptor.fragmentFunction = fragmentFunction;
    pipelineStateDescriptor.colorAttachments[0].pixelFormat = mtkView.colorPixelFormat;
    pipelineStateDescriptor.depthAttachmentPixelFormat =  mtkView.depthStencilPixelFormat;
    pipelineStateDescriptor.stencilAttachmentPixelFormat = mtkView.depthStencilPixelFormat;
    
    MTLRenderPipelineColorAttachmentDescriptor *renderbufferAttachment = pipelineStateDescriptor.colorAttachments[0];
    
    renderbufferAttachment.pixelFormat = MTLPixelFormatBGRA8Unorm;
    
    
    renderbufferAttachment.blendingEnabled = NO;
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
        depthStateDesc.depthWriteEnabled = YES;
        self.relaxedDepthState = [self.scene3D.mtkView.device newDepthStencilStateWithDescriptor:depthStateDesc];
    }
}
@end
