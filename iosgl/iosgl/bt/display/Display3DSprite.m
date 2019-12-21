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
        self.numskip=0.0;
        [self loadShaderByUrl:@"shadertwo"];
        [self loadObjDataByUrl:@"1"];
        [self loadTextureResByUrl:@"xinshoupic.png"];
        
        [self loadModelByUrl:@"file:///D:/work/cannondemo/cannondemo/res/wudiqiuqiu/changjing/guankajibenmoxing/014/014_0.xml"];
        [self.posMatrix3d outString];
    }
    return self;
}
-(void)loadModelByUrl:(NSString*)url
{
 
    [[ ObjDataManager default] getObjDataByccccccUrl: url Block:^(ObjData *objData) {
  
        NSLog(@"--");
        self.objData=objData;
          [self.objData upToGpu];
    }];
}
-(void)loadShaderByUrl:(NSString*)value;
{
    self.shader3d= [[Shader3D alloc]init];
    [self.shader3d encodeVstr:[[NSBundle mainBundle]pathForResource:value ofType:@"vsh"] encodeFstr:[[NSBundle mainBundle]pathForResource:value ofType:@"fsh"]];
 
}
-(void)loadObjDataByUrl:(NSString*)value;
{
    
    self.objData= [[ ObjDataManager default]getObjDataByUrl:value ];
    
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
        
       
         self.posMatrix3d =[[Matrix3D alloc]init];
         [self.posMatrix3d appendScale: 0.015 y:0.015 z:0.015];
         [self.posMatrix3d appendRotation: self.numskip axis:Vector3D.Y_AXIS];
         [self.posMatrix3d appendTranslation: 0.0 y:0 z:5];
        
       
           // [self.posMatrix3d prependScale: 2 y:0.5 z:1];
     
        Matrix3D *modeMatrix= [self.scene.viewMatrix clone];
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
        
        if(self.objData.indexs){
          
             glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, self.objData.indexBuffer);
             glDrawElements(GL_TRIANGLES, (int)self.objData.indexs.count, GL_UNSIGNED_INT, 0);
        }else{
               glDrawArrays(GL_TRIANGLES, 0, 6);
        }
     
    }
    
    
    
}

@end
