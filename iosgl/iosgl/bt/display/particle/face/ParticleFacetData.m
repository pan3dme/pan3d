//
//  ParticleFacetData.m
//  iosgl
//
//  Created by zhao on 23/2/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "ParticleFacetData.h"
#import "Display3DFacetParticle.h"
#import "Display3DFacetShader.h"
#import "ProgrmaManager.h"
#import "ObjData.h"

@implementation ParticleFacetData
- (void)setAllByteInfo:(ByteArray *)byte
{
    
    ParticleFacetData *this=self;
    this._maxAnimTime = [byte readFloat];
    this._isCycle =[byte readBoolean];
    this._lockx = [byte readBoolean];
    this._locky = [byte readBoolean];
    [super setAllByteInfo:byte];

    [self uploadGpu];
    
}
-(void)uploadGpu;
{
  
    [self makeRectangleData:self._width height:self._height offsetX:self._originWidthScale offsetY:self._originHeightScale isUV:self._isUV isU:self._isUV isV:self._isV animLine:self._animLine animRow:self._animRow];
}
 
-(void)makeRectangleData:(float)width height:(float)height offsetX:(float)offsetX  offsetY:(float)offsetY  isUV:(BOOL)isUV  isU:(BOOL)isU  isV:(BOOL)isV  animLine:(float)animLine animRow:(float)animRow;
{
    
 
 
    self.objData=[[ObjData alloc]init];
    GLfloat attrArr[12];
    attrArr[0]=-offsetX * width;
    attrArr[1]=height - offsetY * height;
    attrArr[2]=0.0f;
    
    attrArr[3]=width - offsetX * width;
    attrArr[4]=height - offsetY * height;
    attrArr[5]=10.0f;
    
    attrArr[6]=width - offsetX * width;
    attrArr[7]=-offsetY * height;
    attrArr[8]=10.0f;
    
    attrArr[9]=-offsetX * width;
    attrArr[10]=-offsetY * height;
    attrArr[11]=0.0f;
    
    

 
      
      GLuint verticesBuffer;
      glGenBuffers(1, &verticesBuffer);
      glBindBuffer(GL_ARRAY_BUFFER, verticesBuffer);
      glBufferData(GL_ARRAY_BUFFER, sizeof(attrArr), attrArr, GL_DYNAMIC_DRAW);
      self.objData.verticesBuffer=verticesBuffer;
    
    
    GLfloat uvArr[8];
      uvArr[0]=0.0f;
      uvArr[1]=0.0f;
      uvArr[2]=0.0f;
      uvArr[3]=0.0f;
      uvArr[4]=0.0f;
      uvArr[5]=0.0f;
      uvArr[6]=0.0f;
      uvArr[7]=0.0f;
    
    
    GLuint uvBuffer;
        glGenBuffers(1, &uvBuffer);
        glBindBuffer(GL_ARRAY_BUFFER, uvBuffer);
        glBufferData(GL_ARRAY_BUFFER, sizeof(uvArr), uvArr, GL_DYNAMIC_DRAW);
        self.objData.uvBuffer=uvBuffer;
    
    
      
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
      self.objData.trinum=6;
}

-(void)regShader;
{
    if ( self.materialParam) {
       [[ProgrmaManager default] registe:Display3DFacetShader.shaderStr shader3d: [[Display3DFacetShader alloc]init]];
       self.materialParam.shader=  [[ProgrmaManager default] getProgram:Display3DFacetShader.shaderStr];
        
    }
 
    
}

-(Display3DParticle*)getParticle;
{
    return [[Display3DFacetParticle alloc]init];
}
@end
