//
//  ParticleModelData.m
//  iosgl
//
//  Created by zhao on 15/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "ParticleModelData.h"
#import "Display3DModelPartilce.h"
#import "Display3DModelShader.h"
#import "ProgrmaManager.h"
#import "BaseRes.h"

@implementation ParticleModelData

- (Display3DParticle *)getParticle
{
    return [[Display3DModelPartilce alloc]init:self.scene3D];
}
- (void)setAllByteInfo:(ByteArray *)fs
{
    ByteArray* byte=fs;
    self.objData=[[ObjData alloc]init:self.scene3D];
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
    if (self.version >= 36) {
        [byte readInt];
    }

    [super setAllByteInfo:fs];
    [self upToGpu];
    
    
    self.objData.mtkvertices=  [self.scene3D.context3D changeDataToGupMtkfloat3: self.objData.vertices];
    

    self.objData.mtkuvs=  [self.scene3D.context3D changeDataToGupMtkfloat2: self.objData.uvs];
   
    
    self.objData.mtkindexs = [self.scene3D.context3D changeObjDataIndexToMtkGpu:self.objData.indexs];
    
    self.objData.trinum=(int)self.objData.indexs.count;
    self.objData.mtkindexCount = self.objData.trinum;
  
}
-(void)upToGpu
{
 
  
}

 
-(void)regShader;
{
    if (!self.materialParam) {
        return;
    }
    //使用2进制着色器
    NSArray<NSNumber*>* shaderParameAry = [self getShaderParam];
    self.materialParam.shader=  [self.scene3D.progrmaManager getMaterialProgram:Display3DModelShader.shaderStr shaderCls: [[Display3DModelShader alloc]init:self.scene3D]  material:self.materialParam.material paramAry:shaderParameAry parmaByFragmet:NO];
 
}
-(NSArray<NSNumber*>*)getShaderParam;
{
  
    NSArray<NSNumber*>* shaderParameAry = [[NSArray alloc] initWithObjects:@1,@1,@1,@1,@1, nil];
     
    return shaderParameAry;
}
@end

