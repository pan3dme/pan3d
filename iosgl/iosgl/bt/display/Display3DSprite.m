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
 
-(void)loadTextureResByUrl:(NSString*)value;
{
    self.textureRes=[[MaterialManager default] getMaterialByUrl:value];
}
-(void)upFrame{
 
       if(self.shader3d&&self.objData&&self.objData.indexs&&self.textureRes){
       
     
           GLuint progame= self.shader3d.program;
           glUseProgram(progame);
           glBindTexture(self.textureRes.texture.target,self.textureRes.texture.name);
           
           GLuint rotateID = glGetUniformLocation( progame, "posMatrix");
           glUniformMatrix4fv(rotateID, 1, GL_TRUE, self.modeMatrix.m);
         
          
          
           glBindBuffer(GL_ARRAY_BUFFER, self.objData.dataViewBuffer);
           GLuint position = glGetAttribLocation( progame, "position");
           glEnableVertexAttribArray(position);
           glVertexAttribPointer(position, 3, GL_FLOAT, GL_FALSE,self.objData.stride, (GLfloat *)NULL);
           GLuint textCoor = glGetAttribLocation( progame, "textCoordinate");
           glEnableVertexAttribArray(textCoor);
           glVertexAttribPointer(textCoor, 2, GL_FLOAT, GL_FALSE, self.objData.stride, (GLfloat *)NULL+self.objData.uvsOffsets);
           
           glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, self.objData.indexBuffer);
           glDrawElements(GL_TRIANGLES, (int)self.objData.indexs.count, GL_UNSIGNED_INT, 0);
     
       }
  
}

@end
