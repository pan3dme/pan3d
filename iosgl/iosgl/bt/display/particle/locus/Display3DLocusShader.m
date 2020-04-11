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
    "uniform vec4 vcmat30;\n"
    "uniform vec4 vcmat31;\n"
    "varying vec2 v0;\n"
    "varying vec2 v1;\n"
    "varying vec4 v2;\n"
    "void main()"
    "{"
    
        "vec2 tempv0 = v2TexCoord;\n"
        "tempv0.x -= vcmat30.x;\n"
        "float alpha = tempv0.x/vcmat30.y;\n"
        "alpha = 1.0 - clamp(abs(alpha),0.0,1.0);\n"
        "float kill = -tempv0.x;\n"
        "kill *= tempv0.x - vcmat30.z;\n"
        "v2 = vec4(kill,0.0,0.0,alpha);\n"
        "v1 = v2TexCoord;\n"
        "v0 = tempv0;\n"
 
        "vec4 tempPos = modeMatrix * vec4(v3Position.xyz,1.0);\n"
        "vec3 mulPos = vec3(tempPos.x,tempPos.y,tempPos.z);\n"
        "vec3 normals = vec3(v3Normal.x,v3Normal.y,v3Normal.z);\n"
        "mulPos = normalize(vec3(vcmat31.xyz) - mulPos);\n"
        "mulPos = cross(mulPos, normals);\n"
        "mulPos = normalize(mulPos);\n"
        "mulPos *= v3Normal.w*1.0  ;\n"
        "tempPos.xyz = mulPos.xyz + v3Position.xyz;\n"
    
        "gl_Position = tempPos*modeMatrix* camMatrix* viewMatrix;\n"
    
    "}";
    return    [ NSString stringWithFormat:@"%s" ,relplayChat];
    
}

-(NSString *)getFragmentShaderString;{
    char* relplayChat =
    "precision mediump float;\n"
    "uniform sampler2D fs0;\n"
    "uniform sampler2D fs1;\n"
    "uniform vec4 fc[1];\n"
    "varying vec2 v0;\n"
    "varying vec4 v2;\n"
    "varying vec2 v1;\n"
    "void main()"
    "{"
        "vec4 ft0 = texture2D(fs0,v0);\n"
        "ft0.xyz *= ft0.w;\n"
        "vec4 ft1 = texture2D(fs1,v1);\n"
        "ft1.xyz = ft1.xyz * ft1.w;\n"
        "vec4 ft2 = ft0 * ft1;\n"
        "ft0 = ft2 * v2.w;\n"
        "ft1.xyz = ft0.xyz;\n"
        "ft1.w = ft0.w;\n"
        "if(v2.x<fc[0].x){discard;}\n"
        "gl_FragColor = ft1;\n"
   
    "}";
    return    [ NSString stringWithFormat:@"%s" ,relplayChat];
}
@end
