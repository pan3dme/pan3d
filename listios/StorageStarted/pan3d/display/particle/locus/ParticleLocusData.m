//
//  ParticleLocusData.m
//  iosgl
//
//  Created by zhao on 25/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "ParticleLocusData.h"
#import "BaseRes.h"
#import "Vector3D.h"
#import "Display3DLocusShader.h"
#import "ProgrmaManager.h"
#import "Display3DLocusPartilce.h"

@interface ParticleLocusData ()
 




 

@end

@implementation ParticleLocusData
 
- (void)setAllByteInfo:(ByteArray *)byte
{
    ParticleLocusData *this=self;
    this._isLoop = [byte readBoolean];
    this._speed = [byte readFloat];
    this._density =[byte readFloat];
    this._isEnd = [byte readBoolean];
    
    this.objData=[[ObjData alloc]init:self.scene3D];
    int vLen  = [byte getInt];
    int dataWidth = 9;
    int buffStride=dataWidth * 4;
 
    NSMutableData *dataBase = [[NSMutableData alloc] initWithLength:vLen *buffStride];

    int verOffsets = 0;
    int normalsOffsets=3;
    int uvsOffsets = 7;

    this.objData.vertices=  [BaseRes readBytes2ArrayBuffer:byte nsdata:dataBase dataWidth:3 offset:verOffsets stride:buffStride readType:4];
    this.objData.nrms=  [BaseRes readBytes2ArrayBuffer:byte nsdata:dataBase dataWidth:4 offset:normalsOffsets stride:buffStride readType:4];
    this.objData.uvs=  [BaseRes readBytes2ArrayBuffer:byte nsdata:dataBase dataWidth:2 offset:uvsOffsets stride:buffStride readType:4];

    int iLen  = [byte readInt];
    NSMutableArray *idxItem=[[NSMutableArray alloc]init];
    for (int k = 0; k < iLen; k++) {
        [idxItem addObject:[NSNumber numberWithInt:[byte readInt]]];
    }
    this.objData.indexs=  idxItem;
    this.objData.stride = dataWidth * 4;

    [super setAllByteInfo:byte];
    [self initUV];
    
    if (this._watchEye) {
        this._caramPosVec =[[Vector3D alloc]x:0 y:0 z:0 ];
    }
    this._uvVec = [[Vector3D  alloc]x:this._isU ? -1 : 1 y:this._isV ? -1 : 1 z:this._isUV ? 1 : -1];
 
    [self uploadGpu];
    
}
-(void)uploadGpu;
{
    [self upGpuvertexBuffer];
    [self upGpuNrmBuffer];
    [self upGpuUvsBuffer];
    [self upGpuIndexBuffer];
}
-(void)upGpuvertexBuffer;
{
 
//    GLfloat attrArr[self.objData.vertices.count];
//    for (int i=0; i<self.objData.vertices.count; i++) {
//        attrArr[i]=[self.objData.vertices[i] floatValue];
//    }
 
  
  
    
    self.objData.mtkvertices=  [self.scene3D.context3D changeDataToGupMtkfloat3: self.objData.vertices];
    
    
    
}
-(void)upGpuNrmBuffer;
{
//    GLfloat nrms[self.objData.nrms.count];
//    for (int i=0; i<self.objData.nrms.count; i++) {
//        nrms[i]=[self.objData.nrms[i] floatValue];
//    }
    if(self.objData.nrms!=nil){
        
        self.objData.mtknrms=  [self.scene3D.context3D changeDataToGupMtkfloat4: self.objData.nrms];
    }
 
    
   
     
}
-(void)upGpuUvsBuffer;
{
//    GLfloat uvs[self.objData.uvs.count];
//    for (int i=0; i<self.objData.uvs.count; i++) {
//        uvs[i]=[self.objData.uvs[i] floatValue];
//    }
 
    self.objData.mtkuvs=[self.scene3D.context3D changeDataToGupMtkfloat2:self.objData.uvs];
    
  
}
-(void)upGpuIndexBuffer
{
    unsigned int Indices[self.objData.indexs.count];
    for (int i=0; i<self.objData.indexs.count; i++) {
        Indices[i]=[self.objData.indexs[i] intValue];
    }
    
    
    self.objData.mtkindexs = [self.scene3D.mtkView.device newBufferWithBytes:Indices
                                                     length:sizeof(Indices)
                                                    options:MTLResourceStorageModeShared];
    
    
    self.objData.trinum=(int)self.objData.indexs.count;
    
    self.objData.mtkindexCount = self.objData.trinum;
    
 
}

-(void)initUV;
{
     ParticleLocusData *this=self;
    
  
    float nowTime = 0;
    float lifeRoundNum = (this._life / 100);
    float moveUv = this._speed * nowTime / this._density / 10;
    if (this._isEnd) {
        moveUv = MIN(1, moveUv);
    }
    Vector3D* fcVector;
    if (this._isLoop) {
        if (this._life) {
             moveUv = moveUv- ceilf(moveUv/(lifeRoundNum+1))*(lifeRoundNum+1) ;
            fcVector=  [[Vector3D alloc]x:moveUv y:lifeRoundNum z:lifeRoundNum];
        } else {
            moveUv = moveUv- ceilf(moveUv/1)*1 ;
            fcVector=  [[Vector3D alloc]x:moveUv + 1 y:99 z:-2];
        }
    } else {
        if (this._life) {
      
             fcVector=  [[Vector3D alloc]x:moveUv y:lifeRoundNum z:-1];
        } else {
         
              fcVector=  [[Vector3D alloc]x:moveUv y:99 z:-1];
        }
    }
    this._resultUvVec=fcVector;
 
    
}
-(void)regShader;
{

   
    if (!self.materialParam) {
          return;
      }
     NSArray<NSNumber*>* shaderParameAry = [self getShaderParam];
    self.materialParam.shader=  [self.scene3D.progrmaManager getMaterialProgram:Display3DLocusShader.shaderStr shaderCls: [[Display3DLocusShader alloc]init:self.scene3D]  material:self.materialParam.material paramAry:shaderParameAry parmaByFragmet:NO];

   
    
}
-(NSArray<NSNumber*>*)getShaderParam;
{
        ParticleLocusData* this=self;
    NSNumber* isWatchEye = this._watchEye ? @1 : @0;
    NSNumber* changeUv = @0;
    NSNumber* hasParticleColor = this.materialParam.material.hasParticleColor ? @1 : @0;
    if (this._isU || this._isV || this._isUV) {
        changeUv = @1;
        this._changUv = true;
    } else {
        this._changUv = false;
    }
    NSArray<NSNumber*>* shaderParameAry = [[NSArray alloc] initWithObjects:isWatchEye, changeUv, hasParticleColor , nil];
    return shaderParameAry;
}
-(Display3DParticle*)getParticle;
{
    return [[Display3DLocusPartilce alloc]init:self.scene3D];
}
@end
