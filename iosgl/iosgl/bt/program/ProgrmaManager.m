//
//  ProgrmaManager.m
//  iosgl
//
//  Created by zhao on 7/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "ProgrmaManager.h"
#import "Display3DBallPartilceShader.h"
#import "Shader3D.h"
#import "Material.h"
static ProgrmaManager *instance = nil;
@implementation ProgrmaManager
+ (instancetype)default{
    if (instance == nil) {
        instance = [[ProgrmaManager alloc] init];
    }
    return instance;
}
- (instancetype)init
{
    self = [super init];
    if (self) {
        self.dic = [[NSMutableDictionary alloc] init];
  
    }
    return self;
}
-(Shader3D*) getProgram:(NSString*)value ;
{
    if([self.dic objectForKey:value]){
          return  self.dic[value];
    }else{
        
        return  nil;
    }
  
}
-(void)registe:(NSString*)keystr shader3d:(Shader3D*)shader3d;{
    if([self.dic objectForKey:keystr]){
    }else{
       [self.dic setValue:shader3d forKey:keystr];
       [shader3d encodeVstr:nil encodeFstr:nil];
    }
}
-(Shader3D*)getMaterialProgram:(NSString*)key shaderCls:(Shader3D*)shaderCls   material:(Material*)material paramAry:(NSArray<NSNumber*>*)paramAry parmaByFragmet:(BOOL)parmaByFragmet ;
{
    NSString* keyStr = [key stringByAppendingFormat:@"%@",material.url];
    if (paramAry) {
        for (int i=0; i < paramAry.count; i++) {
            keyStr= [keyStr stringByAppendingFormat:@"_%@",paramAry[i]];
        }
        if (parmaByFragmet) {
            keyStr= [keyStr stringByAppendingFormat:@"true_"];
        } else {
            keyStr= [keyStr stringByAppendingFormat:@"false_"];
        }
    }
    if (self.dic[keyStr]) {
        return self.dic[keyStr];
    }
// material.shaderStrRead
    
    if (parmaByFragmet) {
         NSNumber* usePbr=[NSNumber numberWithFloat: material.usePbr?1:0];
        NSNumber* useNormal=[NSNumber numberWithFloat: material.useNormal?1:0];
        NSNumber* hasFresnel=[NSNumber numberWithFloat: material.hasFresnel?1:0];
        NSNumber* useDynamicIBL=[NSNumber numberWithFloat: material.useDynamicIBL?1:0];
        NSNumber* lightProbe=[NSNumber numberWithFloat: material.lightProbe?1:0];
        NSNumber* directLight=[NSNumber numberWithFloat: material.directLight?1:0];
        NSNumber* fogMode=[NSNumber numberWithFloat: material.fogMode?1:0];
        paramAry = @[ usePbr, useNormal,  hasFresnel,  useDynamicIBL, lightProbe,  directLight,fogMode];
 
       }
    Shader3D* shader = shaderCls;
    shader.paramAry = paramAry;
    shader.vertex=shader.vertexStr;
    shader.fragment = material.shaderStrRead;
   
      //keyStr    __NSCFString *    @"Display3DBallPartilceShadercontent/particleresources/materials/m_ef_par_byte.txt_1_0_0_0_1_0_0false_"    0x0000000281e3ac40
   
    if ([keyStr rangeOfString:@"Display3DBallPartilceShadercontent/particleresources/materials/m_ef_par_byte.txt_1_0_0_0_1_0_0false_"].location != NSNotFound) {
   
        [self outShader:shader.vertex];
        [self outShader:shader.fragment];
     [self changeShader:shader];
        
      
        
    }
    
    [shader encodeVstr:shader.vertex encodeFstr:shader.fragment];
    
    self.dic[keyStr] = shader;
    return shader;
}

-(void)changeShader:(Shader3D*)shader;
{
    shader.vertex=
          @"attribute vec4 vPosition;"
          "attribute vec3 texcoord;"
          "attribute vec4 basePos;"
          "attribute vec3 speed;"
          "uniform mat4 viewMatrix;"
          "uniform mat4 camMatrix;"
          "uniform mat4 modeMatrix;"
          "uniform mat4 rotMatrix;"
          "uniform vec4 vcmat50;"
          "uniform vec4 vcmat51;"
          "uniform vec4 vcmat52;"
          "uniform vec4 vcmat53;"
          "varying vec2 v0;"
          "varying vec2 v1;"
          "varying vec3 outvec3;"
          "vec4 IW(vec4 v) {"
          "return v*modeMatrix* camMatrix* viewMatrix;"
          "}"
          "float CTM() {"
          "float t = vcmat50.x- basePos.w;"
          "if (vcmat50.w > 0.0 && t >= 0.0) {"
          "t = fract(t /vcmat50.z) * vcmat50.z;"
          "}"
          "return t;"
          "}"
          "float STM(float ctime) {"
          "float t = ctime - vcmat51.w;"
          "t = max(t,0.0);"
          "return t;"
          "}"
          "vec4 S_POS(vec4 pos ,float stime) {"
          "float sf = vcmat51.x * stime;"
          "if (vcmat51.y != 0.0 && vcmat51.z != 0.0) {"
          "sf += sin(vcmat51.y * stime) * vcmat51.z;"
          "}"
          "sf=min(sf,vcmat52.z);"
          "sf=max(sf,vcmat52.w);"
          "vec2 sv2 = vec2(vcmat52.x * sf, vcmat52.y * sf);"
          "sv2 = sv2 + 1.0;"
          "pos.x *= sv2.x;"
          "pos.y *= sv2.y;"
          "return pos;"
          "}vec3 ADD_POS(vec3 speed ,float ctime) {"
          "vec3 addPos = speed * ctime;"
          "vec3 uspeed = vec3(0,0,0);"
          "if(vcmat50.y != 0.0 && length(speed) != 0.0) {"
          "uspeed = vec3(speed.x, speed.y, speed.z);"
          "uspeed = normalize(uspeed);"
          "uspeed = uspeed * vcmat50.y;"
          "uspeed.xyz = uspeed.xyz + vcmat53.xyz;"
          "} else {"
          "uspeed = vec3(vcmat53.x, vcmat53.y, vcmat53.z);"
          "}"
          "addPos.xyz = addPos.xyz + uspeed.xyz * ctime * ctime;"
          "return addPos;"
          "}"
          "void main()"
          "{"
          "vec4 pos = vec4(vPosition.xyz,1.0);"
          "float ctime = CTM();"
          "float stime = STM(ctime);"
          "if (ctime < 0.0 || ctime > vcmat50.z) {"
          "pos.x =0.0;"
          "pos.y =0.0;"
          "}else{"
          "pos = S_POS(pos,stime);"
          "pos = rotMatrix* pos;"
          "vec3 addPos =ADD_POS(speed,ctime);"
          "pos.xyz = pos.xyz + basePos.xyz + addPos.xyz;"
          "}"
          "gl_Position =IW(pos);"
          "v0=vec2(texcoord.xy);"
          "v1=vec2(ctime/vcmat50.z,0.0);"
          "}";
        
    
    
           shader.fragment=
           @"precision mediump float;"
           "uniform sampler2D fs0;"
           "uniform sampler2D fs1;"
           "uniform vec4 fc[1];"
           "varying vec2 v0;"
           "varying vec2 v1;"
           "void main(void){"
           "vec4 ft0 = texture2D(fs0,v0);"
           "ft0.xyz *= ft0.w;"
           "vec4 ft1 = texture2D(fs1,v1);"
           "ft1.xyz = ft1.xyz * ft1.w;"
           "vec4 ft2 = ft0 * fc[0];"
           "ft0 = ft2 * ft1;"
           "ft1.xyz = ft0.xyz;"
           "ft1.w = ft0.w;"
           "gl_FragColor =ft1;"
           "}";
    
  
      
}

-(void)outShader:(NSString*)value;
{
 
    NSArray *item = [value componentsSeparatedByString:@"\n"]; //分段
    NSString *outStr=@"\"\n";
    for (int i=0; i<item.count; i++) {
        NSString* tempStr=item[i];
        if(tempStr.length){
            outStr= [outStr stringByAppendingString:@"\""];
            outStr= [outStr stringByAppendingString:tempStr];
            outStr= [outStr stringByAppendingString:@"\"\n"];
        }
    }
    NSLog(@"%@",outStr);
    NSLog(@"-----------------");
    
}
@end


