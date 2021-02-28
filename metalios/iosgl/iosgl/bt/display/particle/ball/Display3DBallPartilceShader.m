//
//  Display3DBallPartilceShader.m
//  iosgl
//
//  Created by zhao on 26/2/2020.
//  Copyright © 2020 zhao. All rights reserved.
//
/*
 attribute vec4 vPosition;
 attribute vec3 texcoord;
 attribute vec4 basePos;
 attribute vec3 speed;
 uniform mat4 vcmat[7];
 varying vec2 v0;
 varying vec2 v1;
 void main(){
 float ctime = vcmat[5][0].x - basePos.w;
 if (vcmat[5][0].w > 0.0 && ctime >= 0.0) {
     ctime = fract(ctime / vcmat[5][0].z) * vcmat[5][0].z;
 }
 vec4 pos = vec4(vPosition.xyz,1.0);
 float stime = ctime - vcmat[5][1].w;
 stime = max(stime,0.0);
 float sf = vcmat[5][1].x * stime;
 if (vcmat[5][1].y != 0.0 && vcmat[5][1].z != 0.0) {
 }
 if (sf > vcmat[5][2].z) {
 } else if (sf < vcmat[5][2].w) {
 }
 vec2 sv2 = vec2(vcmat[5][2].x * sf, vcmat[5][2].y * sf);
 sv2 = sv2 + 1.0;
 pos.x *= sv2.x;
 pos.y *= sv2.y;
 vec3 addPos = speed * ctime;
 vec3 uspeed = vec3(0,0,0);
 if (ctime < 0.0 || ctime >= vcmat[5][0].z) {
     addPos.y = addPos.y + 100000.0;
 }
 if(vcmat[5][0].y != 0.0 && length(speed) != 0.0) {
     uspeed = vec3(speed.x, speed.y, speed.z);
     uspeed = normalize(uspeed);
     uspeed = uspeed * vcmat[5][0].y;
     uspeed.xyz = uspeed.xyz + vcmat[5][3].xyz;
 } else {
     uspeed = vec3(vcmat[5][3].x, vcmat[5][3].y, vcmat[5][3].z);
 }
 addPos.xyz = addPos.xyz + uspeed.xyz * ctime * ctime;
 pos = vcmat[3] * pos;
 pos.xyz = pos.xyz + basePos.xyz + addPos.xyz;
 gl_Position = vcmat[0] * vcmat[1] * vcmat[2] * pos;
 v0 = vec2(texcoord.x,texcoord.y);
 v1 = vec2(ctime/vcmat[5][0].z,1.0);
 }
 ProgramManager.ts:96 precision mediump float;
 uniform sampler2D fs0;
 uniform sampler2D fs1;
 uniform vec4 fc[1];
 varying vec2 v0;
 varying vec2 v1;
 void main(void){
    gl_FragColor = vec4(1.0,0.0,1.0,1.0);
  }
 */
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
     
    
//    var hasParticle: number = this.paramAry[0];
//            var hasRandomClolr: number = this.paramAry[1];
//            var isMul: number = this.paramAry[2];
//            var needRotation: number = this.paramAry[3];
//            var needScale: number = this.paramAry[4];
//            var needAddSpeed: number = this.paramAry[5];
//            var uvType: number = this.paramAry[6];
    
    NSInteger hasParticle=  [[self.paramAry objectAtIndex:0]integerValue] ;
    NSInteger hasRandomClolr=  [[self.paramAry objectAtIndex:1]integerValue] ;
    NSInteger isMul=  [[self.paramAry objectAtIndex:2]integerValue] ;
    NSInteger needRotation=  [[self.paramAry objectAtIndex:3]integerValue] ;
    NSInteger needScale=  [[self.paramAry objectAtIndex:4]integerValue] ;
    NSInteger needAddSpeed=  [[self.paramAry objectAtIndex:5]integerValue] ;
    NSInteger uvType=  [[self.paramAry objectAtIndex:6]integerValue] ;
    
    
    NSString * mainBaseStr= @"";
    NSString * fragmentFunStr= @"";
    
    
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
        "return addPos;\n"
    "}";

    funAllStr=[funAllStr stringByAppendingString:[NSString stringWithFormat:@"%s",funCharStr]];
    
    
    
    
mainBaseStr=[NSString stringWithFormat:@"%s",
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
    
    fragmentFunStr= [NSString stringWithFormat:@"%s",
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
    
 
    return  [NSString stringWithFormat:@"%@%@\n%@\n%@",includes, funAllStr, mainBaseStr, fragmentFunStr];
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
    "attribute vec4 vPosition;\n"
    "attribute vec3 texcoord;\n"
    "attribute vec4 basePos;\n"
    "attribute vec3 speed;\n"
    "uniform mat4 viewMatrix;\n"
    "uniform mat4 camMatrix;\n"
    "uniform mat4 modeMatrix;\n"
    "uniform mat4 rotMatrix;\n"
    
    "uniform vec4 vcmat50;\n"
    "uniform vec4 vcmat51;\n"
    "uniform vec4 vcmat52;\n"
    "uniform vec4 vcmat53;\n"
 
    "varying vec2 v0;\n"
    "varying vec2 v1;\n"
    "varying vec3 outvec3;\n"
   
    "vec4 IW(vec4 v) {\n"
       "return v*modeMatrix* camMatrix* viewMatrix;\n"
    "}\n"
    "float CTM() {\n"
        "float t = vcmat50.x- basePos.w;\n"
        "if (vcmat50.w > 0.0 && t >= 0.0) {\n"
            "t = fract(t /vcmat50.z) * vcmat50.z;\n"
        "}\n"
        "return t;\n"
     "}\n"
    
    "float STM(float ctime) {\n"
        "float t = ctime - vcmat51.w;\n"
        "t = max(t,0.0);\n"
        "return t;\n"
    "}\n"
    
    "vec4 S_POS(vec4 pos ,float stime) {\n"
        "float sf = vcmat51.x * stime;\n"
        "if (vcmat51.y != 0.0 && vcmat51.z != 0.0) {\n"
            "sf += sin(vcmat51.y * stime) * vcmat51.z;\n"
        "}\n"
        "sf=min(sf,vcmat52.z);\n"
        "sf=max(sf,vcmat52.w);\n"
        "vec2 sv2 = vec2(vcmat52.x * sf, vcmat52.y * sf);\n"
        "sv2 = sv2 + 1.0;\n"
        "pos.x *= sv2.x;\n"
        "pos.y *= sv2.y;\n"
        "return pos;\n"
    "}"
    
    "vec3 ADD_POS(vec3 speed ,float ctime) {\n"
        "vec3 addPos = speed * ctime;\n"
        "vec3 uspeed = vec3(0,0,0);\n"
        "if(vcmat50.y != 0.0 && length(speed) != 0.0) {\n"
            "uspeed = vec3(speed.x, speed.y, speed.z);\n"
            "uspeed = normalize(uspeed);\n"
            "uspeed = uspeed * vcmat50.y;\n"
            "uspeed.xyz = uspeed.xyz + vcmat53.xyz;\n"
        "} else {\n"
            "uspeed = vec3(vcmat53.x, vcmat53.y, vcmat53.z);\n"
        "}\n"
        "addPos.xyz = addPos.xyz + uspeed.xyz * ctime * ctime;\n"
        "return addPos;\n"
      "}\n"
    
    "void main()\n"
    "{\n"
        "vec4 pos = vec4(vPosition.xyz,1.0);\n"
        "float ctime = CTM();\n"
        "float stime = STM(ctime);\n"
    
        "if (ctime < 0.0 || ctime > vcmat50.z) {\n"  //时间周期内-1；
            "pos.x =0.0;\n" //设置不可见
            "pos.y =0.0;\n"//设置不可见
        "}else{\n"
            "pos = S_POS(pos,stime);\n"  //缩放比例
            "pos = rotMatrix* pos;\n"   //面向视角
            "vec3 addPos =ADD_POS(speed,ctime);\n" //加速度
            "pos.xyz = pos.xyz + basePos.xyz + addPos.xyz;\n"
        "}\n"
        "gl_Position =IW(pos);\n"
        "v0=vec2(texcoord.xy);\n"
        "v1=vec2(ctime/vcmat50.z,0.0);\n"
   
    "}";
    
    
    return    [ NSString stringWithFormat:@"%s" ,relplayChat];
    
}
/*
 precision mediump float;
 uniform sampler2D fs0;
 uniform sampler2D fs1;
 uniform vec4 fc[1];
 varying vec2 v0;
 varying vec2 v1;
 void main(void){

 vec4 ft0 = texture2D(fs0,v0);
 ft0.xyz *= ft0.w;
 vec4 ft1 = texture2D(fs1,v1);
 ft1.xyz = ft1.xyz * ft1.w;
 vec4 ft2 = ft0 * fc[0];
 ft0 = ft2 * ft1;
 ft1.xyz = ft0.xyz;
 ft1.w = ft0.w;

 gl_FragColor = ft1;
 */
-(NSString *)getFragmentShaderString;{
    char* relplayChat =
    "precision mediump float;\n"
    "uniform sampler2D fs0;\n"
    "uniform sampler2D fs1;\n"
    "uniform vec4 fc[1];\n"
    "varying vec2 v0;\n"
    "varying vec2 v1;\n"
    "varying vec3 outvec3;\n"

    "void main()"
    "{"
        "vec4 infoUvf0  =texture2D(fs0,v0.xy);\n"
        "vec4 infoUvf1  =texture2D(fs1,v1.xy);\n"
        "gl_FragColor =vec4(1.0,0.0,0.0,1.0);\n"
    "}";
    return    [ NSString stringWithFormat:@"%s" ,relplayChat];
}
@end
/*
uniform sampler2D fs0;
uniform sampler2D fs1;
uniform vec4 fc[1];
varying vec2 v0;
varying vec2 v1;
void main(void){

vec4 ft0 = texture2D(fs0,v0);
ft0.xyz *= ft0.w;
vec4 ft1 = texture2D(fs1,v1);
ft1.xyz = ft1.xyz * ft1.w;
vec4 ft2 = ft0 * fc[0];
ft0 = ft2 * ft1;
ft1.xyz = ft0.xyz;
ft1.w = ft0.w;

gl_FragColor = ft1;

}
*/

