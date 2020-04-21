//
//  MaterialShader.m
//  iosgl
//
//  Created by zhao on 22/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "MaterialShader.h"

@implementation MaterialShader
+(NSString*)shaderStr;
{
    return @"MaterialShader";
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
    "varying vec2 v0;\n"
    "void main()"
    "{"
        "gl_FragColor =vec4(1.0,1.0,1.0,1.0);\n"
    "}";
    return    [ NSString stringWithFormat:@"%s" ,relplayChat];
}
@end
