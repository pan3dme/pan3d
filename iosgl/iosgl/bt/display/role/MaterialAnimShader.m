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
 
    "attribute vec3 pos;\n"
    "attribute vec2 v2Uv;\n"
    "attribute vec4 boneID;\n"
    "attribute vec4 boneWeight;\n"
    "uniform vec4 boneQ[54];\n"
    "uniform vec3 boneD[54];\n"

    
    "varying vec2 v0;\n"
    "varying vec4 colorvec4;\n"
    "uniform mat4 viewMatrix;\n"
    "uniform mat4 posMatrix;\n"
    
 
    "vec4 qdv(vec4 q,vec3 d, vec3 v ){\n"
        "vec3 t = 2.0 * cross(q.xyz, v);\n"
        "vec3 f = v + q.w * t + cross(q.xyz, t);\n"
        "return  vec4(f.x+d.x,f.y+d.y,f.z+d.z,1.0);\n"
    "}\n"
    "vec4 getQDdata(vec3 vdata){\n"
        "vec4 tempnum = qdv(boneQ[int(boneID.x)],boneD[int(boneID.x)],vdata) * boneWeight.x;\n"
        "tempnum += qdv(boneQ[int(boneID.y)],boneD[int(boneID.y)],vdata) * boneWeight.y;\n"
        "tempnum += qdv(boneQ[int(boneID.z)],boneD[int(boneID.z)],vdata)* boneWeight.z;\n"
        "tempnum += qdv(boneQ[int(boneID.w)],boneD[int(boneID.w)],vdata) * boneWeight.w;\n"
        "tempnum.x = tempnum.x*-1.0;\n"
        "return  tempnum;\n"
    "}\n"
        "vec4 qdvNrm(vec4 q, vec3 v ){\n"
        "vec3 t = 2.0 * cross(q.xyz, v);\n"
        "vec3 f = v + q.w * t + cross(q.xyz, t);\n"
        "return  vec4(f.x,f.y,f.z,1.0);\n"
    "}\n"
    "vec4 getQDdataNrm(vec3 vdata){\n"
        "vec4 tempnum = qdvNrm(boneQ[int(boneID.x)],vdata) * boneWeight.x;\n"
        "tempnum += qdvNrm(boneQ[int(boneID.y)],vdata) * boneWeight.y;\n"
        "tempnum += qdvNrm(boneQ[int(boneID.z)],vdata)* boneWeight.z;\n"
        "tempnum += qdvNrm(boneQ[int(boneID.w)],vdata) * boneWeight.w;\n"
        "tempnum.x = tempnum.x*-1.0;\n"
        "tempnum.xyz = normalize(tempnum.xyz);\n"
        "return  tempnum;\n"
    "}\n"
  
    "void main()"
    "{"
        "colorvec4 =vec4(1.0,1.0,1.0,1.0);\n"
        " v0 = vec2(v2Uv.x,1.0-v2Uv.y);\n"
         "vec4 vt0 = getQDdata(vec3(pos.x,pos.y,pos.z));\n"
         "vec4 vPos = vec4(vt0.xyz,1.0);\n"
         "gl_Position = vPos * posMatrix* viewMatrix;\n"
    "}";
    return    [ NSString stringWithFormat:@"%s" ,relplayChat];
    
}
 
-(NSString *)getFragmentShaderString;{
    char* relplayChat =
    "precision mediump float;\n"
     "uniform sampler2D fs0;\n"
    "varying vec4 colorvec4;\n"
    "varying vec2 v0;\n"
    "void main()"
    "{"
        "vec4 infoUvf   =texture2D(fs0,v0.xy);\n"
        "if (infoUvf.w <= 0.5) {\n"
            "discard;\n"
        "};\n"
  
        "gl_FragColor =infoUvf;\n"
    "}";
    return    [ NSString stringWithFormat:@"%s" ,relplayChat];
}
/*
 uniform sampler2D fs0;
 uniform vec4 fc[1];
 varying vec2 v0;
 void main(void){

 vec4 ft0 = texture2D(fs0,v0);
 ft0.xyz *= ft0.w;
 vec4 ft1 = vec4(ft0.xyz,1.0);
 vec4 ft2 = vec4(0,0,0,1);
 ft2.xyz = ft1.xyz;
 ft2.w = ft0.w;
 ft2.xyz = ft2.xyz * ft2.w;
 if(ft0.w<fc[0].x){discard;}
 gl_FragColor = ft2;
 */
@end
