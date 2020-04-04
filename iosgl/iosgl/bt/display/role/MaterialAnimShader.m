//
//  MaterialAnimShader.m
//  iosgl
//
//  Created by zhao on 4/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "MaterialAnimShader.h"

@implementation MaterialAnimShader
+(NSString*)shaderStr;
{
    return @"MaterialAnimShader";
}
-(NSString *)getVertexShaderString;{
    char* relplayChat =
    "attribute vec3 position;\n"
    "uniform mat4 viewMatrix;\n"
    "uniform mat4 posMatrix;\n"
    "void main()"
    "{"
        "vec4 vPos = vec4(position.xyz,1.0);\n"
         "gl_Position = vPos * posMatrix* viewMatrix;\n"
    "}";
    return    [ NSString stringWithFormat:@"%s" ,relplayChat];
    
}
-(NSString *)getFragmentShaderString;{
    char* relplayChat =
    "precision mediump float;\n"
    "void main()"
    "{"
        "gl_FragColor =vec4(1.0,0.0,1.0,1.0);\n"
    "}";
    return    [ NSString stringWithFormat:@"%s" ,relplayChat];
}
@end
