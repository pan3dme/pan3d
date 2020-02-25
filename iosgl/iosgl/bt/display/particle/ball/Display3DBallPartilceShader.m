//
//  Display3DBallPartilceShader.m
//  iosgl
//
//  Created by zhao on 26/2/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Display3DBallPartilceShader.h"

@implementation Display3DBallPartilceShader
+(NSString*)shaderStr;
{
    return @"Display3DBallPartilceShader";
}
-(NSString *)getVertexShaderString;{
    char* relplayChat =
    "attribute vec3 position;\n"
    "void main()"
    "{"
        "vec4 vPos = vec4(position.xyz,0.5);\n"
        "gl_Position = vPos ;\n"
    "}";
    return    [ NSString stringWithFormat:@"%s" ,relplayChat];
    
}
-(NSString *)getFragmentShaderString;{
    char* relplayChat =
    "precision mediump float;\n"
    "void main()"
    "{"
        "gl_FragColor =vec4(1.0,0.0,0.0,1.0);\n"
    "}";
    return    [ NSString stringWithFormat:@"%s" ,relplayChat];
}
@end
