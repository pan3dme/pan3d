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
        NSNumber* noLight=[NSNumber numberWithFloat: material.noLight?1:0];
        NSNumber* fogMode=[NSNumber numberWithFloat: material.fogMode?1:0];
        
//        paramAry = [$material.usePbr, $material.useNormal, $material.hasFresnel,
//                      $material.useDynamicIBL, $material.lightProbe, $material.directLight,
//                      $material.noLight,$material.fogMode];
        paramAry = @[ usePbr, useNormal,  hasFresnel,  useDynamicIBL, lightProbe,  directLight,noLight,fogMode];
 
       }
    Shader3D* shader = shaderCls;
    shader.paramAry = paramAry;
    shader.vertex=shader.vertexStr;
    shader.fragment = material.shaderStrRead;
   
      //keyStr    __NSCFString *    @"Display3DBallPartilceShadercontent/particleresources/materials/m_ef_par_byte.txt_1_0_0_0_1_0_0false_"    0x0000000281e3ac40
   //keyStr    __NSCFString *    @"MaterialShaderhttp://jilioss.oss-cn-hongkong.aliyuncs.com/rb_ios/a/res/content/mate
    if ([keyStr rangeOfString:@"MaterialShaderhttp"].location != NSNotFound) {
   
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
    /*
    shader.vertex=
          @"attribute vec3 v3Position;"
          "attribute vec2 v2TexCoord;"
          "uniform mat4 viewMatrix;"
          "uniform mat4 camMatrix;"
          "uniform mat4 modeMatrix;"
          "uniform mat4 rotMatrix;"
          "varying vec2 v0;"
          "void main(){"
          "v0=v2TexCoord;"
          "vec4 vPos = vec4(v3Position.xyz,1.0);"
          "gl_Position = vPos*rotMatrix*modeMatrix* camMatrix* viewMatrix;"
          "}";
        
    */
    /*
     "precision mediump float;"
     "uniform sampler2D fs0;"
     "uniform sampler2D fs1;"
     "uniform samplerCube fs2;"
     "uniform vec4 fc[2];"
     "varying vec2 v0;"
     "varying vec3 v1;"
     "varying vec3 v4;"
     "void main(void){"
     "vec4 ft0 = texture2D(fs0,v0);"
     "vec4 ft1 = vec4(ft0.xyz,1.0);"
     "vec4 ft2 = vec4(0,0,0,1);"
     "ft2.xyz = v4.xyz;"
     "vec4 ft3 = vec4(0,0,0,1);"
     "ft3.xyz = mix(vec3(fc[1].y,fc[1].y,fc[1].y) * 0.08,ft1.xyz,fc[1].x);"
     "vec4 ft4 = vec4(0,0,0,1);"
     "ft4.xyz = fc[0].xyz - v1.xyz;"
     "ft4.xyz = normalize(ft4.xyz);"
     "ft4.y= dot(ft4.xyz,ft2.xyz);"
     "ft4.x = fc[1].z;"
     "ft4 = texture2D(fs1,ft4.xy);"
     "ft3.xyz = ft3.xyz * ft4.x + ft4.y;"
     "ft3.xyz = ft3.xyz * fc[1].y;"
     "ft4.xyz = v1.xyz - fc[0].xyz;"
     "ft4.xyz = normalize(ft4.xyz);"
     "ft4.xyz = reflect(ft4.xyz,ft2.xyz);"
     "ft4 = textureCube(fs2,ft4.xyz);"
     "ft3.xyz = ft3.xyz * ft4.xyz;"
     "ft4.xyz = ft1.xyz * (1.0-fc[1].x);"
     "ft4.xyz = ft4.xyz + ft3.xyz;"
     "ft4.w = 1.0;"
     "gl_FragColor = ft4;"
     "}"
     */
    
    shader.fragment=
    @"precision mediump float;\n"
    "uniform sampler2D fs0;\n"
    "uniform sampler2D fs1;\n"
    "uniform samplerCube fs2;\n"
    "varying vec2 v0;\n"
    "void main()"
    "{"
         "vec4 infouv = texture2D(fs1,v0);\n"
        //"vec4infouv = vec4(1.0,0.0,0.0,1.0);\n"
        "gl_FragColor =infouv;\n"
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


