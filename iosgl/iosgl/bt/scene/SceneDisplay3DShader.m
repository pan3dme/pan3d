//
//  SceneDisplay3DShader.m
//  iosgl
//
//  Created by zhao on 10/1/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "SceneDisplay3DShader.h"

@implementation SceneDisplay3DShader
+(NSString*)shaderStr;
{
    return @"SceneDisplay3DShader";
}
-(NSString *)getVertexShaderString;{
    char* relplayChat =
    "attribute vec3 position;\n"
    "attribute vec2 textCoordinate;\n"
    "attribute vec3 v3Normal;\n"
    "uniform mat4 viewMatrix;\n"
    "uniform mat4 posMatrix;\n"
    "uniform mat3 rotationMat3x3;\n"
    
    "uniform vec3 sunDirect;\n"
    "uniform vec3 sunColor;\n"
    "uniform vec3 ambientColor;\n"
    "varying vec2 varyTextCoord;\n"
    "varying vec3 nrmvec3;\n"
    "void main()"
    "{"
        "varyTextCoord = textCoordinate;\n"
        "nrmvec3 = vec3(1.0,0.0,0.0);\n"
        "nrmvec3 = vec3(v3Normal.xyz);\n"
    
        "vec3 n = rotationMat3x3 * v3Normal;\n"
        "float suncos =  clamp(dot(n.xyz,sunDirect.xyz),0.0,1.0);\n"
        "nrmvec3 = vec3(suncos,suncos,suncos)*sunColor+ambientColor;\n"
    
        "vec4 vPos = vec4(position.xyz,1.0);\n"
        "gl_Position = vPos * posMatrix* viewMatrix;\n"
    "}";
    return    [ NSString stringWithFormat:@"%s" ,relplayChat];
    
}
-(NSString *)getFragmentShaderString;{
    char* relplayChat =
    "precision mediump float;\n"
    "varying   vec2 varyTextCoord;\n"
    "varying   vec3 nrmvec3;\n"
    "uniform sampler2D colorMap;\n"
    "void main()"
    "{"
        "gl_FragColor =texture2D(colorMap,varyTextCoord);\n"
        "gl_FragColor =vec4(nrmvec3.xyz,1.0);\n"
    "}";
    return    [ NSString stringWithFormat:@"%s" ,relplayChat];
}
@end
 
