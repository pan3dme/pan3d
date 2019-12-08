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
        //  [self.posMatrix3d prependTranslation:0.001 y:0 z:0];
        glUniformMatrix4fv(rotateID, 1, GL_FALSE, self.posMatrix3d.m);
        
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
