//
//  Shader3D.m
//  iosgl
//
//  Created by zhao on 7/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//
#import <GLKit/GLKit.h>
#import "Shader3D.h"

@implementation Shader3D
-(void)encodeVstr:(NSString*)vstr encodeFstr:(NSString*)fstr;
{
   if(!vstr){
          vstr=[self getVertexShaderString];
      }
    if(!fstr){
           fstr=[self getFragmentShaderString];
       }
    
    GLuint verShader,fragShader;
    _program = glCreateProgram();
    [self compileShader:&verShader type:GL_VERTEX_SHADER file:vstr];
    [self compileShader:&fragShader type:GL_FRAGMENT_SHADER file:fstr];
    glAttachShader(_program, verShader);
    glAttachShader(_program, fragShader);
    glDeleteShader(verShader);
    glDeleteShader(fragShader);
}

-(void)compileShader:(GLuint *)shader type:(GLenum)type file:(NSString *)file
{
    NSString * content = [NSString stringWithContentsOfFile:file encoding:NSUTF8StringEncoding error:nil];
    const GLchar * source = (GLchar *)[content UTF8String];
    *shader = glCreateShader(type);
    glShaderSource(*shader, 1, &source,NULL);
    glCompileShader(*shader);
    
    
}
-(NSString *)getVertexShaderString;{
    return   @"";
}
-(NSString *)getFragmentShaderString;{
    return  @"";
}
@end
