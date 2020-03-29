//
//  Display3DFacetShader.m
//  iosgl
//
//  Created by zhao on 29/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Display3DFacetShader.h"

@implementation Display3DFacetShader
+(NSString*)shaderStr;
{
    return @"Display3DFacetShader";
}
-(NSString *)getVertexShaderString;{
    char* relplayChat =
    "attribute vec3 v3Position;\n"
    "attribute vec2 v2TexCoord;\n"
    "uniform mat4 viewMatrix;\n"
    "uniform mat4 camMatrix;\n"
    "uniform mat4 modeMatrix;\n"
    "varying vec2 v0;\n"
    "void main()"
    "{"
        "vec4 vPos = vec4(v3Position.xyz,1.0);\n"
        "gl_Position = vPos*modeMatrix* camMatrix* viewMatrix;\n"
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
        "gl_FragColor =vec4(1.0,0.0,1.0,1.0);\n"
    "}";
    return    [ NSString stringWithFormat:@"%s" ,relplayChat];
}
@end

