//
//  Md5MeshShader.m
//  iosgl
//
//  Created by pan3dme on 2020/11/12.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Md5MeshShader.h"

@implementation Md5MeshShader
+(NSString*)shaderStr;
{
    return @"Md5MeshShader";
}
-(NSString *)getVertexShaderString;{
    char* relplayChat =
    "attribute vec3 pos;"
    "attribute vec2 v2Uv;"
//    "attribute vec4 boneID;"
//    "attribute vec4 boneWeight;"
    "varying vec2 v0;"
//    "uniform vec4 boneQ[54];"
//    "uniform vec3 boneD[54];"
    "uniform mat4 vpMatrix3D;"
    "uniform mat4 posMatrix3D;"
    " void main(void){"
    "    v0 = v2Uv;"
    "    vec4 vt0 =  vec4(pos.x, pos.y, pos.z,1.0));"
    "    vt0 = posMatrix3D * vt0;"
    "    vt0 = vpMatrix3D * vt0;"
    "    gl_Position = vt0;\n"
    "  }";
    return    [ NSString stringWithFormat:@"%s" ,relplayChat];
    
}
-(NSString *)getFragmentShaderString;{
    char* relplayChat =
    "precision mediump float;\n"
    "varying vec2 v0;\n"
    "void main(void)\n"
    "{\n"
    "gl_FragColor =vec4(1.0,0,0,1.0);\n"
    "}";
    return    [ NSString stringWithFormat:@"%s" ,relplayChat];
}

@end

