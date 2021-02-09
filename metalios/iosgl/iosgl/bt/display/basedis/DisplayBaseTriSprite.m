//
//  DisplayBaseTriSprite.m
//  iosgl
//
//  Created by zhao on 6/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "DisplayBaseTriSprite.h"
#import "DisplayBaseTriShader.h"
#import "Scene3D.h"
#import "ProgrmaManager.h"

@implementation DisplayBaseTriSprite


-(void)onCreated;
{
    self.objData=[[ObjData alloc]init];
    GLfloat attrArr[12];
    attrArr[0]=-0.50f;
    attrArr[1]=0.0f;
    attrArr[2]=0.0f;
    
    attrArr[3]=0.25f;
    attrArr[4]=0.0f;
    attrArr[5]=0.0f;
    
    attrArr[6]=0.25f;
    attrArr[7]=0.25f;
    attrArr[8]=0.0f;
    
    attrArr[9]=0.0f;
    attrArr[10]=0.25f;
    attrArr[11]=0.0f;
    
    GLuint verticesBuffer;
    glGenBuffers(1, &verticesBuffer);
    glBindBuffer(GL_ARRAY_BUFFER, verticesBuffer);
    glBufferData(GL_ARRAY_BUFFER, sizeof(attrArr), attrArr, GL_DYNAMIC_DRAW);
    self.objData.verticesBuffer=verticesBuffer;
    
    unsigned int Indices[6];
    Indices[0]=1;
    Indices[1]=2;
    Indices[2]=3;
    Indices[3]=1;
    Indices[4]=3;
    Indices[5]=4;
    GLuint indexBuffer;
    glGenBuffers(1, &indexBuffer);
    glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, indexBuffer);
    glBufferData(GL_ELEMENT_ARRAY_BUFFER, sizeof(Indices), Indices, GL_STATIC_DRAW);
    self.objData.indexBuffer=indexBuffer;
    self.objData.trinum=6;
    [ self.scene3D.progrmaManager registe:DisplayBaseTriShader.shaderStr shader3d: [[DisplayBaseTriShader alloc]init]];
    self.shader3d=  [ self.scene3D.progrmaManager getProgram:DisplayBaseTriShader.shaderStr];
   
}
-(void)upFrame{
    
    if(self.shader3d&&self.objData){
        GLuint progame= self.shader3d.program;
        glUseProgram(progame);
        Context3D *context3D=self.scene3D.context3D;
        [context3D pushVa:self.objData.verticesBuffer];
        GLuint position = glGetAttribLocation( self.shader3d.program,"position");
        glEnableVertexAttribArray(position);
        glVertexAttribPointer(position, 3, GL_FLOAT, GL_FALSE,0, (GLfloat *)NULL+0);
 
        [context3D drawCall:self.objData.indexBuffer  numTril:self.objData.trinum ];
    }
    
}

@end
