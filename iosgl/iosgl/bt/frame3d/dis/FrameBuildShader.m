//
//  FrameBuildShader.m
//  iosgl
//
//  Created by pan3dme on 2020/11/16.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "FrameBuildShader.h"

@implementation FrameBuildShader
+(NSString*)shaderStr;
{
    return @"FrameBuildShader";
}
-(NSString *)getVertexShaderString;{
    char* relplayChat =
    "attribute vec3 vPosition;\n"
    "attribute vec2 texcoord;\n"
    "uniform mat4 viewMatrix;\n"
    "uniform mat4 posMatrix;\n"
    "varying vec2 v0;\n"
    "void main()"
    "{"
         "v0= texcoord;\n"
         "vec4 vPos = vec4(vPosition.xyz,1.0);\n"
         "gl_Position = vPos * posMatrix* viewMatrix;\n"
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
//    "vec4 infoUv = texture2D(fs0, v0.xy);\n"
//    "gl_FragColor =infoUv;\n"
        "gl_FragColor =vec4(1,0,0,1);\n"
    "}";
    return    [ NSString stringWithFormat:@"%s" ,relplayChat];
}
@end
 
