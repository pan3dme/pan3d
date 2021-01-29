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
    NSString *includes = stringifyIncludesArray(@[@"metal_stdlib", @"simd/simd.h" ]);
    NSString *imports  =@"";
    includes=@"";
    
    
    NSString *code     = [NSString stringWithFormat:@"%s",
                          _STRINGIFY(
                                     using namespace metal;
                                     typedef struct
                                     {
        float4 vPosition [[position]];
        float2 vTextCoord;
        
    } MaterialOutVertices;
                                     
                                     typedef struct
                                     {
        float4 position;
        float2 textureCoordinate;
    } MaterialShaderVertex;
                                     
           
                                     
                                     typedef struct
                                     {
        float4x4 matrix;
    } MaterialMatrix;
                                     
                                     
     vertex MaterialOutVertices   vertexMaterialShader(uint vertexID [[ vertex_id ]],
                                                       constant MaterialShaderVertex *vertexArray [[ buffer(0) ]],
                                                       constant MaterialMatrix *viewMatrix [[ buffer(1) ]],
                                                       constant MaterialMatrix *posMatrix [[ buffer(2) ]]
                                                       ) {
         MaterialOutVertices out;
         out.vPosition = viewMatrix->matrix * posMatrix->matrix * vertexArray[vertexID].position;
         out.vTextCoord = vertexArray[vertexID].textureCoordinate;
         return out;
     }

     fragment float4   fragmentMaterialShader(MaterialOutVertices input [[stage_in]],
                                              texture2d<half> textureColor [[ texture(0) ]])
     {
         constexpr sampler textureSampler (mag_filter::linear,
                                           min_filter::linear);
         
         half4 colorTex = textureColor.sample(textureSampler, input.vTextCoord);
         //          colorTex = half4(1, 0,0, 1);
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
    id<MTLFunction> vertexFunction = [defaultLibrary newFunctionWithName:@"vertexMaterialShader"];
    id<MTLFunction> fragmentFunction = [defaultLibrary newFunctionWithName:@"fragmentMaterialShader"];
    
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
-(NSString *)getVertexShaderString;{
    
    MaterialShader* this=self;
    
    char* relplayChat =
    "attribute vec3 v3Position;\n"
    "attribute vec2 v2CubeTexST;\n"
    "attribute vec3 v3Normal;\n"
    "uniform mat4 vpMatrix3D;\n"
    "uniform mat4 posMatrix3D;\n"
    "uniform mat3 rotationMatrix3D;\n"
    "varying vec2 v0;\n"
    "varying vec3 v1;\n"
    "varying vec3 v4;\n"
    "void main()"
    "{"
    "v0 = vec2(v2CubeTexST.x, v2CubeTexST.y);\n"
    "vec4 vPos = vec4(v3Position.xyz,1.0);\n"
    "vec4 vt0= vec4(v3Position, 1.0);\n"
    "vt0 = posMatrix3D * vt0;\n"
    "v1 = vec3(vt0.x,vt0.y,vt0.z);\n"
    "vt0 = vpMatrix3D * vt0;"
    "v4 = rotationMatrix3D * v3Normal;"
    "gl_Position = vPos * posMatrix3D* vpMatrix3D;\n"
    "}";
    
    BOOL usePbr    = [this.paramAry[0] boolValue];
    BOOL useNormal = [this.paramAry[1]boolValue];
    BOOL hasFresnel = [this.paramAry[2] boolValue];
    BOOL useDynamicIBL = [this.paramAry[3] boolValue];
    BOOL lightProbe = [this.paramAry[4]boolValue];
    BOOL directLight = [this.paramAry[5]boolValue];
    BOOL noLight = [this.paramAry[6]boolValue];
    BOOL fogMode = [this.paramAry[7]boolValue];
    
    
    NSString* addstr;
    NSString* str=
    @"attribute vec3 v3Position;\n"
    "attribute vec2 v2CubeTexST;\n"
    "varying vec2 v0;\n";
    
    if (directLight) {
        addstr= @"varying vec3 v2;\n";
        str=  [str stringByAppendingString:addstr];
    } else if (noLight) {
        
    } else {
        addstr=
        @"attribute vec2 v2lightuv;\n"
        "varying vec2 v2;\n";
        str=  [str stringByAppendingString:addstr];
    }
    if (usePbr) {
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
    } else if (fogMode != 0) {
        addstr=
        @"varying vec3 v1;\n";
        str=  [str stringByAppendingString:addstr];
    }
    if (useNormal) {
        addstr=
        @"attribute vec3 v3Tangent;\n"
        "attribute vec3 v3Bitangent;\n";
        str=  [str stringByAppendingString:addstr];
    }
    if (directLight) {
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
    }
    addstr=
    @"uniform mat4 vpMatrix3D;\n"
    "uniform mat4 posMatrix3D;\n"
    "uniform mat3 rotationMatrix3D;\n";
    str=  [str stringByAppendingString:addstr];
    addstr=
    @"void main(void){\n"
    "v0 = vec2(v2CubeTexST.x, v2CubeTexST.y);\n"
    "vec4 vt0= vec4(v3Position, 1.0);\n"
    "vt0 = vt0*posMatrix3D   ;\n";
    str=  [str stringByAppendingString:addstr];
    if (!(directLight || noLight)) {
        addstr=  @"v2 = vec2(v2lightuv.x, v2lightuv.y);\n";
        str=  [str stringByAppendingString:addstr];
    }
    if (usePbr || fogMode != 0) {
        addstr=
        @"v1 = vec3(vt0.x,vt0.y,vt0.z);\n";
        str=  [str stringByAppendingString:addstr];
    }
    addstr=
    @"vt0 = vt0*vpMatrix3D ;\n";
    str=  [str stringByAppendingString:addstr];
    if (usePbr) {
        if (!useNormal) {
            addstr=  @"v4 =v3Normal* rotationMatrix3D ;\n";
            str=  [str stringByAppendingString:addstr];
        } else {
            addstr=
            @"v4 = mat3(v3Tangent*rotationMatrix3D  ,v3Bitangent*rotationMatrix3D ,v3Normal* rotationMatrix3D );\n";
            str=  [str stringByAppendingString:addstr];
        }
    }
    if (directLight) {
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
        
    }
    addstr= @"gl_Position = vt0; }";
    str=  [str stringByAppendingString:addstr];
    
    // NSLog(@"\n%@",str);
    
    return str;
    
    // return    [ NSString stringWithFormat:@"%s" ,relplayChat];
    
}
-(NSString *)getFragmentShaderString;{
    char* relplayChat =
    "precision mediump float;\n"
    "varying vec2 v0;\n"
    "void main()"
    "{"
    "gl_FragColor =vec4(1.0,1.0,1.0,1.0);\n"
    "}";
    return    [ NSString stringWithFormat:@"%s" ,relplayChat];
}
@end
