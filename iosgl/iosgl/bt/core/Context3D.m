//
//  Context3D.m
//  iosgl
//
//  Created by zhao on 8/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "Context3D.h"
#import "Matrix3D.h"

@implementation Context3D
- (instancetype)init
{
    self = [super init];
    if (self) {
        [self setupContext];
    }
    return self;
}
-(void)setupContext
{
    
    self.gl = [[EAGLContext alloc]initWithAPI:kEAGLRenderingAPIOpenGLES3];
    
    if( self.gl==NULL)
    {
        NSLog(@"Create Context Failed!");
        return;
    }
    if(![EAGLContext setCurrentContext: self.gl])
    {
        NSLog(@"setCurrentContext failed!");
        return;
    }
    
    
}
-(void)setVcUniform1f:(Shader3D*)shader name:(GLchar*)name data:(CGFloat)data;
{
     glUniform1f( glGetUniformLocation(shader.program, name), data);
}
-(void)setVcUniform4f:(Shader3D*)shader name:(GLchar*)name x:(GLfloat)x y:(GLfloat)y z:(GLfloat)z w:(GLfloat)w;
{
     glUniform4f(  glGetUniformLocation( shader.program, name), x,y,z,w );
}

-(void)setVc3fv:(Shader3D*)shader name:(GLchar*)name data:(GLfloat*)data len:(int)len;
{
    glUniform3fv( glGetUniformLocation( shader.program, name), len, data);
}
-(void)setVc4fv:(Shader3D*)shader name:(GLchar*)name data:(GLfloat*)data len:(int)len;
{
    glUniform4fv( glGetUniformLocation( shader.program, name), len, data);
    
}
-(void)setVcMatrix3fv:(Shader3D*)shader name:(GLchar*)name data:(GLfloat*)data;
{
    glUniformMatrix3fv(  glGetUniformLocation( shader.program,name), 1, GL_TRUE,  data);
}
 
-(void)clearVa:(int)dataId;
{
    glDisableVertexAttribArray(dataId);
}
 

-(void)setVcMatrix4fv:(Shader3D*)shader name:(GLchar*)name data:(GLfloat*)data;
{
    glUniformMatrix4fv(  glGetUniformLocation( shader.program,name), 1, GL_TRUE,  data);
}
-(void)pushVa:(GLuint)dataBuffer;
{
     glBindBuffer(GL_ARRAY_BUFFER, dataBuffer);
}
-(void)setVaOffset:(Shader3D*)shader name:(GLchar*)name dataWidth:(int)dataWidth stride:(int)stride offset:(int)offset;
{
    GLuint position = glGetAttribLocation( shader.program,name);
    glEnableVertexAttribArray(position);
    glVertexAttribPointer(position, dataWidth, GL_FLOAT, GL_FALSE,stride, (GLfloat *)NULL+offset);
}
-(void)drawCall:(GLuint)ibuff numTril:(int)numTril;
{
    glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, ibuff);
    glDrawElements(GL_TRIANGLES, numTril, GL_UNSIGNED_INT, 0);
}

-(void)setDepthTest:(BOOL)tf;
{
    if (tf) {
         glEnable(GL_DEPTH_TEST);
    }else{
         glDisable(GL_DEPTH_TEST);
    }
   
}

-(GLuint)upGpuIndexBuffer:(NSArray*)arr;
{
    unsigned int Indices[arr.count];
    for (int i=0; i<arr.count; i++) {
        Indices[i]=[arr[i] intValue];
    }
    GLuint indexBuffer;
    glGenBuffers(1, &indexBuffer);
    glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, indexBuffer);
    glBufferData(GL_ELEMENT_ARRAY_BUFFER, sizeof(Indices), Indices, GL_STATIC_DRAW);
    return indexBuffer;
}

-(GLuint)upGpuvertexBuffer:(NSArray*)arr;
{
    GLfloat attrArr[arr.count];
    for (int i=0; i<arr.count; i++) {
        attrArr[i]=[arr[i] floatValue];
    }
    GLuint verticesBuffer;
    glGenBuffers(1, &verticesBuffer);
    glBindBuffer(GL_ARRAY_BUFFER, verticesBuffer);
    glBufferData(GL_ARRAY_BUFFER, sizeof(attrArr), attrArr, GL_DYNAMIC_DRAW);
    return verticesBuffer;
}
 
-(void)cullFaceBack:(BOOL)tf;
{
    if (tf) {
        glEnable(GL_CULL_FACE);
        glCullFace(GL_BACK);
    } else {
        glDisable(GL_CULL_FACE);
    }
}
-(void)setProgram:(GLuint)progame;
{
     glUseProgram(progame);
}
-(void)setBlendParticleFactors:(int)type;
{
    glEnable(GL_BLEND);
    switch (type) {
           case 0:
               glBlendFunc(GL_ONE, GL_ONE_MINUS_SRC_ALPHA);
               break;
           case 1:
               glBlendFunc(GL_ONE, GL_ONE);
               break;
           case 2:
              glBlendFunc(GL_DST_COLOR, GL_ZERO);
               break;
           case 3:
                glBlendFunc(GL_ONE, GL_ONE_MINUS_SRC_COLOR);
               break;
           case 4:
              glBlendFunc(GL_SRC_ALPHA, GL_ONE);
               break;
           case -1:
               glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);
               break;
       }
}
 
-(void)setRenderTexture:(Shader3D*)shader name:(NSString*)name  texture: (GLuint)texture level:(int)level;
{
    GLuint textureSlot = glGetUniformLocation(shader.program, (char*)[name UTF8String]);
    switch (level) {
        case 0:
            glActiveTexture(GL_TEXTURE0);
            break;
        case 1:
            glActiveTexture(GL_TEXTURE1);
            break;
        case 2:
            glActiveTexture(GL_TEXTURE2);
            break;
        case 3:
            glActiveTexture(GL_TEXTURE3);
            break;
        case 4:
            glActiveTexture(GL_TEXTURE4);
            break;
        case 5:
            glActiveTexture(GL_TEXTURE5);
            break;
        case 6:
            glActiveTexture(GL_TEXTURE6);
            break;
        default:
            break;
    }
    glBindTexture(GL_TEXTURE_2D, texture);
    glUniform1i(textureSlot, level);
}
//  public getTexture($img: any, $wrap: number = 0, $filter: number = 0, $mipmap: number = 0): WebGLTexture {

+(GLuint)getTexture:(UIImage*)image wrap:(int)wrap;
{
    // 将 UIImage 转换为 CGImageRef
      CGImageRef cgImageRef = [image CGImage];
      GLuint width = (GLuint)CGImageGetWidth(cgImageRef);
      GLuint height = (GLuint)CGImageGetHeight(cgImageRef);
      CGRect rect = CGRectMake(0, 0, width, height);
      
      // 绘制图片
      CGColorSpaceRef colorSpace = CGColorSpaceCreateDeviceRGB();
      void *imageData = malloc(width * height * 4);
      CGContextRef context = CGBitmapContextCreate(imageData, width, height, 8, width * 4, colorSpace, kCGImageAlphaPremultipliedLast | kCGBitmapByteOrder32Big);
      CGContextTranslateCTM(context, 0, 0);
      CGContextScaleCTM(context, 1.0f,  1.0f);  //纹理反着
      CGColorSpaceRelease(colorSpace);
      CGContextClearRect(context, rect);
      CGContextDrawImage(context, rect, cgImageRef);
       
      // 生成纹理
      GLuint textureID;
      glGenTextures(1, &textureID);
      glBindTexture(GL_TEXTURE_2D, textureID);
      glTexImage2D(GL_TEXTURE_2D, 0, GL_RGBA, width, height, 0, GL_RGBA, GL_UNSIGNED_BYTE, imageData); // 将图片数据写入纹理缓存
     
      // 设置如何把纹素映射成像素
      glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_CLAMP_TO_EDGE);
      glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_CLAMP_TO_EDGE);
      
      glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_REPEAT);
      glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_REPEAT);
      
      glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_LINEAR);
      glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_LINEAR);
      
    
      
      // 解绑
      glBindTexture(GL_TEXTURE_2D, 0);
      
      // 释放内存
      CGContextRelease(context);
      free(imageData);
      
      return textureID;
}
@end
