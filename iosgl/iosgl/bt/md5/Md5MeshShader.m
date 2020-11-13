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
    "attribute vec4 boneID;"
    "attribute vec4 boneWeight;"
    "varying vec2 v0;"
    "uniform vec4 boneQ[54];"
    "uniform vec3 boneD[54];"
    "uniform mat4 vpMatrix3D;"
    "uniform mat4 posMatrix3D;"
    
    "vec4 qdv(vec4 q, vec3 d, vec3 v ){"
    "   vec3 t = 2.0 * cross(q.xyz, v);"
    "   vec3 f = v + q.w * t + cross(q.xyz, t);"
    "   return vec4(f.x + d.x, f.y + d.y, f.z + d.z, 1.0);"
    " }"
    "vec4 getQDdata(vec3 vdata){"
    "   vec4 tempnum = qdv(boneQ[int(boneID.x)], boneD[int(boneID.x)], vdata) * boneWeight.x;"
    "   tempnum += qdv(boneQ[int(boneID.y)], boneD[int(boneID.y)], vdata) * boneWeight.y;"
    "   tempnum += qdv(boneQ[int(boneID.z)], boneD[int(boneID.z)], vdata) * boneWeight.z;"
    "   tempnum += qdv(boneQ[int(boneID.w)], boneD[int(boneID.w)], vdata) * boneWeight.w;"
    "   tempnum.x = tempnum.x * -1.0;"
    "   return tempnum;"
    " }"
    "vec4 qdvNrm(vec4 q, vec3 v ){"
    "      vec3 t = 2.0 * cross(q.xyz, v);"
    "      vec3 f = v + q.w * t + cross(q.xyz, t);"
    "      return vec4(f.x, f.y, f.z, 1.0);\n"
    "}"
    " vec4 getQDdataNrm(vec3 vdata){"
    "    vec4 tempnum = qdvNrm(boneQ[int(boneID.x)], vdata) * boneWeight.x;"
    "    tempnum += qdvNrm(boneQ[int(boneID.y)], vdata) * boneWeight.y;"
    "    tempnum += qdvNrm(boneQ[int(boneID.z)], vdata) * boneWeight.z;"
    "    tempnum += qdvNrm(boneQ[int(boneID.w)], vdata) * boneWeight.w;"
    "    tempnum.x = tempnum.x * -1.0;"
    "    tempnum.xyz = normalize(tempnum.xyz);"
    "    return tempnum;"
    "}"
    " void main(void){"
    "    v0 = v2Uv;"
    "    vec4 vt0 =  vec4(pos.x, pos.y, pos.z,1.0);"
    "    vt0 = posMatrix3D * vt0;"
    "    vt0 =vt0* vpMatrix3D ;"
    "    gl_Position = vt0;\n"
    "  }";
    return    [ NSString stringWithFormat:@"%s" ,relplayChat];
    
}
-(NSString *)getFragmentShaderString;{
    char* relplayChat =
    "precision mediump float;\n"
    "uniform sampler2D fs0;\n"
    "varying vec2 v0;\n"
    "void main(void)\n"
    "{\n"
    "vec4 infoUv = texture2D(fs0, v0.xy);\n"
    "gl_FragColor =infoUv;\n"
    "}";
    return    [ NSString stringWithFormat:@"%s" ,relplayChat];
}

@end

