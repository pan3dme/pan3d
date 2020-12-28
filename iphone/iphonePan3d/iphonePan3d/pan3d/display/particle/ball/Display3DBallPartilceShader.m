//
//  Display3DBallPartilceShader.m
//  iosgl
//
//  Created by zhao on 26/2/2020.
//  Copyright © 2020 zhao. All rights reserved.
//
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
 vec4 pos = vec4(vPosition.xyz,1.0);
 float stime = ctime - vcmat[5][1].w;
 stime = max(stime,0.0);
 float sf = vcmat[5][1].x * stime;
 if (vcmat[5][1].y != 0.0 && vcmat[5][1].z != 0.0) {
 }
 if (sf > vcmat[5][2].z) {
 } else if (sf < vcmat[5][2].w) {
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
 ProgramManager.ts:96 precision mediump float;
 uniform sampler2D fs0;
 uniform sampler2D fs1;
 uniform vec4 fc[1];
 varying vec2 v0;
 varying vec2 v1;
 void main(void){
    gl_FragColor = vec4(1.0,0.0,1.0,1.0);
  }
 */
#import "Display3DBallPartilceShader.h"

@implementation Display3DBallPartilceShader
+(NSString*)shaderStr;
{
    return @"Display3DBallPartilceShader";
}
 
-(NSString *)getVertexShaderString;{
    char* relplayChat =
    "attribute vec4 vPosition;\n"
    "attribute vec3 texcoord;\n"
    "attribute vec4 basePos;\n"
    "attribute vec3 speed;\n"
    "uniform mat4 viewMatrix;\n"
    "uniform mat4 camMatrix;\n"
    "uniform mat4 modeMatrix;\n"
    "uniform mat4 rotMatrix;\n"
    
    "uniform vec4 vcmat50;\n"
    "uniform vec4 vcmat51;\n"
    "uniform vec4 vcmat52;\n"
    "uniform vec4 vcmat53;\n"
 
    "varying vec2 v0;\n"
    "varying vec2 v1;\n"
    "varying vec3 outvec3;\n"
   
    "vec4 IW(vec4 v) {\n"
       "return v*modeMatrix* camMatrix* viewMatrix;\n"
    "}\n"
    "float CTM() {\n"
        "float t = vcmat50.x- basePos.w;\n"
        "if (vcmat50.w > 0.0 && t >= 0.0) {\n"
            "t = fract(t /vcmat50.z) * vcmat50.z;\n"
        "}\n"
        "return t;\n"
     "}\n"
    
    "float STM(float ctime) {\n"
        "float t = ctime - vcmat51.w;\n"
        "t = max(t,0.0);\n"
        "return t;\n"
    "}\n"
    
    "vec4 S_POS(vec4 pos ,float stime) {\n"
        "float sf = vcmat51.x * stime;\n"
        "if (vcmat51.y != 0.0 && vcmat51.z != 0.0) {\n"
            "sf += sin(vcmat51.y * stime) * vcmat51.z;\n"
        "}\n"
        "sf=min(sf,vcmat52.z);\n"
        "sf=max(sf,vcmat52.w);\n"
        "vec2 sv2 = vec2(vcmat52.x * sf, vcmat52.y * sf);\n"
        "sv2 = sv2 + 1.0;\n"
        "pos.x *= sv2.x;\n"
        "pos.y *= sv2.y;\n"
        "return pos;\n"
    "}"
    
    "vec3 ADD_POS(vec3 speed ,float ctime) {\n"
        "vec3 addPos = speed * ctime;\n"
        "vec3 uspeed = vec3(0,0,0);\n"
        "if(vcmat50.y != 0.0 && length(speed) != 0.0) {\n"
            "uspeed = vec3(speed.x, speed.y, speed.z);\n"
            "uspeed = normalize(uspeed);\n"
            "uspeed = uspeed * vcmat50.y;\n"
            "uspeed.xyz = uspeed.xyz + vcmat53.xyz;\n"
        "} else {\n"
            "uspeed = vec3(vcmat53.x, vcmat53.y, vcmat53.z);\n"
        "}\n"
        "addPos.xyz = addPos.xyz + uspeed.xyz * ctime * ctime;\n"
        "return addPos;\n"
      "}\n"
    
    "void main()\n"
    "{\n"
        "vec4 pos = vec4(vPosition.xyz,1.0);\n"
        "float ctime = CTM();\n"
        "float stime = STM(ctime);\n"
    
        "if (ctime < 0.0 || ctime > vcmat50.z) {\n"  //时间周期内-1；
            "pos.x =0.0;\n" //设置不可见
            "pos.y =0.0;\n"//设置不可见
        "}else{\n"
            "pos = S_POS(pos,stime);\n"  //缩放比例
            "pos = rotMatrix* pos;\n"   //面向视角
            "vec3 addPos =ADD_POS(speed,ctime);\n" //加速度
            "pos.xyz = pos.xyz + basePos.xyz + addPos.xyz;\n"
        "}\n"
        "gl_Position =IW(pos);\n"
        "v0=vec2(texcoord.xy);\n"
        "v1=vec2(ctime/vcmat50.z,0.0);\n"
   
    "}";
    
    
    return    [ NSString stringWithFormat:@"%s" ,relplayChat];
    
}
/*
 precision mediump float;
 uniform sampler2D fs0;
 uniform sampler2D fs1;
 uniform vec4 fc[1];
 varying vec2 v0;
 varying vec2 v1;
 void main(void){

 vec4 ft0 = texture2D(fs0,v0);
 ft0.xyz *= ft0.w;
 vec4 ft1 = texture2D(fs1,v1);
 ft1.xyz = ft1.xyz * ft1.w;
 vec4 ft2 = ft0 * fc[0];
 ft0 = ft2 * ft1;
 ft1.xyz = ft0.xyz;
 ft1.w = ft0.w;

 gl_FragColor = ft1;
 */
-(NSString *)getFragmentShaderString;{
    char* relplayChat =
    "precision mediump float;\n"
    "uniform sampler2D fs0;\n"
    "uniform sampler2D fs1;\n"
    "uniform vec4 fc[1];\n"
    "varying vec2 v0;\n"
    "varying vec2 v1;\n"
    "varying vec3 outvec3;\n"

    "void main()"
    "{"
        "vec4 infoUvf0  =texture2D(fs0,v0.xy);\n"
        "vec4 infoUvf1  =texture2D(fs1,v1.xy);\n"
        "gl_FragColor =vec4(1.0,0.0,0.0,1.0);\n"
    "}";
    return    [ NSString stringWithFormat:@"%s" ,relplayChat];
}
@end
/*
uniform sampler2D fs0;
uniform sampler2D fs1;
uniform vec4 fc[1];
varying vec2 v0;
varying vec2 v1;
void main(void){

vec4 ft0 = texture2D(fs0,v0);
ft0.xyz *= ft0.w;
vec4 ft1 = texture2D(fs1,v1);
ft1.xyz = ft1.xyz * ft1.w;
vec4 ft2 = ft0 * fc[0];
ft0 = ft2 * ft1;
ft1.xyz = ft0.xyz;
ft1.w = ft0.w;

gl_FragColor = ft1;

}
*/
