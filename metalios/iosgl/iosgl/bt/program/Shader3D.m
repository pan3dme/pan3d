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
    [self compileShaderStr:&verShader type:GL_VERTEX_SHADER str:vstr];
    [self compileShaderStr:&fragShader type:GL_FRAGMENT_SHADER str:fstr];
    
    glAttachShader(_program, verShader);
    glAttachShader(_program, fragShader);
    glDeleteShader(verShader);
    glDeleteShader(fragShader);
    
    //5、链接
    glLinkProgram(_program);
    
    GLint linkStatus;
    glGetProgramiv(_program, GL_LINK_STATUS, &linkStatus);
    if(linkStatus==GL_FALSE)
    {
        //获取失败信息
        GLchar message[512];
        //来检查是否有error，并输出信息
        /*
         作用:连接着色器程序也可能出现错误，我们需要进行查询，获取错误日志信息
         参数1: program 着色器程序标识
         参数2: bufsize 最大日志长度
         参数3: length 返回日志信息的长度
         参数4：infoLog 保存在缓冲区中
         */
        glGetProgramInfoLog(_program, sizeof(message), 0, &message[0]);
        
        //将C语言字符串转换成OC字符串
        NSString * messageStr = [NSString stringWithUTF8String:message];
        
        NSLog(@"Program Link Error:%@",messageStr);
        
        return;
    }
}
-(NSString*)vertexStr;
{
    if(self.vertex){
        return self.vertex;
    }else{
        return [self getVertexShaderString];
    }
}
-(void)compileShaderStr:(GLuint *)shader type:(GLenum)type str:(NSString *)str;
{
    const GLchar * source = (GLchar *)[str UTF8String];
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
