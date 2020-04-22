//
//  MaterialShader.m
//  iosgl
//
//  Created by zhao on 22/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "MaterialShader.h"

@implementation MaterialShader
+(NSString*)shaderStr;
{
    return @"MaterialShader";
}
-(NSString *)getVertexShaderString;{
    
    MaterialShader* this=self;
    /*
     attribute vec3 vPosition;
     attribute vec2 v2CubeTexST;
     varying vec2 v0;
     attribute vec3 v3Normal;
     varying vec3 v1;
     varying vec3 v4;
     uniform mat4 viewMatrix;
     uniform mat4 posMatrix3D;
     uniform mat3 rotationMatrix3D;
     void main(void){
     v0 = vec2(v2CubeTexST.x, v2CubeTexST.y);
     vec4 vt0= vec4(v3Position, 1.0);
     vt0 = posMatrix3D * vt0;
     v1 = vec3(vt0.x,vt0.y,vt0.z);
     vt0 = vpMatrix3D * vt0;
     v4 = rotationMatrix3D * v3Normal;
     gl_Position = vt0; }
     */
    char* relplayChat =
    "attribute vec3 v3Position;\n"
    "attribute vec2 v2CubeTexST;\n"
    "attribute vec3 v3Normal;\n"
    "uniform mat4 vpMatrix3D;\n"
    "uniform mat4 posMatrix3D;\n"
    "uniform mat3 rotationMatrix3D;\n"
    "varying vec2 v0;\n"
    "varying vec3 v1;\n"
    "varying vec3 v4;\n"
    "void main()"
    "{"
        "v0 = vec2(v2CubeTexST.x, v2CubeTexST.y);\n"
        "vec4 vPos = vec4(v3Position.xyz,1.0);\n"
        "vec4 vt0= vec4(v3Position, 1.0);\n"
        "vt0 = posMatrix3D * vt0;\n"
        "v1 = vec3(vt0.x,vt0.y,vt0.z);\n"
        "vt0 = vpMatrix3D * vt0;"
         "v4 = rotationMatrix3D * v3Normal;"
        "gl_Position = vPos * posMatrix3D* vpMatrix3D;\n"
    "}";
  
    BOOL usePbr    = [this.paramAry[0] boolValue];
    BOOL useNormal = [this.paramAry[1]boolValue];
    BOOL hasFresnel = [this.paramAry[2] boolValue];
    BOOL useDynamicIBL = [this.paramAry[3] boolValue];
    BOOL lightProbe = [this.paramAry[4]boolValue];
    BOOL directLight = [this.paramAry[5]boolValue];
    BOOL noLight = [this.paramAry[6]boolValue];
    BOOL fogMode = [this.paramAry[7]boolValue];
  
    
    NSString* addstr;
    NSString* str=
    
    
    @"attribute vec3 v3Position;\n"
    "attribute vec2 v2CubeTexST;\n"
    "varying vec2 v0;\n";
 
    if (directLight) {
        addstr= @"varying vec3 v2;\n";
        str=  [str stringByAppendingString:addstr];
    } else if (noLight) {
        
    } else {
        addstr=
        @"attribute vec2 v2lightuv;\n"
        "varying vec2 v2;\n";
        str=  [str stringByAppendingString:addstr];
    }
    if (usePbr) {
        addstr=
        @"attribute vec3 v3Normal;\n"
        "varying vec3 v1;\n";
        str=  [str stringByAppendingString:addstr];
        if (!useNormal) {
            addstr=  @"varying vec3 v4;\n";
            str=  [str stringByAppendingString:addstr];
        } else {
            addstr= @"varying mat3 v4;\n";
            str=  [str stringByAppendingString:addstr];
        }
    } else if (fogMode != 0) {
        addstr=
        @"varying vec3 v1;\n";
        str=  [str stringByAppendingString:addstr];
    }
    if (useNormal) {
        addstr=
        @"attribute vec3 v3Tangent;\n"
        "attribute vec3 v3Bitangent;\n";
        str=  [str stringByAppendingString:addstr];
    }
    if (directLight) {
        if (!usePbr) {
            addstr=
            @"attribute vec3 v3Normal;\n";
            str=  [str stringByAppendingString:addstr];
        }
        addstr=
        @"uniform vec3 sunDirect;\n"
        "uniform vec3 sunColor;\n"
        "uniform vec3 ambientColor;\n";
        str=  [str stringByAppendingString:addstr];
    }
    addstr=
    @"uniform mat4 viewMatrix;\n"
    "uniform mat4 posMatrix3D;\n"
    "uniform mat3 rotationMatrix3D;\n";
    str=  [str stringByAppendingString:addstr];
    addstr=
    @"void main(void){\n"
    "v0 = vec2(v2CubeTexST.x, v2CubeTexST.y);\n"
    "vec4 vt0= vec4(v3Position, 1.0);\n"
    "vt0 = posMatrix3D * vt0;\n";
    str=  [str stringByAppendingString:addstr];
    if (!(directLight || noLight)) {
        addstr=  @"v2 = vec2(v2lightuv.x, v2lightuv.y);\n";
        str=  [str stringByAppendingString:addstr];
    }
    if (usePbr || fogMode != 0) {
        addstr=
        @"v1 = vec3(vt0.x,vt0.y,vt0.z);\n";
        str=  [str stringByAppendingString:addstr];
    }
    addstr=
    @"vt0 = vpMatrix3D * vt0;\n";
    str=  [str stringByAppendingString:addstr];
    if (usePbr) {
        if (!useNormal) {
            addstr=  @"v4 = rotationMatrix3D * v3Normal;\n";
            str=  [str stringByAppendingString:addstr];
        } else {
            addstr=
            @"v4 = mat3(rotationMatrix3D * v3Tangent,rotationMatrix3D * v3Bitangent, rotationMatrix3D * v3Normal);\n";
            str=  [str stringByAppendingString:addstr];
        }
    }
    if (directLight) {
        if (!usePbr) {
            addstr=
            @"vec3 n = rotationMatrix3D * v3Normal;\n"
            "float suncos = dot(n.xyz,sunDirect.xyz);\n";
            str=  [str stringByAppendingString:addstr];
        } else {
            addstr=
            @"float suncos = dot(v4.xyz,sunDirect.xyz);\n";
            str=  [str stringByAppendingString:addstr];
        }
        
        addstr=
        @"suncos = clamp(suncos,0.0,1.0);\n"
        "v2 = sunColor * suncos + ambientColor;";
        str=  [str stringByAppendingString:addstr];
        
    }
    addstr= @"gl_Position = vt0; }";
    str=  [str stringByAppendingString:addstr];
    
    NSLog(@"\n%@",str);
    
   // return str;
    
    return    [ NSString stringWithFormat:@"%s" ,relplayChat];
    
}
-(NSString *)getFragmentShaderString;{
    char* relplayChat =
    "precision mediump float;\n"
    "varying vec2 v0;\n"
    "void main()"
    "{"
        "gl_FragColor =vec4(1.0,1.0,1.0,1.0);\n"
    "}";
    return    [ NSString stringWithFormat:@"%s" ,relplayChat];
}
@end
