 
#import "Display3DBallPartilceShader.h"
#import "Scene3D.h"

@implementation Display3DBallPartilceShader
+(NSString*)shaderStr;
{
    return @"Display3DBallPartilceShader";
}
 
- (void)encodeVstr:(NSString *)vstr encodeFstr:(NSString *)fstr
{
    [self mtlEncode];
}

- (NSString *)makeTestShader
{
    NSString *includes = stringifyHeaderincludeArray(@[@"metal_stdlib", @"simd/simd.h" ]);
    NSString *imports  =@"";
    includes=@"";
     
 
 
 
    
    
    NSString * funAllStr=[NSString stringWithFormat:@"%s",
                   _STRINGIFY(

                              using namespace metal;
                              
                              
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
        float4x4 matrix;
    }  BaseMatrix;
                              
                              typedef struct
    {
        float4x4 viewMatrix;
        float4x4 camMatrix;
        float4x4 modeMatrix;
        float4x4 rotMatrix;
    } ParticleMetalMatrixData;
                              
                              typedef struct
    {
        float4 vcmat50;
        float4 vcmat51;
        float4 vcmat52;
        float4 vcmat53;
        
    } ParticleMetalBallVcmatData;
                              
                              typedef struct
    {
        float4 clipSpacePosition [[position]];
        float2 uvs;
        float4 outColor;
        float2 coloruv;
        
    } OutData;
                    
                              )];
    
    char* funCharStr=
    "float CTM(float4 basePos,constant ParticleMetalBallVcmatData *vcmatDatadic  ) {\n"
        "float4 vcmat50=vcmatDatadic->vcmat50;\n"
        "float t = vcmat50.x- basePos.w;\n"
        "if (vcmat50.w > 0.0 && t >= 0.0) {\n"
            "t = fract(t /vcmat50.z) * vcmat50.z;\n"
        "}\n"
        "return t;\n"
    "}\n"
    "float STM(float ctime,constant ParticleMetalBallVcmatData *vcmatDatadic ) {\n"
        "float4 vcmat51=vcmatDatadic->vcmat51;\n"
        "float t = ctime - vcmat51.w;\n"
        "t = max(t,0.0);\n"
        "return t;\n"
    "}\n"
    "float4 S_POS(float4 pos ,float stime,constant ParticleMetalBallVcmatData *vcmatDatadic) {\n"
        "float4 vcmat51=vcmatDatadic->vcmat51;\n"
        "float4 vcmat52=vcmatDatadic->vcmat52;\n"
        "float sf = vcmat51.x * stime;\n"
        "if (vcmat51.y != 0.0 && vcmat51.z != 0.0) {\n"
            "sf += sin(vcmat51.y * stime) * vcmat51.z;\n"
        "}\n"
        "sf=min(sf,vcmat52.z);\n"
        "sf=max(sf,vcmat52.w);\n"
        "float2 sv2 = float2(vcmat52.x * sf, vcmat52.y * sf);\n"
        "sv2 = sv2 + 1.0;\n"
        "pos.x *= sv2.x;\n"
        "pos.y *= sv2.y;\n"
        "return pos;\n"
    "}\n"
    "float4 R_POS(float4 pos ,float ctime,float2 rotation){\n"
        "float angle = rotation.x + rotation.y * ctime;\n"
        "float4 np = float4(sin(angle), cos(angle), 0, 0);\n"
        "np.z = np.x * pos.y + np.y * pos.x;\n"
        "np.w = np.y * pos.y - np.x * pos.x;\n"
        "pos.xy = np.zw;\n"
        "return pos;\n"
    "}\n"
    "float3 ADD_POS( float3 speed ,float ctime,constant ParticleMetalBallVcmatData *vcmatDatadic  )\n"
    "{\n"
        "float3 addPos = speed * ctime;\n"
        "float3 uspeed = float3(0,0,0);\n"
        "float4 vcmat50=vcmatDatadic->vcmat50;\n"
        "float4 vcmat53=vcmatDatadic->vcmat53;\n"
    
  
                   "if(vcmat50.y != 0.0 && length(speed) != 0.0) {\n"
                   "uspeed = float3(speed.x, speed.y, speed.z);\n"
                   "uspeed = normalize(uspeed);\n"
                   "uspeed = uspeed * vcmat50.y;\n"
                   "uspeed.xyz = uspeed.xyz + vcmat53.xyz;\n"
                   "} else {\n"
                   "uspeed = float3(vcmat53.x, vcmat53.y, vcmat53.z);\n"
                   "}\n" 
                   "addPos.xyz = addPos.xyz + uspeed.xyz * ctime * ctime;\n"
    
    
        "return addPos;\n"
    "}";

    funAllStr=[funAllStr stringByAppendingString:[NSString stringWithFormat:@"%s",funCharStr]];
    
    
    
    
 
    return  [NSString stringWithFormat:@"%@%@\n%@\n%@",includes, funAllStr, [self getVertexShaderString], [self getFragmentShaderString]];
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
    
    NSInteger hasParticle=  [[self.paramAry objectAtIndex:0]integerValue] ;
    NSInteger hasRandomClolr=  [[self.paramAry objectAtIndex:1]integerValue] ;
    NSInteger isMul=  [[self.paramAry objectAtIndex:2]integerValue] ;
    NSInteger needRotation=  [[self.paramAry objectAtIndex:3]integerValue] ;
    NSInteger needScale=  [[self.paramAry objectAtIndex:4]integerValue] ;
    NSInteger needAddSpeed=  [[self.paramAry objectAtIndex:5]integerValue] ;
    NSInteger uvType=  [[self.paramAry objectAtIndex:6]integerValue] ;
    
    
 
NSString* mainBaseStr=[NSString stringWithFormat:@"%s",
_STRINGIFY(
{
    float4 vcmat50=vcmatDatadic->vcmat50;
    OutData out;
    float4 pos=float4(posBuff[vertexID].position.xyz , 1);
    float4 basepos=float4(basePosBuff[vertexID].position.xyzw);
    float3 speed= speedBuff[vertexID].position.xyz ;
    float3 uvs= uvsBuff[vertexID].position.xyz ;
    float ctime = CTM(basepos,vcmatDatadic);
    float stime = STM(ctime,vcmatDatadic);
    pos=pos*matrixdic->rotMatrix;
    pos.xyz=pos.xyz+basepos.xyz;
    if (ctime < 0.0 || ctime > vcmat50.z) {
        pos.x =0.0;
        pos.y =0.0;
    }else{
        float3 addPos =ADD_POS(speed,ctime,vcmatDatadic);
        pos.xyz=pos.xyz+addPos.xyz;
    }
    out.clipSpacePosition =  matrixdic->viewMatrix *matrixdic->camMatrix  * matrixdic->modeMatrix  * pos;
    out.coloruv=float2(ctime/vcmat50.z,0.0);
    out.uvs=float2(uvs.xy);
    out.outColor=float4(1,0,0,1);
    return out;
    }
)
];
    
    
    
 
    
    
    NSString* inputDataStr= [NSString stringWithFormat:@"%s",
                             ",constant BaseFloat4 *posBuff [[ buffer(0) ]]"
                             ",constant BaseFloat4 *basePosBuff [[ buffer(1) ]]"
                             ",constant BaseFloat3 *speedBuff [[ buffer(2) ]]"
                             ",constant BaseFloat3 *uvsBuff [[ buffer(3) ]]"
                             ",constant ParticleMetalMatrixData *matrixdic [[ buffer(4) ]]"
                             ",constant ParticleMetalBallVcmatData *vcmatDatadic [[ buffer(5) ]]"
                               ];
     
    char* rotationStr=_STRINGIFY();
    if(needRotation>0){//旋转
        inputDataStr= [inputDataStr stringByAppendingString:[NSString stringWithFormat:@"%s",
                                               ",constant BaseFloat4 *rotationBuff [[ buffer(6) ]]" ]];
        
        
        rotationStr="float3 rotation= rotationBuff[vertexID].position.xyz ;\n"
                    "pos =R_POS(pos,ctime,float2(rotation.x,rotation.y));\n";
    }
    char* scaleStr=_STRINGIFY(); ;//缩放比例
    if(needScale>0){
        scaleStr=  "pos = S_POS(pos,stime,vcmatDatadic);\n" ;
    }
    NSString* vertexInputDataStr=[NSString stringWithFormat:@"%s%@%s","vertex OutData  vertexShader(uint vertexID [[ vertex_id ]]",inputDataStr,")"];
    NSString* mainMathInfo=  [NSString stringWithFormat:@"%s%s%s%s",_STRINGIFY(
                                                                         
float4 pos=float4(posBuff[vertexID].position.xyz , 1);
float4 basepos=float4(basePosBuff[vertexID].position.xyzw);
float3 speed= speedBuff[vertexID].position.xyz ;
float3 uvs= uvsBuff[vertexID].position.xyz ;


float ctime = CTM(basepos,vcmatDatadic);
float stime = STM(ctime,vcmatDatadic);

 

),rotationStr,scaleStr,_STRINGIFY(
          

          pos=pos*matrixdic->rotMatrix;
          pos.xyz=pos.xyz+basepos.xyz;
          float4 vcmat50=vcmatDatadic->vcmat50;




          if (ctime < 0.0 || ctime > vcmat50.z) {
              pos.x =0.0;
              pos.y =0.0;
          }else{
              float3 addPos =ADD_POS(speed,ctime,vcmatDatadic);
              pos.xyz=pos.xyz+addPos.xyz;
          }


                                           out.clipSpacePosition =  matrixdic->viewMatrix *matrixdic->camMatrix  * matrixdic->modeMatrix  * pos;
                                        


          out.coloruv=float2(ctime/vcmat50.z,0.0);
          out.uvs=float2(uvs.xy);
          out.outColor=float4(1,0,0,1);

                  )];
    
    mainBaseStr= [ vertexInputDataStr stringByAppendingString: [NSString stringWithFormat:@"%s%@%s",
                                                                _STRINGIFY(
                                                                        
       {
                                              OutData out;

                                            
                                                                           ),   mainMathInfo     ,        _STRINGIFY(
                                                                                                                                                                                                                                                                                                                                                        return out;
                                                                                                                                                                                                                                                             }
                                                                                                                                                                                                                                                             )]];
    return mainBaseStr;
    
}
 
-(NSString *)getFragmentShaderString;{
    NSString* code= [NSString stringWithFormat:@"%s",
                     _STRINGIFY(
                                
                                 
                                fragment float4 // 片元
                                fragmentShader(OutData input [[stage_in]],
                                               texture2d<half> textureColor0 [[ texture(0) ]],
                                               texture2d<half> textureColor1 [[ texture(1) ]]
                                               )
                                {
                            
                                    half4 colorTex = half4(1, 0,0, 1);
   

   constexpr sampler textureSampler (mag_filter::linear,
                                     min_filter::linear);
   
   half4 ft0 = textureColor0.sample(textureSampler, input.uvs);
   half4 ft1 = textureColor1.sample(textureSampler, input.coloruv);
        colorTex=ft0*ft1;
                                    return float4(colorTex);
                                }
                                
                                )];
    
    return code;
}
@end
 

