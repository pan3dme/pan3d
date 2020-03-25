//
//  Display3DLocusShader.m
//  iosgl
//
//  Created by zhao on 25/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Display3DLocusShader.h"

@implementation Display3DLocusShader
+(NSString*)shaderStr;
{
    return @"Display3DLocusShader";
}

-(NSString *)getVertexShaderString;{
    char* relplayChat =
    "attribute vec3 vPosition;\n"
    "uniform mat4 viewMatrix;\n"
    "uniform mat4 camMatrix;\n"
    "uniform mat4 modeMatrix;\n"
    "void main()"
    "{"
        "vec4 pos = vec4(vPosition.xyz,1.0);"
        "gl_Position =pos*modeMatrix* camMatrix* viewMatrix;"
    "}";
    return    [ NSString stringWithFormat:@"%s" ,relplayChat];
    
}

-(NSString *)getFragmentShaderString;{
    char* relplayChat =
    "precision mediump float;\n"
 
    "void main()"
    "{"
        "vec4 infoUv  = vec4(1.0,0.0,0.0,1.0);\n"
        "gl_FragColor =infoUv;\n"
    "}";
    return    [ NSString stringWithFormat:@"%s" ,relplayChat];
}
@end
