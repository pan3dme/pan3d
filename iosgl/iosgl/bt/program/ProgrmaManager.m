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
//    keyStr    __NSCFString *    @"Display3DLocusShaderhttp://jilioss.oss-cn-hongkong.aliyuncs.com/rb_ios/a/res/content/particleresources/materials/ef_path_byte.txt_1_0_1false_"    0x000000028315ab20
    if ([keyStr rangeOfString:@"content/particleresources/materials/ef_path_byte.txt_1"].location != NSNotFound) {
  
        [self outShader:shader.vertex];
        [self outShader:shader.fragment];
       [self changeShader:shader];
        NSLog(@"------");
    
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
          "attribute vec2 v2CubeTexST;"
          "varying vec2 v0;"
          "attribute vec2 v2lightuv;"
          "varying vec2 v2;"
          "varying vec3 v1;"
          "uniform mat4 vpMatrix3D;"
          "uniform mat4 posMatrix3D;"
          "uniform mat3 rotationMatrix3D;"
          "void main(void){"
          "v0 = vec2(v2CubeTexST.x, v2CubeTexST.y);"
          "vec4 vt0= vec4(v3Position, 1.0);"
          "vt0 = vt0*posMatrix3D   ;"
          "v2 = vec2(v2lightuv.x, v2lightuv.y);"
          "v1 = vec3(vt0.x,vt0.y,vt0.z);"
          "vt0 = vt0*vpMatrix3D ;"
          "gl_Position = vt0; }";
    */
        
  
    
    shader.fragment=
    @"precision mediump float;"
    "uniform sampler2D fs0;"
    "uniform sampler2D fs1;"
    "uniform vec4 fc[1];"
    "varying vec2 v0;"
    "varying vec4 v2;"
    "varying vec2 v1;"
    "void main(void){"
//    "vec4 ft0 = texture2D(fs0,v0);"
//    "ft0.xyz *= ft0.w;"
//    "vec4 ft1 = texture2D(fs1,v1);"
//    "ft1.xyz = ft1.xyz * ft1.w;"
//    "vec4 ft2 = ft0 * ft1;"
//    "ft0 = ft2 * v2.w;"
//    "ft1.xyz = ft0.xyz;"
//    "ft1.w = ft0.w;"
    "if(v2.x<0.0){discard;}"
    "gl_FragColor =vec4(1,0,0,1) ;"
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


