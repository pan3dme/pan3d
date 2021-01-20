//
//  DisplayTestShader.m
//  iosgl
//
//  Created by zhao on 16/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "DisplayTestShader.h"

@implementation DisplayTestShader
+(NSString*)shaderStr;
{
    return @"DisplayTestShader";
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
     "vec4 ft0 = texture2D(fs0,v0);"
        "gl_FragColor =ft0;\n"
    "}";
    return    [ NSString stringWithFormat:@"%s" ,relplayChat];
}
@end
