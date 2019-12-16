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

@implementation Display3DSprite

- (instancetype)init
{
    self = [super init];
    if (self) {
        self.numskip=0.0;
        [self loadShaderByUrl:@"shadertwo"];
        [self loadObjDataByUrl:@"1"];
        [self loadTextureResByUrl:@"xinshoupic.png"];
        
        [self.posMatrix3d outString];
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
    
    self.objData= [[ ObjDataManager default]getObjDataByUrl:value];
    
    [self.objData upToGpu];
}
-(void)loadTextureResByUrl:(NSString*)value;
{
    self.textureRes=[[MaterialManager default] getMaterialByUrl:value];
}
-(void)upFrame{
    [super upFrame];
    if(_shader3d&&_objData&&_textureRes){
        
        self.numskip+=2;
        
        
        Matrix3D *modeMatrix=[[Matrix3D alloc]init];
        [modeMatrix perspectiveFieldOfViewLH:1 aspectRatio:1 zNear:0.01 zFar:10];
        self.posMatrix3d =[[Matrix3D alloc]init];
      

        [self.posMatrix3d prependTranslation:0.0 y:0 z:5];
        
        Vector3D *bbbb=[[Vector3D alloc]init];
              bbbb.x=0;
              bbbb.y=1;
              bbbb.z=0;
         [self.posMatrix3d prependRotation :self.numskip axis:bbbb];
        
        
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
        
        glDrawArrays(GL_TRIANGLES, 0, 6);
    }
    
    
    
}

@end
