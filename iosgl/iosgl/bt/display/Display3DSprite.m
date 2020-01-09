//
//  Display3DSprite.m
//  iosgl
//
//  Created by zhao on 7/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "Display3DSprite.h"
#import "MaterialManager.h"
#import "ObjDataManager.h"
#import "MetalMatrixUtilities.h"
#import "Scene3D.h"
#import "DisplayBaseShader3D.h"

@implementation Display3DSprite

- (instancetype)init
{
    self = [super init];
    if (self) {
    }
    return self;
}
-(void)loadObjDataByUrl:(NSString*)url
{
    [[ ObjDataManager default] getObjDataByUrl: url Block:^(ObjData *objData) {
        self.objData=objData;
        [self.objData upToGpu];
    }];
}
-(void)loadShaderByUrl:(NSString*)value;
{
    self.shader3d= [[DisplayBaseShader3D alloc]init];
   [self.shader3d encodeVstr:@"" encodeFstr:@""];
}
-(void)loadTextureResByUrl:(NSString*)value;
{
    self.textureRes=[[MaterialManager default] getMaterialByUrl:value];
}
-(void)upFrame{
    [super upFrame];
    if(_shader3d&&_objData&&_objData.indexs&&_textureRes){
     
         Matrix3D *modeMatrix= [self.scene.camera3D.modelMatrix clone];
        [modeMatrix prepend:self.posMatrix3d];
        
        GLuint progame= _shader3d.program;
        glUseProgram(progame);
        glBindTexture(_textureRes.texture.target,_textureRes.texture.name);
        
        GLuint rotateID = glGetUniformLocation( progame, "posMatrix");
        glUniformMatrix4fv(rotateID, 1, GL_TRUE, modeMatrix.m);
        
        glBindBuffer(GL_ARRAY_BUFFER, _objData.verticesBuffer);
        GLuint position = glGetAttribLocation( progame, "position");
        glEnableVertexAttribArray(position);
        glVertexAttribPointer(position, 3, GL_FLOAT, GL_FALSE,sizeof(GLfloat)*5, (GLfloat *)NULL);
        
        
        GLuint textCoor = glGetAttribLocation( progame, "textCoordinate");
        glEnableVertexAttribArray(textCoor);
        glVertexAttribPointer(textCoor, 2, GL_FLOAT, GL_FALSE, sizeof(GLfloat)*5, (GLfloat *)NULL+3);
        
        glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, self.objData.indexBuffer);
        glDrawElements(GL_TRIANGLES, (int)self.objData.indexs.count, GL_UNSIGNED_INT, 0);
  
    }
  
}

@end
