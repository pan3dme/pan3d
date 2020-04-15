//
//  ParticleModelData.m
//  iosgl
//
//  Created by zhao on 15/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "ParticleModelData.h"
#import "Display3DModelPartilce.h"
#import "Display3DFacetShader.h"
#import "ProgrmaManager.h"
#import "BaseRes.h"

@implementation ParticleModelData

- (Display3DParticle *)getParticle
{
      return [[Display3DModelPartilce alloc]init];
}
- (void)setAllByteInfo:(ByteArray *)fs
{
    ByteArray* byte=fs;
    self.objData=[[ObjData alloc]init];
    self._maxAnimTime=[byte readFloat];
    int vLen=[byte getInt];
    
    int dataWidth = 5;
    int buffStride=dataWidth * 4;
    NSMutableData *dataBase = [[NSMutableData alloc] initWithLength:buffStride*vLen];
    int verOffsets = 0;
    int uvsOffsets = 3;
    self.objData.vertices=  [BaseRes readBytes2ArrayBuffer:byte nsdata:dataBase dataWidth:3 offset:verOffsets stride:buffStride readType:4];
    self.objData.uvs=   [BaseRes readBytes2ArrayBuffer:byte nsdata:dataBase dataWidth:2 offset:uvsOffsets stride:buffStride readType:4];
     int iLen = [byte readInt];
     NSMutableArray<NSNumber*>*  indexs=[[NSMutableArray alloc]init];
    for (int k = 0; k < iLen; k++) {
        [indexs addObject:[NSNumber numberWithInt:[byte readInt]]];
    }
    self.objData.indexs=indexs;
    self.objData.trinum=(int)self.objData.indexs.count;
    self.objData.stride = buffStride;
    [super setAllByteInfo:fs];
    [self upToGpu];
  
}
-(void)upToGpu
{
      self.objData.verticesBuffer=[self upGpuvertexBuffer:self.objData.vertices];
      self.objData.uvBuffer=[self upGpuvertexBuffer:self.objData.uvs];
      self.objData.indexBuffer=[self upGpuIndexBuffer:self.objData.indexs];
}

-(GLuint)upGpuIndexBuffer:(NSArray*)arr;
{
    unsigned int Indices[arr.count];
    for (int i=0; i<arr.count; i++) {
        Indices[i]=[arr[i] intValue];
    }
    GLuint indexBuffer;
    glGenBuffers(1, &indexBuffer);
    glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, indexBuffer);
    glBufferData(GL_ELEMENT_ARRAY_BUFFER, sizeof(Indices), Indices, GL_STATIC_DRAW);
    return indexBuffer;
}
-(GLuint)upGpuvertexBuffer:(NSArray*)arr;
{
    GLfloat attrArr[arr.count];
    for (int i=0; i<arr.count; i++) {
        attrArr[i]=[arr[i] floatValue];
    }
    GLuint verticesBuffer;
    glGenBuffers(1, &verticesBuffer);
    glBindBuffer(GL_ARRAY_BUFFER, verticesBuffer);
    glBufferData(GL_ARRAY_BUFFER, sizeof(attrArr), attrArr, GL_DYNAMIC_DRAW);
    return verticesBuffer;
}
-(void)regShader;
{
    if (!self.materialParam) {
        return;
    }
    //使用2进制着色器
    NSArray<NSNumber*>* shaderParameAry = [self getShaderParam];
    self.materialParam.shader=  [[ProgrmaManager default]getMaterialProgram:Display3DFacetShader.shaderStr shaderCls: [[Display3DFacetShader alloc]init]  material:self.materialParam.material paramAry:shaderParameAry parmaByFragmet:NO];
 
}
-(NSArray<NSNumber*>*)getShaderParam;
{
  
    NSArray<NSNumber*>* shaderParameAry = [[NSArray alloc] initWithObjects:@1,@1,@1,@1,@1, nil];
     
    return shaderParameAry;
}
@end

