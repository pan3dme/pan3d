//
//  ParticleData.m
//  iosgl
//
//  Created by zhao on 23/2/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "ParticleData.h"
#import "TimeLineData.h"
#import "ByteArray.h"
#import "TimeLine.h"

@implementation ParticleData
-(void)setAllByteInfo:(ByteArray*)byte;
{
    ParticleData* this=self;
    this.timelineData = [[TimeLineData alloc]init];
    
    [this.timelineData setByteData:byte];
    
    this._beginTime = this.timelineData.beginTime;
    this._delayedTime =  [byte readFloat];
    
    this._width =     [byte readFloat];
    this._height =    [byte readFloat];
    this._widthFixed = [byte readBoolean];
    this._heightFixed = [byte readBoolean];
    this._originWidthScale =       [byte readFloat];
    this._originHeightScale =    [byte readFloat];
    this._eyeDistance =    [byte readFloat];
    this._alphaMode =     [byte readFloat];
    this._uSpeed =     [byte readFloat];
    this._vSpeed =     [byte readFloat];
    
    
    this._animLine =  [byte readFloat];
    this._animRow =  [byte readFloat];
    this._animInterval =  [byte readFloat];
    this._renderPriority =  [byte readFloat];
    
    
    this._distortion =  [byte readBoolean];
    this._isUV = [byte readBoolean];
    this._isU = [byte readBoolean];
    this._isV =  [byte readBoolean];
    
    this._life =  [byte readFloat];;
    this._life = this._life > 10000 ? 50000 : this._life;
    
    this._watchEye =  [byte readBoolean];
    this._ziZhuanAngly =[[Vector3D alloc]init];
    this._ziZhuanAngly.x =  [byte readFloat];;
    this._ziZhuanAngly.y =  [byte readFloat];;
    this._ziZhuanAngly.z =  [byte readFloat];;
    this._ziZhuanAngly.w =  [byte readFloat];;
    
    this.rotationV3d = [[Vector3D alloc]init];
    this.rotationV3d.x =  [byte readFloat];;
    this.rotationV3d.y =  [byte readFloat];;
    this.rotationV3d.z =  [byte readFloat];;
    
    this.center =[[Vector3D alloc]init];
    this.center.x =  [byte readFloat];;
    this.center.y =  [byte readFloat];;
    this.center.z =  [byte readFloat];;
    this.center.w =  [byte readFloat];;
    
    this.overAllScale =  [byte readFloat];;
    
    //var materialParamStr: string = $byte.readUTF();
    //this.materialParamData = JSON.parse(materialParamStr);
    
    if (this._ziZhuanAngly && (this._ziZhuanAngly.x != 0 || this._ziZhuanAngly.y != 0 || this._ziZhuanAngly.z != 0)) {
        this._isZiZhuan = true;
    }
    
    [this readMaterialPara:byte];
    
    NSString* strMaterialUrl = [byte readUTF];
   // strMaterialUrl = strMaterialUrl.replace("_byte.txt", ".txt");
   // strMaterialUrl = strMaterialUrl.replace(".txt", "_byte.txt");
    self.materialByteUrl = strMaterialUrl;
    //strMaterialUrl    __NSCFString *    @"content/particleresources/materials/m_ef_par.txt"    0x0000000280608280
    //content/particleresources/materials/m_ef_par_byte.txt
}
-(void)setMaterialByteUrl:(NSString*)value;
{
    
}
-(Display3DParticle*)creatPartilce;
{
    Display3DParticle *particle = [self getParticle];
     particle.data = self;
     TimeLine* tl=[[TimeLine alloc]init];
     [tl setAllDataInfo:self.timelineData];
    [particle onCreated];
    
 /*
   var particle: Display3DParticle = this.getParticle();
  
              particle.data = this;
              var tl: TimeLine = new TimeLine();
              tl.setAllDataInfo(this.timelineData);
              particle.setTimeLine(tl);
  
              particle.onCreated();
  
              return particle;
  */
                return particle;
}
-(Display3DParticle*)getParticle;
{
    return nil;
}
 
 
-(void)readMaterialPara:(ByteArray*)byte
{
      ParticleData* this=self;
    this.materialParamData = [[NSMutableDictionary alloc]init];
    NSString* materlUrl = [byte readUTF];
      this.materialParamData[@"materialUrl"] = materlUrl;
    
   
    int texAryLen =  [byte readInt];
    this.materialParamData[@"texAry"] = [[NSMutableArray alloc]init];
    for (int i = 0; i < texAryLen; i++) {
        NSMutableDictionary* temp = [[NSMutableDictionary alloc]init];
        temp[@"isParticleColor"] = [byte readBoolean]?@1:@0 ;
        temp[@"paramName"] =  [byte readUTF];
        temp[@"url"] =[byte readUTF];
        if ( [temp[@"isParticleColor"]isEqual:@1]) {
            temp[@"curve"] =[[NSMutableDictionary alloc]init];
            [self readTempCurve: byte   curve:temp[@"curve"]];
        }
        [this.materialParamData[@"texAry"] addObject:temp];
    }
    [self readMaterialParaConAry:byte];
}
-(void)readTempCurve:(ByteArray*)byte curve:(NSMutableDictionary*)curve;
{
    curve[@"values"] = [[NSMutableArray alloc]init];
    int valuesLen =  [byte readInt];
    float scaleNum;
    if (valuesLen > 0) {
        scaleNum =  [byte readFloat];;
    }
    for (int j = 0; j < valuesLen; j++) {
        int rgbLen = [byte   readInt ];
        NSMutableArray* valuesArr=[[NSMutableArray alloc]init];
        for (int k = 0; k < rgbLen; k++) {
            [valuesArr addObject:[NSString stringWithFormat:@"%f",[byte readFloatOneByte]*1-127] ];
        }
        [curve[@"values"] addObject:valuesArr];
    }
    curve[@"type"] = [NSString stringWithFormat:@"%f", [byte readFloat]];
    curve[@"maxFrame"] =  [NSString stringWithFormat:@"%f", [byte readFloat]];
    curve[@"sideType"] =    [byte readBoolean]?@1:@0 ;
    curve[@"speedType"] = [byte readBoolean]?@1:@0 ;
    curve[@"useColorType"] =  [byte readBoolean]?@1:@0 ;
    curve[@"items"] = [self readItems:byte];
  //  [self makeCurveData:curve];
}
-(void)makeCurveData:(NSMutableDictionary*)curve
{
    NSMutableArray* arr  = curve[@"items"];
    NSMutableArray* r  = [[NSMutableArray alloc]init];
    NSMutableArray* g =[[NSMutableArray alloc]init];
    NSMutableArray* b  = [[NSMutableArray alloc]init];
    NSMutableArray* a  = [[NSMutableArray alloc]init];
    for (int i = 0; i < arr.count; i++) {
        if (i == (arr.count - 1)) { //最后一个
            [r addObject:@"1"];
            [g addObject:@"1"];
            [b addObject:@"1"];
            [a addObject:@"1"];
        } else {
            /*
             var $speedNum: number = arr[i + 1].frame - arr[i].frame;
             var $A = arr[i].vec3;
             var $B = arr[i + 1].vec3;
             var $a = $curve.items[i].rotation;
             var $b = $curve.items[i + 1].rotationLeft;
             
             r = r.concat(this.getBzData($A.x, $B.x, $a.x, $b.x, $speedNum));
             g = g.concat(this.getBzData($A.y, $B.y, $a.y, $b.y, $speedNum));
             b = b.concat(this.getBzData($A.z, $B.z, $a.z, $b.z, $speedNum));
             a = a.concat(this.getBzData($A.w, $B.w, $a.w, $b.w, $speedNum));
             */
        }
    }
    curve[@"values"] =[[NSMutableArray alloc]init];
    [curve[@"values"] addObject:@"1"];
    [curve[@"values"] addObject:@"1"];
    [curve[@"values"] addObject:@"1"];
    [curve[@"values"] addObject:@"1"];
}
-(NSMutableArray*)readItems:(ByteArray*)byte;
{
    NSMutableArray* items  = [[NSMutableArray alloc]init];
    int itemsLen = [byte readInt];
    for (int u = 0; u < itemsLen; u++) {
        NSMutableDictionary* obj = [[NSMutableDictionary alloc]init];
        obj[@"frame"] = [NSString stringWithFormat:@"%d", [byte readInt]];
        obj[@"vec3"] =  [byte readVector3D:YES];
        obj[@"rotation"] =[byte readVector3D:YES];
        obj[@"rotationLeft"] = [byte readVector3D:YES];
        [items addObject:obj];
    }
    return items;
}
-(void)readMaterialParaConAry:(ByteArray*)byte;
{
    NSMutableArray* arr  = [[NSMutableArray alloc]init];
    int conAryLen = [byte readInt];
    for (int i = 0; i < conAryLen; i++) {
        NSMutableDictionary* obj = [[NSMutableDictionary alloc]init];
        obj[@"type"] = [NSString stringWithFormat:@"%f", [byte readFloat]];
        obj[@"indexID"] = [NSString stringWithFormat:@"%d", (int)[byte readFloat]];
        obj[@"paramName"] = [byte readUTF];
        obj[@"curve"] =[[NSMutableDictionary alloc]init];
        [self readTempCurve:byte  curve:obj[@"curve"] ];
        [arr addObject:obj];
    }
    self.materialParamData[@"conAry"] = arr;
}
-(void)uploadGpu;
{
    
}
-(void)regShader;
{
    
}
-(void)initVcData;
{
    
}
  
@end
