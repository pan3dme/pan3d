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
    "attribute vec3 v3Position;\n"
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
    
        "gl_Position = tempPos*modeMatrix* camMatrix* viewMatrix;\n"
    
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
