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

/*
 
 private readRandomColor($byte: Pan3dByteArray): void {
 var randomColorLen: number = $byte.readInt();
 var obj: any = new Object;
 obj.alpha = new Array;
 obj.color = new Array;
 obj.pos = new Array;
 //fs.writeFloat(randomColor.alpha[i])
 //fs.writeFloat(randomColor.color[i])
 //fs.writeFloat(randomColor.pos[i])
 
 for (var i: number = 0; i < randomColorLen; i++) {
 obj.alpha.push($byte.readFloat())
 obj.color.push($byte.readFloat())
 obj.pos.push($byte.readFloat())
 }
 this._textureRandomColorInfo = obj;
 }
 */
@end
