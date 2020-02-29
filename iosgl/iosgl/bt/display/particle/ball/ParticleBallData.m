//
//  ParticleBallData.m
//  iosgl
//
//  Created by zhao on 23/2/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "ParticleBallData.h"
#import "ByteArray.h"
#import "Vector3D.h"
#import "Vector2D.h"
#import "ParticleBallGpuData.h"
#import "Display3DBallPartilce.h"

@implementation ParticleBallData

- (instancetype)init
{
    self = [super init];
    if (self) {
        self._round=[[Vector3D alloc]init];
        self._shootAngly=[[Vector3D alloc]init];
        self._particleRandomScale=[[Vector3D alloc]init];
        
    }
    return self;
}
- (void)setAllByteInfo:(ByteArray *)byte
{
    ParticleBallData *this=self;
    this._totalNum =  [byte readFloat];
    this._acceleration = [byte readFloat];
    this._toscale =  [byte readFloat];
    this._shootSpeed =  [byte readFloat];
    this._isRandom =  [byte readBoolean];
    this._isSendRandom =  [byte readBoolean];
    this._round.x = [byte readFloat];
    this._round.y = [byte readFloat];
    this._round.z = [byte readFloat];
    this._round.w =  [byte readFloat];
    this._is3Dlizi =  [byte readBoolean];
    this._halfCircle = [byte readBoolean];
    this._shootAngly.x =  [byte readFloat];
    this._shootAngly.y =  [byte readFloat];
    this._shootAngly.z = [byte readFloat];
    this._shootAngly.w =  [byte readFloat];
    
    
    [this._shootAngly normalize];//发射锥角，设置为摸范围内 原来没有做处理，新加
    
    this._speed = [byte readFloat];
    
    this._isLoop =[byte readBoolean];
    
    this._isSendAngleRandom = [byte readBoolean];
    
    
    this._waveform.x =  [byte readFloat];
    this._waveform.y =  [byte readFloat];
    this._waveform.z =  [byte readFloat];
    this._waveform.w =  [byte readFloat];
    
    
    this._closeSurface =[byte readBoolean];
    this._isEven =  [byte readBoolean];
    this._paticleMaxScale =  [byte readFloat];
    this._paticleMinScale = [byte readFloat];
    this._basePositon.x = [byte readFloat];
    this._basePositon.y = [byte readFloat];
    this._basePositon.z =  [byte readFloat];
    this._basePositon.w =  [byte readFloat];
    
    this._baseRandomAngle =  [byte readFloat];
    this._shapeType =  [byte readFloat];
    
    this._lockX = [byte readBoolean];
    this._lockY =[byte readBoolean];
    
    
    this._addforce.x = [byte readFloat];
    this._addforce.y =  [byte readFloat];
    this._addforce.z =  [byte readFloat];
    this._addforce.w =  [byte readFloat];
    [this._addforce scaleByW];
    
    this._lixinForce.x =  [byte readFloat];
    this._lixinForce.y = [byte readFloat];
    this._lixinForce.z =  [byte readFloat];
    this._lixinForce.w = [byte readFloat];
    
    
    this._islixinAngly =[byte readBoolean];
    
    
    this._particleRandomScale.x = [byte readFloat];
    this._particleRandomScale.y =  [byte readFloat];
    this._particleRandomScale.z = [byte readFloat];
    this._particleRandomScale.w = [byte readFloat];
    
    this._playSpeed =  [byte readFloat];
    this.facez =[byte readBoolean];
    this._beginScale =  [byte readFloat];
    
    this._widthFixed = [byte readBoolean];
    this._heightFixed =[byte readBoolean];
    
    [self readRandomColor:byte];
    
    if (this._acceleration != 0 || this._addforce.x != 0 || this._addforce.y != 0 || this._addforce.z != 0) {
        this._needAddSpeed = true;
        // this._addSpeedVec = [this._addforce.x, this._addforce.y, this._addforce.z];
    } else {
        this._needAddSpeed = false;
    }
    if (this._toscale != 0 || this._waveform.x != 0 || this._waveform.y != 0) {
        this._needScale = true;
        // this._scaleVec = [this._toscale, this._waveform.x, this._waveform.y, this._beginScale];
        // this._scaleCtrlVec = [this._widthFixed ? 0 : 1, this._heightFixed ? 0 : 1, this._paticleMaxScale - 1, this._paticleMinScale - 1];
    } else {
        this._needScale = false;
    }
    
    
    [super setAllByteInfo:byte];
}
-(Display3DParticle*)getParticle;
{
    return [[Display3DBallPartilce alloc]init];
}
-(void)readRandomColor:(ByteArray*)byte;
{
    int randomColorLen =  [byte readInt];
    NSMutableDictionary* obj   = [[NSMutableDictionary alloc]init];
    obj[@"alpha"]=[[NSMutableArray alloc]init];
    obj[@"color"]=[[NSMutableArray alloc]init];
    obj[@"pos"]=[[NSMutableArray alloc]init];
    
    
    for (int i = 0; i < randomColorLen; i++) {
        
        [obj[@"alpha"] addObject:[NSString stringWithFormat:@"%f",[byte readFloat] ]];
        [obj[@"color"] addObject:[NSString stringWithFormat:@"%f",[byte readFloat] ]];
        [obj[@"pos"] addObject:[NSString stringWithFormat:@"%f",[byte readFloat] ]];
    }
    
    self._textureRandomColorInfo = obj;
    
    
    [self uploadGpu];
    
}
-(void)uploadGpu;
{
     self.objData =[[ParticleBallGpuData alloc]init] ;
    
    [self initBaseData];
    [self initUV ];
    [self initBasePos];
}
-(void)initBaseData
{
  
  int lznum=self._totalNum;
     float tw=20.0f;
     float th=20.0f;
 
     GLfloat attrArr[lznum*16];
     
     unsigned int Indices[lznum*6];
 
     for(int i=0;i<lznum;i++){
         int skipAtt=i*16;
         attrArr[skipAtt+0]=-tw;
         attrArr[skipAtt+1]=-th;
         attrArr[skipAtt+2]=0.0f;
            attrArr[skipAtt+3]=i;
         
         attrArr[skipAtt+4]=tw;
         attrArr[skipAtt+5]=-th;
         attrArr[skipAtt+6]=0.0f;
           attrArr[skipAtt+7]=i;
         
         attrArr[skipAtt+8]=tw;
         attrArr[skipAtt+9]=th;
         attrArr[skipAtt+10]=0.0f;
           attrArr[skipAtt+11]=i;
         
         attrArr[skipAtt+12]=-tw;
         attrArr[skipAtt+13]=th;
         attrArr[skipAtt+14]=0.0f;
           attrArr[skipAtt+15]=i;
         
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
 
  
 
}
-(void)initUV;
{
    int lznum=self._totalNum;
 
    Vector2D* a= [[Vector2D alloc]x:0.0f y:0.0f];
    Vector2D* b= [[Vector2D alloc]x:1.0f y:0.0f];
    Vector2D* c= [[Vector2D alloc]x:1.0f y:1.0f];
    Vector2D* d= [[Vector2D alloc]x:0.0f y:1.0f];
 
    
        GLfloat uvArr[lznum*12];
    
        for(int i=0;i<lznum;i++){
            int skipAtt=i*12;
            uvArr[skipAtt+0]=a.x;
            uvArr[skipAtt+1]=a.y;
            uvArr[skipAtt+2]=i;
            
            uvArr[skipAtt+3]=b.x;
            uvArr[skipAtt+4]=b.y;
            uvArr[skipAtt+5]=i;
            
            uvArr[skipAtt+6]=c.x;
            uvArr[skipAtt+7]=c.y;
            uvArr[skipAtt+8]=i;
            
            uvArr[skipAtt+9]=d.x;
            uvArr[skipAtt+10]=d.y;
            uvArr[skipAtt+11]=i;
   
        }
    
      GLuint uvBuffer;
      glGenBuffers(1, &uvBuffer);
      glBindBuffer(GL_ARRAY_BUFFER, uvBuffer);
      glBufferData(GL_ARRAY_BUFFER, sizeof(uvArr), uvArr, GL_DYNAMIC_DRAW);
      self.particleGpuData.uvBuffer=uvBuffer;
        
}
-(void)initBasePos;
{
     int lznum=self._totalNum;
    
       GLfloat basePos[lznum*12];
        int idx=0;
       for (int i=0; i<lznum; i++) {
         Vector3D* v3d=[[Vector3D alloc]init];
              v3d.x=-arc4random() % 200 -100.0f;
              v3d.y=arc4random() % 200 -100.0f;
              v3d.z=arc4random() % 200 -100.0f;
          
              for(int j=0;j<4;j++){
                  idx=12*i+j*3;
                  basePos[idx+0]=v3d.x;
                  basePos[idx+1]=v3d.y;
                  basePos[idx+2]=v3d.z;
              }
       }
    
       self.particleGpuData.basePos=basePos;
       GLuint basePosBuffer;
       glGenBuffers(1, &basePosBuffer);
       glBindBuffer(GL_ARRAY_BUFFER, basePosBuffer);
       glBufferData(GL_ARRAY_BUFFER, sizeof(basePos), basePos, GL_DYNAMIC_DRAW);
       self.particleGpuData.basePosBuffer=basePosBuffer;
}
-(void)regShader;
{
    
}
-(void)initVcData;
{
    
}
-(void)setParticleGpuData:(ParticleBallGpuData*)value;
{
    self.objData=value;
}
-(ParticleBallGpuData*)particleGpuData;
{
    return ((ParticleBallGpuData*)(self.objData));
}
@end
