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

@interface Display3DBallPartilce ()
@property (nonatomic, strong) ObjData* objData ;
@property (nonatomic, strong) Shader3D *shader3d;
@end
@implementation Display3DBallPartilce

-(void)onCreated;
{
    self.objData=[[ObjData alloc]init];
    GLfloat attrArr[12];
attrArr[0]=0.0f;
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
    Indices[0]=0;
    Indices[1]=1;
    Indices[2]=2;
    Indices[3]=0;
    Indices[4]=2;
    Indices[5]=3;
    GLuint indexBuffer;
    glGenBuffers(1, &indexBuffer);
    glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, indexBuffer);
    glBufferData(GL_ELEMENT_ARRAY_BUFFER, sizeof(Indices), Indices, GL_STATIC_DRAW);
    self.objData.indexBuffer=indexBuffer;
    
    [[ProgrmaManager default] registe:Display3DBallPartilceShader.shaderStr shader3d: [[Display3DBallPartilceShader alloc]init]];
    self.shader3d=  [[ProgrmaManager default] getProgram:Display3DBallPartilceShader.shaderStr];
    
}
- (void)update;
{
    if(self.shader3d ){
        
        GLuint progame= self.shader3d.program;
        glUseProgram(progame);
        Context3D *context3D=self.scene3d.context3D;
        
        [context3D pushVa:self.objData.verticesBuffer];
       // [context3D setVaOffset:self.shader3d name:"position" dataWidth:3 stride:0 offset:0];
        
        GLuint position = glGetAttribLocation( self.shader3d.program,"position");
        glEnableVertexAttribArray(position);
        glVertexAttribPointer(position, 3, GL_FLOAT, GL_FALSE,0, (GLfloat *)NULL+0);
        
        
        [context3D drawCall:self.objData.indexBuffer  numTril:6 ];
    }
    
}
@end
