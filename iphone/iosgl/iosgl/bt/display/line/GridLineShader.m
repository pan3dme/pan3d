//
//  GridLineShader.m
//  iosgl
//
//  Created by zhao on 8/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "GridLineShader.h"

@implementation GridLineShader
+(NSString*)shaderStr;
{
    return @"GridLineShader";
}
-(NSString *)getVertexShaderString;{
    char* relplayChat =
    "attribute vec3 position;\n"
    "attribute vec3 attcolor;\n"
    "uniform mat4 viewMatrix;\n"
    "uniform mat4 camMatrix;\n"
    "varying vec3 outColor;\n"
    "void main()"
    "{"
        "outColor = attcolor;\n"
        "vec4 vPos = vec4(position.xyz,1.0);\n"
        "gl_Position = vPos * camMatrix* viewMatrix;\n"
    "}";
    return    [ NSString stringWithFormat:@"%s" ,relplayChat];
    
}
-(NSString *)getFragmentShaderString;{
    char* relplayChat =
    "precision mediump float;\n"
     "varying vec3 outColor;\n"
    "void main()"
    "{"
        "gl_FragColor =vec4(outColor.xyz,1.0);\n"
    "}";
    return    [ NSString stringWithFormat:@"%s" ,relplayChat];
}
@end
