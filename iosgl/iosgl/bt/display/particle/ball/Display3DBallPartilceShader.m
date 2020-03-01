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
/*
 attribute vec4 vPosition;
 attribute vec3 texcoord;
 attribute vec4 basePos;
 attribute vec3 speed;
 uniform mat4 vcmat[7];
 varying vec2 v0;
 varying vec2 v1;
 void main(){
 float ctime = vcmat[5][0].x - basePos.w;
 if (vcmat[5][0].w > 0.0 && ctime >= 0.0) {
 ctime = fract(ctime / vcmat[5][0].z) * vcmat[5][0].z;
 }
 vec4 pos = vPosition;
 float stime = ctime - vcmat[5][1].w;
 stime = max(stime,0.0);
 float sf = vcmat[5][1].x * stime;
 if (vcmat[5][1].y != 0.0 && vcmat[5][1].z != 0.0) {
 sf += sin(vcmat[5][1].y * stime) * vcmat[5][1].z;
 }
 if (sf > vcmat[5][2].z) {
 sf = vcmat[5][2].z;
 } else if (sf < vcmat[5][2].w) {
 sf = vcmat[5][2].w;
 }
 vec2 sv2 = vec2(vcmat[5][2].x * sf, vcmat[5][2].y * sf);
 sv2 = sv2 + 1.0;
 pos.x *= sv2.x;
 pos.y *= sv2.y;
 vec3 addPos = speed * ctime;
 vec3 uspeed = vec3(0,0,0);
 if (ctime < 0.0 || ctime >= vcmat[5][0].z) {
 addPos.y = addPos.y + 100000.0;
 }
 if(vcmat[5][0].y != 0.0 && length(speed) != 0.0) {
 uspeed = vec3(speed.x, speed.y, speed.z);
 uspeed = normalize(uspeed);
 uspeed = uspeed * vcmat[5][0].y;
 uspeed.xyz = uspeed.xyz + vcmat[5][3].xyz;
 } else {
 uspeed = vec3(vcmat[5][3].x, vcmat[5][3].y, vcmat[5][3].z);
 }
 addPos.xyz = addPos.xyz + uspeed.xyz * ctime * ctime;
 pos = vcmat[3] * pos;
 pos.xyz = pos.xyz + basePos.xyz + addPos.xyz;
 gl_Position = vcmat[0] * vcmat[1] * vcmat[2] * pos;
 v0 = vec2(texcoord.x,texcoord.y);
 v1 = vec2(ctime/vcmat[5][0].z,1.0);
 }
 */
-(NSString *)getVertexShaderString;{
    char* relplayChat =
    "attribute vec4 position;\n"
    "attribute vec3 texcoord;\n"
    "attribute vec4 basePos;\n"
    "attribute vec3 speed;\n"
    "uniform mat4 viewMatrix;\n"
    "uniform mat4 posMatrix;\n"
    "uniform mat4 vcmat[7];\n"
    "varying vec2 v0;\n"
    "varying vec2 v1;\n"
    "varying vec3 outvec3;\n"
    "uniform float time;\n"
    
    "void main()"
    "{"
        "float ctime = time- basePos.w;\n"
        "outvec3=speed;\n"
        "v1=vec2(texcoord.xy);\n"
        "vec4 vPos = vec4(position.xyz,1.0);\n"
     
        "vPos.xyz = vPos.xyz+basePos.xyz;\n"
        "gl_Position = vPos * posMatrix* viewMatrix;\n"
    "}";
    return    [ NSString stringWithFormat:@"%s" ,relplayChat];
    
}
-(NSString *)getFragmentShaderString;{
    char* relplayChat =
    "precision mediump float;\n"
    "varying vec2 v0;\n"
    "varying vec2 v1;\n"
    "varying vec3 outvec3;\n"
    "uniform sampler2D colorMap;\n"
    "void main()"
    "{"
        "vec4 infoUvA   =texture2D(colorMap,v1.xy);\n"
        "vec4 infoUv  = vec4(outvec3,1.0);\n"
        "gl_FragColor =infoUv;\n"
    "}";
    return    [ NSString stringWithFormat:@"%s" ,relplayChat];
}
@end
