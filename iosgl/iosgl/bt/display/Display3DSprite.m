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
#import "Display3DShader.h"
#import "ProgrmaManager.h"
 

@implementation Display3DSprite

- (instancetype)init
{
    self = [super init];
    if (self) {
        [self onCreated];
    }
    return self;
}

-(void)onCreated;
{
      self.objData=[[ObjData alloc]init];
      GLfloat attrArr[12];
      attrArr[0]=100.50f;
      attrArr[1]=0.0f;
      attrArr[2]=0.0f;
      
      attrArr[3]=100.25f;
      attrArr[4]=0.0f;
      attrArr[5]=0.0f;
      
      attrArr[6]=100.25f;
      attrArr[7]=0.25f;
      attrArr[8]=100.0f;
      
      attrArr[9]=0.0f;
      attrArr[10]=0.25f;
      attrArr[11]=100.0f;
      
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
    
    [[ProgrmaManager default] registe:Display3DShader.shaderStr shader3d: [[Display3DShader alloc]init]];
    self.shader3d=  [[ProgrmaManager default] getProgram:Display3DShader.shaderStr];
    
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
 
      if(self.shader3d&&self.objData){
              GLuint progame= self.shader3d.program;
              glUseProgram(progame);
              Context3D *context3D=self.scene3d.context3D;
              [context3D pushVa:self.objData.verticesBuffer];
              GLuint position = glGetAttribLocation( self.shader3d.program,"position");
              glEnableVertexAttribArray(position);
              glVertexAttribPointer(position, 3, GL_FLOAT, GL_FALSE,0, (GLfloat *)NULL+0);
              [context3D setVcMatrix4fv:self.shader3d name:"viewMatrix" data:self.viewMatrix.m];
              [context3D setVcMatrix4fv:self.shader3d name:"posMatrix" data:self.posMatrix3d.m];
              [context3D drawCall:self.objData.indexBuffer  numTril:self.objData.trinum ];
          }
  
}

@end
