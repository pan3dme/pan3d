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

@interface Display3DBallPartilce ()
@property (nonatomic, strong) ObjData* objData ;
@property (nonatomic, strong) Shader3D *shader3d;
@end
@implementation Display3DBallPartilce

-(void)onCreated;
{
    int lznum=1;
    self.objData=[[ObjData alloc]init];
    GLfloat attrArr[lznum*12];
    
    unsigned int Indices[lznum*6];
    
    
    for(int i=0;i<lznum;i++){
        int skipAtt=i*12;
        attrArr[skipAtt+0]=0.0f;
        attrArr[skipAtt+1]=0.0f;
        attrArr[skipAtt+2]=0.0f;
        
        attrArr[skipAtt+3]=100.0f;
        attrArr[skipAtt+4]=0.0f;
        attrArr[skipAtt+5]=0.0f;
        
        attrArr[skipAtt+6]=100.0f;
        attrArr[skipAtt+7]=100.0f;
        attrArr[skipAtt+8]=0.0f;
        
        attrArr[skipAtt+9]=0.0f;
        attrArr[skipAtt+10]=100.0f;
        attrArr[skipAtt+11]=0.0f;
        
        int skipTri=i*4;
        int skipInd=i*6;
        Indices[skipInd+0]=0+skipTri;
        Indices[skipInd+1]=1+skipTri;
        Indices[skipInd+2]=2+skipTri;
        Indices[skipInd+3]=0+skipTri;
        Indices[skipInd+4]=2+skipTri;
        Indices[skipInd+5]=3+skipTri;
    }
    
    GLuint verticesBuffer;
    glGenBuffers(1, &verticesBuffer);
    glBindBuffer(GL_ARRAY_BUFFER, verticesBuffer);
    glBufferData(GL_ARRAY_BUFFER, sizeof(attrArr), attrArr, GL_DYNAMIC_DRAW);
    self.objData.verticesBuffer=verticesBuffer;
    
    GLuint indexBuffer;
    glGenBuffers(1, &indexBuffer);
    glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, indexBuffer);
    glBufferData(GL_ELEMENT_ARRAY_BUFFER, sizeof(Indices), Indices, GL_STATIC_DRAW);
    self.objData.indexBuffer=indexBuffer;
    [[ProgrmaManager default] registe:Display3DBallPartilceShader.shaderStr shader3d: [[Display3DBallPartilceShader alloc]init]];
    self.shader3d=  [[ProgrmaManager default] getProgram:Display3DBallPartilceShader.shaderStr];
    
}
-(void)creatBaseTestBuFF
{
    self.objData=[[ObjData alloc]init];
    GLfloat attrArr[12];
    attrArr[0]=0.0f;
    attrArr[1]=0.0f;
    attrArr[2]=0.0f;
    
    attrArr[3]=100.0f;
    attrArr[4]=0.0f;
    attrArr[5]=0.0f;
    
    attrArr[6]=100.0f;
    attrArr[7]=100.0f;
    attrArr[8]=0.0f;
    
    attrArr[9]=0.0f;
    attrArr[10]=100.0f;
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
        glUseProgram(self.shader3d.program);
        Context3D *ctx=self.scene3d.context3D;
        
        [ctx setVcMatrix4fv:self.shader3d name:"viewMatrix" data:self.viewMatrix.m];
        [ctx setVcMatrix4fv:self.shader3d name:"posMatrix" data:self.posMatrix3d.m];
        
        [ctx pushVa:self.objData.verticesBuffer];
        [ctx setVaOffset:self.shader3d name:"position" dataWidth:3 stride:0 offset:0];
        
        [ctx pushVa: self.particleBallGpuData.basePosBuffer];
        [ctx setVaOffset:self.shader3d name:"basePos" dataWidth:3 stride:0 offset:0];
      
        [ctx drawCall:self.objData.indexBuffer  numTril:6 ];
    }
    
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
