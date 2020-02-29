//
//  Display3DBallPartilce.m
//  iosgl
//
//  Created by zhao on 25/2/2020.
//  Copyright © 2020 zhao. All rights reserved.
//


#import "Display3DBallPartilce.h"
#import "ObjData.h"
#import "ParticleData.h"
#import "ProgrmaManager.h"
#import "Display3DBallPartilceShader.h"
#import "ParticleBallGpuData.h"
#import "Context3D.h"
#import "ParticleBallData.h"
#import "MaterialManager.h"
#import "TextureRes.h"

@interface Display3DBallPartilce ()
@property (nonatomic, strong) ObjData* objData ;
@property (nonatomic, strong) Shader3D* shader3d;
@property (nonatomic, strong) TextureRes* textureRes;

@property (nonatomic, assign) GLuint  textBsetGLuint;


@end
@implementation Display3DBallPartilce

-(void)onCreated;
{
    [[ProgrmaManager default] registe:Display3DBallPartilceShader.shaderStr shader3d: [[Display3DBallPartilceShader alloc]init]];
      self.shader3d=  [[ProgrmaManager default] getProgram:Display3DBallPartilceShader.shaderStr];
    
   
     self.textureRes=[[MaterialManager default] getMaterialByUrl:@"tu001.jpg"];
    
    UIImage *img=[UIImage imageNamed:@"tu001.jpg"];
  self.textBsetGLuint=  [self createTextureWithImage:img];
    
    
}
- (void)update;
{
    if(self.shader3d&&self.textureRes&&self.textureRes.texture ){
        glUseProgram(self.shader3d.program);
        Context3D *ctx=self.scene3d.context3D;
        
        [ctx setVcMatrix4fv:self.shader3d name:"viewMatrix" data:self.viewMatrix.m];
        [ctx setVcMatrix4fv:self.shader3d name:"posMatrix" data:self.posMatrix3d.m];
        
        [ctx pushVa:self.particleBallGpuData.verticesBuffer];
        [ctx setVaOffset:self.shader3d name:"position" dataWidth:4 stride:0 offset:0];
        [ctx pushVa:self.particleBallGpuData.uvBuffer];
        [ctx setVaOffset:self.shader3d name:"texcoord" dataWidth:3 stride:0 offset:0];
        [ctx pushVa: self.particleBallGpuData.basePosBuffer];
        [ctx setVaOffset:self.shader3d name:"basePos" dataWidth:3 stride:0 offset:0];
        
         GLuint textureSlot = glGetUniformLocation(self.shader3d.program, "colorMap");
        
        glActiveTexture(GL_TEXTURE0);
        glBindTexture(GL_TEXTURE_2D, self.textBsetGLuint);
        glUniform1i(textureSlot, 0);
         
      
        int lznum=self.particleBallData._totalNum;
        [ctx drawCall:self.particleBallGpuData.indexBuffer  numTril:6*lznum ];
    }
    
}

- (GLuint)createTextureWithImage:(UIImage *)image {
    // 将 UIImage 转换为 CGImageRef
    CGImageRef cgImageRef = [image CGImage];
    GLuint width = (GLuint)CGImageGetWidth(cgImageRef);
    GLuint height = (GLuint)CGImageGetHeight(cgImageRef);
    CGRect rect = CGRectMake(0, 0, width, height);
    
    // 绘制图片
    CGColorSpaceRef colorSpace = CGColorSpaceCreateDeviceRGB();
    void *imageData = malloc(width * height * 4);
    CGContextRef context = CGBitmapContextCreate(imageData, width, height, 8, width * 4, colorSpace, kCGImageAlphaPremultipliedLast | kCGBitmapByteOrder32Big);
    CGContextTranslateCTM(context, 0, height);
    CGContextScaleCTM(context, 1.0f, -1.0f);
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
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_LINEAR);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_LINEAR);
    
    // 解绑
    glBindTexture(GL_TEXTURE_2D, 0);
    
    // 释放内存
    CGContextRelease(context);
    free(imageData);
    
    return textureID;
}


-(ParticleBallData*)particleBallData;
{
    return ((ParticleBallData*)(self.data));
}
-(ParticleBallGpuData*)particleBallGpuData;
{
    return self.particleBallData.particleGpuData;
}
@end
