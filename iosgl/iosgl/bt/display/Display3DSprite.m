//
//  Display3DSprite.m
//  iosgl
//
//  Created by zhao on 7/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "Display3DSprite.h"
#import "MaterialManager.h"

@implementation Display3DSprite

- (instancetype)init
{
    self = [super init];
    if (self) {
        
        [self loadShaderByUrl:@"shadertwo"];
        [self loadObjDataByUrl:@"1"];
        [self loadTextureResByUrl:@"xinshoupic.png"]; 
        [self.posMatrix3d prependTranslation:1 y:0 z:0];
 
        
    }
    return self;
}
-(void)loadShaderByUrl:(NSString*)value;
{
    self.shader3d= [[Shader3D alloc]init];
    [self.shader3d encodeVstr:[[NSBundle mainBundle]pathForResource:value ofType:@"vsh"] encodeFstr:[[NSBundle mainBundle]pathForResource:value ofType:@"fsh"]];
}
-(void)loadObjDataByUrl:(NSString*)value;
{
    self.objData=[[ObjData alloc]init];
    [self.objData upToGpu];
}
-(void)loadTextureResByUrl:(NSString*)value;
{
    self.textureRes=[[MaterialManager default] getMaterialByUrl:value];
}
-(void)upFrame{
    [super upFrame];
    if(_shader3d&&_objData&&_textureRes){
        GLuint progame= _shader3d.program;
        glUseProgram(progame);
        glBindTexture(_textureRes.texture.target,_textureRes.texture.name);
        glBindBuffer(GL_ARRAY_BUFFER, _objData.verticesBuffer);
        
        
        GLuint rotateID = glGetUniformLocation( progame, "rotateMatrix");
       
        
        //需求：旋转10度 -> 弧度
        float rotate = self.rotationZ * 3.141592f /180.0f;
        
        //旋转的矩阵公式
        float s = sin(rotate);
        float c = cos(rotate);
        
        //构建旋转的矩阵公式
        GLfloat zRotation[16]={
            c,-s,0,0,
            s,c,0,0,
            0,0,1.0,0,
            0,0,0,1.0,
        };
        
        
        
        glUniformMatrix4fv(rotateID, 1, GL_FALSE, zRotation);
        
        GLuint position = glGetAttribLocation( progame, "position");
        glEnableVertexAttribArray(position);
        glVertexAttribPointer(position, 3, GL_FLOAT, GL_FALSE,sizeof(GLfloat)*5, NULL);
        
        
        GLuint textCoor = glGetAttribLocation( progame, "textCoordinate");
        glEnableVertexAttribArray(textCoor);
        glVertexAttribPointer(textCoor, 2, GL_FLOAT, GL_FALSE, sizeof(GLfloat)*5, (GLfloat *)NULL+3);
        
        glDrawArrays(GL_TRIANGLES, 0, 6);
    }
    
    
}
@end
