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
/*
 attribute vec3 v3Position;
 attribute vec2 v2TexCoord;
  attribute vec4 v3Normal;
 uniform mat4 vcmat[5];
 varying vec2 v0;
 varying vec4 v2;

 varying vec2 v1;
 void main(void){
    vec2 tempv0 = v2TexCoord;
    tempv0.x -= vcmat[3][0].x;
    float alpha = tempv0.x/vcmat[3][0].y;
    alpha = 1.0 - clamp(abs(alpha),0.0,1.0);
    float kill = -tempv0.x;
    kill *= tempv0.x - vcmat[3][0].z;
    v2 = vec4(kill,0.0,0.0,alpha);
    v1 = v2TexCoord;
    v0 = tempv0;
    vec4 tempPos = vcmat[2] * vec4(v3Position.xyz,1.0);
    vec3 mulPos = vec3(tempPos.x,tempPos.y,tempPos.z);
    vec3 normals = vec3(v3Normal.x,v3Normal.y,v3Normal.z);
    mulPos = normalize(vec3(vcmat[3][1].xyz) - mulPos);
    mulPos = cross(mulPos, normals);
    mulPos = normalize(mulPos);
    mulPos *= v3Normal.w;
    tempPos.xyz = mulPos.xyz + v3Position.xyz;
    gl_Position = vcmat[0]  * vcmat[1] * vcmat[2] * tempPos;
 }
 */

-(NSString *)getVertexShaderString;{
    char* relplayChat =
    "attribute vec3 vPosition;\n"
    "attribute vec2 v2TexCoord;\n"
    "attribute vec4 v3Normal;\n"
    "uniform mat4 viewMatrix;\n"
    "uniform mat4 camMatrix;\n"
    "uniform mat4 modeMatrix;\n"
    "uniform vec4 vcmat31;\n"
    "void main()"
    "{"
        "vec4 tempPos = modeMatrix * vec4(v3Position.xyz,1.0);\n"
        "vec3 mulPos = vec3(tempPos.x,tempPos.y,tempPos.z);\n"
        "vec3 normals = vec3(v3Normal.x,v3Normal.y,v3Normal.z);\n"
        "mulPos = normalize(vec3(vcmat31.xyz) - mulPos);\n"
        "mulPos = cross(mulPos, normals);\n"
        "mulPos = normalize(mulPos);\n"
        "mulPos *= v3Normal.w;\n"
        "tempPos.xyz = mulPos.xyz + v3Position.xyz;\n"
        "gl_Position = viewMatrix  * camMatrix * modeMatrix * tempPos;\n"
    
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
