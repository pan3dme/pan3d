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
#import "Display3DLocusPartilce.h"

@interface ParticleLocusData ()
 
@property (nonatomic, assign)  float  _speed; //粒子运动数字
@property (nonatomic, assign)  float  _density;
@property (nonatomic, assign)  BOOL  _isEnd;
@property (nonatomic, assign)  BOOL  _changUv;
@property (nonatomic, assign)  BOOL  _isLoop;  //是否循环

 

@end

@implementation ParticleLocusData
 
- (void)setAllByteInfo:(ByteArray *)byte
{
    ParticleLocusData *this=self;
    this._isLoop = [byte readBoolean];
    this._speed = [byte readFloat];
    this._density =[byte readFloat];
    this._isEnd = [byte readBoolean];
    
    this.objData=[[ObjData alloc]init];
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
 
    GLfloat attrArr[self.objData.vertices.count];
    for (int i=0; i<self.objData.vertices.count; i++) {
        attrArr[i]=[self.objData.vertices[i] floatValue]*1.0;
    }
 
 
     attrArr[0]=-200.0f;
     attrArr[1]=0.0f;
     attrArr[2]=0.0f;
     
     attrArr[3]=0.0f;
     attrArr[4]=0.0f;
     attrArr[5]=-100.0f;

     attrArr[6]=100.0f;
     attrArr[7]=0.0f;
     attrArr[8]=100.0f;

     attrArr[9]=-100.0f;
     attrArr[10]=0.0f;
     attrArr[11]=-100.0f;
    
 
     
 
    
    GLuint verticesBuffer;
    glGenBuffers(1, &verticesBuffer);
    glBindBuffer(GL_ARRAY_BUFFER, verticesBuffer);
    glBufferData(GL_ARRAY_BUFFER, sizeof(attrArr), attrArr, GL_DYNAMIC_DRAW);
    self.objData.verticesBuffer=verticesBuffer;
}
-(void)upGpuNrmBuffer;
{
    GLfloat nrms[self.objData.nrms.count];
    for (int i=0; i<self.objData.nrms.count; i++) {
        nrms[i]=[self.objData.nrms[i] floatValue];
    }
    GLuint nrmsBuffer;
    glGenBuffers(1, &nrmsBuffer);
    glBindBuffer(GL_ARRAY_BUFFER, nrmsBuffer);
    glBufferData(GL_ARRAY_BUFFER, sizeof(nrms), nrms, GL_DYNAMIC_DRAW);
    self.objData.nrmsBuffer=nrmsBuffer;
}
-(void)upGpuUvsBuffer;
{
    GLfloat uvs[self.objData.uvs.count];
    for (int i=0; i<self.objData.uvs.count; i++) {
        uvs[i]=[self.objData.uvs[i] floatValue];
    }
    GLuint uvBuffer;
    glGenBuffers(1, &uvBuffer);
    glBindBuffer(GL_ARRAY_BUFFER, uvBuffer);
    glBufferData(GL_ARRAY_BUFFER, sizeof(uvs), uvs, GL_DYNAMIC_DRAW);
    self.objData.uvBuffer=uvBuffer;
}
-(void)upGpuIndexBuffer
{
    unsigned int Indices[self.objData.indexs.count];
    for (int i=0; i<self.objData.indexs.count; i++) {
        Indices[i]=[self.objData.indexs[i] intValue];
    }
    
    GLuint indexBuffer;
    glGenBuffers(1, &indexBuffer);
    glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, indexBuffer);
    glBufferData(GL_ELEMENT_ARRAY_BUFFER, sizeof(Indices), Indices, GL_STATIC_DRAW);
    self.objData.indexBuffer=indexBuffer;
    
    self.objData.trinum=(int)self.objData.indexs.count;
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
-(Display3DParticle*)getParticle;
{
    return [[Display3DLocusPartilce alloc]init];
}
@end
