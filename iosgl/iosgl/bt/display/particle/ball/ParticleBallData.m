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
        self._timeVec=[[Vector3D alloc]init];
        
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
        this._addSpeedVec = [[Vector3D alloc]x:this._addforce.x y:this._addforce.y z:this._addforce.z];
    } else {
        this._needAddSpeed = false;
    }
    if (this._toscale != 0 || this._waveform.x != 0 || this._waveform.y != 0) {
        this._needScale = true;
        this._scaleVec =[[Vector3D alloc] x:this._toscale y:this._waveform.x z:this._waveform.y w:this._beginScale];
        this._scaleCtrlVec =[[Vector3D alloc]x:this._widthFixed ? 0.0f : 1.0f y:this._heightFixed ? 0.0f : 1.0f z:this._paticleMaxScale - 1.0f w:this._paticleMinScale - 1.0f];
    } else {
        this._needScale = false;
    }
 
    
    [super setAllByteInfo:byte];
     
    this._timeVec = [[Vector3D alloc]x:0.0f y:this._acceleration z:this._life w:this._isLoop ? 1.0f : -1.0f];
    
   [self uploadGpu];
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
    
    
 
    
}
-(void)uploadGpu;
{
     self.objData =[[ParticleBallGpuData alloc]init] ;
    
    [self initBaseData];
    [self initUV ];
    [self initBasePos];
    [self initSpeed];
}
-(void)initBaseData
{
    float width=self._width;
    float height=self._height;
    float ranScale=  drand48()*(self._particleRandomScale.x-self._particleRandomScale.y)+self._particleRandomScale.y;
    /*
     var ranScale: number = Math.random() * (this._particleRandomScale.x - this._particleRandomScale.y) + this._particleRandomScale.y;
     
     verterList.push((-offsetX * width) * ranScale, (height - offsetY * height) * ranScale, 0);
     verterList.push((width - offsetX * width) * ranScale, (height - offsetY * height) * ranScale, 0);
     verterList.push((width - offsetX * width) * ranScale, (-offsetY * height) * ranScale, 0);
     verterList.push((-offsetX * width) * ranScale, (-offsetY * height) * ranScale, 0);
     */
    
    int lznum=self._totalNum;
    float tw=10.0f;
    float th=10.0f;
    
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
-(void)initSpeed;
{
    ParticleBallData* this=self;
    int lznum=self._totalNum;
    
    Vector3D* resultv3d ;
    Vector3D* v3d ;
    Matrix3D* ma=[[Matrix3D alloc]init];
    GLfloat speedArr[lznum*12];
    int idx=0;
    for (int i=0; i<lznum; i++) {
        resultv3d = [[Vector3D alloc]init];
        v3d =[[Vector3D alloc]init];
        if (this._shootAngly.x != 0 || this._shootAngly.y != 0 || this._shootAngly.z != 0) {//锥形速度
            double r = tan(this._shootAngly.w * M_PI / 180 *  drand48());
            double a = 360 * M_PI/ 180 * drand48();
            v3d = [[Vector3D  alloc]x:sin(a)*r y:cos(a)*r z:1];
            [ma identity];
            [ma fromVtoV:Vector3D.Z_AXIS newPos: this._shootAngly ];
            v3d = [ma transformVector:v3d];
            [v3d normalize];
            resultv3d =[resultv3d add:v3d];
        }
        if (this._lixinForce.x != 0 || this._lixinForce.y != 0 || this._lixinForce.z != 0) {
            v3d=[[Vector3D alloc]x:drand48()>0.5f?-this._lixinForce.x : this._lixinForce.x y:drand48()>0.5f?-this._lixinForce.y : this._lixinForce.y z:drand48()>0.5f?-this._lixinForce.z : this._lixinForce.z];
            [v3d normalize];
            resultv3d =[resultv3d add:v3d];
        }
        if (this._islixinAngly) {
            if (this._isEven) {
                v3d=[[Vector3D alloc]x:this.particleGpuData.basePos[i * 16] y:0 z:this.particleGpuData.basePos[i * 16+2] ];
            } else {
                v3d=[[Vector3D alloc]x:this.particleGpuData.basePos[i * 16] y:this.particleGpuData.basePos[i * 16+1] z:this.particleGpuData.basePos[i * 16+2] ];
            }
            [v3d normalize];
            resultv3d =[resultv3d add:v3d];
        }
        
        [resultv3d normalize ];
        
        if (this._isSendRandom) {
            [resultv3d scaleBy:this._speed * drand48()];
        } else {
            [resultv3d scaleBy:this._speed];
        }
        [resultv3d nslogStr];
        for(int j=0;j<4;j++){
            idx=12*i+j*3;
            speedArr[idx+0]=resultv3d.x;
            speedArr[idx+1]=resultv3d.y;
            speedArr[idx+2]=resultv3d.z;
        }
  
    }
    GLuint speedBuffer;
    glGenBuffers(1, &speedBuffer);
    glBindBuffer(GL_ARRAY_BUFFER, speedBuffer);
    glBufferData(GL_ARRAY_BUFFER, sizeof(speedArr), speedArr, GL_DYNAMIC_DRAW);
    self.particleGpuData.speedBuffer=speedBuffer;
 
}
-(void)initBasePos;
{
    ParticleBallData* this=self;
    int lznum=self._totalNum;
    Vector3D* v3d =[[Vector3D alloc]init];
    Matrix3D* ma=[[Matrix3D alloc]init];
    Vector3D* roundv3d=[[Vector3D alloc]init];
    GLfloat basePos[lznum*16];
    int idx=0;
    for (int i=0; i<lznum; i++) {
        if (this._isRandom) {
            roundv3d= [[Vector3D alloc]x:this._round.x * this._round.w y:this._round.y * this._round.w z:this._round.z * this._round.w];
            if (this._isEven) {//圆柱
                if (this._closeSurface) {//紧贴表面
                    v3d =[[Vector3D alloc]x:0  y:0 z:roundv3d.z];
                } else {
                    v3d =[[Vector3D alloc]x:0  y:0 z:roundv3d.z * drand48()* 2 - roundv3d.z];
                }
                [ma identity];
                [ma appendRotation:drand48()*360 axis:Vector3D.Y_AXIS];
                v3d=[ma transformVector:v3d];
                v3d.y = roundv3d.y * drand48()* 2 - roundv3d.y;
            }else{
                if (this._closeSurface) {//只有xyz相等时候才能紧贴表面
                    v3d =[[Vector3D alloc]x:0  y:0 z:roundv3d.z];
                    [ma identity];
                    if (this._halfCircle) {
                        [ma appendRotation:drand48()*180 axis:Vector3D.X_AXIS];
                    } else {
                        [ma appendRotation:drand48()*360 axis:Vector3D.X_AXIS];
                    }
                    [ma appendRotation:drand48()*360 axis:Vector3D.Y_AXIS];
                    v3d=[ma transformVector:v3d];
                }else{
                    if (this._halfCircle) {
                        v3d =[[Vector3D alloc]x:roundv3d.x *  drand48() * 2 - roundv3d.x  y: roundv3d.y *  drand48() z: roundv3d.y *  drand48()];
                    } else {
                        v3d =[[Vector3D alloc]x:roundv3d.x * drand48() * 2 - roundv3d.x  y:roundv3d.y *drand48() * 2 - roundv3d.y z:roundv3d.z * drand48()* 2 - roundv3d.z];
                    }
                }
                
                
            }
        }else{
            v3d =[[Vector3D alloc]init];
        }
        v3d = [v3d add:this._basePositon];
        v3d.w=i * this._shootSpeed;
        
//        v3d.x=-arc4random() % 200 -100.0f;
//        v3d.y=arc4random() % 200 -100.0f;
//        v3d.z=arc4random() % 200 -100.0f;
//        v3d.w=0.0f;
        
        for(int j=0;j<4;j++){
            idx=16*i+j*4;
            basePos[idx+0]=v3d.x;
            basePos[idx+1]=v3d.y;
            basePos[idx+2]=v3d.z;
            basePos[idx+3]=v3d.w;
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
