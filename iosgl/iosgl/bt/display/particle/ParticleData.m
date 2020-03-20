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
#import "CurveVo.h"
#import "ParamDataVo.h"
#import "MaterialManager.h"

 
 

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
     strMaterialUrl= [strMaterialUrl stringByReplacingOccurrencesOfString:@"_byte.txt" withString:@".txt"];
     strMaterialUrl= [strMaterialUrl stringByReplacingOccurrencesOfString:@".txt" withString:@"_byte.txt"];
 
    self.materialByteUrl = strMaterialUrl;
  
}
-(void)setMaterialByteUrl:(NSString*)value;
{
    if ([self._materialUrl  isEqualToString:value]) {
       return;
    }
    self._materialUrl = value;
// -(void)getMaterialByte:(NSString*)url fun:(MaterialBlock)fun info:(NSDictionary*)info autoReg:(BOOL)autoReg regName:(NSString*)regName shader3DCls:(NSObject*)shader3DCls;
    [[MaterialManager default] getMaterialByte:value fun:^(Material * material) {
        
        [self onMaterialLoad:material];
        
    } info:nil autoReg:nil regName:nil shader3DCls:nil];

}
-(void)onMaterialLoad:(Material*)material;
{
    ParticleData* this=self;
    this.materialParam = [[MaterialParam alloc]init] ;
    [this.materialParam SetMaterial:material];
    [this.materialParam SetLife:self._life];
    if (this.materialParamData) {
        [this.materialParam setTextObj:this.materialParamData.texAry];
        [this.materialParam setConstObj:this.materialParamData.conAry];
    }
    
        // MaterialManager.getInstance().loadDynamicTexUtil(this.materialParam);
    
    [[MaterialManager default] loadDynamicTexUtil:this.materialParam];
    
    [self regShader];
    /*
     
     this.materialParam.setLife(this._life);


     if (this.materialParamData) {
         this.materialParam.setTextObj(this.materialParamData.texAry);
         this.materialParam.setConstObj(this.materialParamData.conAry);
     }

     MaterialManager.getInstance().loadDynamicTexUtil(this.materialParam);

     this.regShader();

     */
    
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
    this.materialParamData = [[MaterialParamData alloc]init];
    NSString* materlUrl = [byte readUTF];
    this.materialParamData.materialUrl = materlUrl;
    
    
    int texAryLen =  [byte readInt];
    this.materialParamData.texAry = [[NSMutableArray alloc]init];
    for (int i = 0; i < texAryLen; i++) {
        ParamDataVo* temp =[[ParamDataVo alloc]init];
        temp.isParticleColor= [byte readBoolean] ;
        temp.paramName =  [byte readUTF];
        temp.url =[byte readUTF];
        if ( temp.isParticleColor) {
            temp.curve=[[CurveVo alloc]init];
            [self readTempCurve: byte   curve:temp.curve];
        }
        [this.materialParamData.texAry addObject:temp];
    }
    [self readMaterialParaConAry:byte];
}
-(void)readTempCurve:(ByteArray*)byte curve:(CurveVo*)curve;
{
    curve.values = [[NSMutableArray alloc]init];
    int valuesLen =  [byte readInt];
    float scaleNum;
    if (valuesLen > 0) {
        scaleNum =  [byte readFloat];;
    }
    for (int j = 0; j < valuesLen; j++) {
        int rgbLen = [byte   readInt ];
        NSMutableArray* valuesArr=[[NSMutableArray alloc]init];
        for (int k = 0; k < rgbLen; k++) {
            [valuesArr addObject:[NSString stringWithFormat:@"%f",[byte readByte]/127.0f *scaleNum] ];
        }
        [curve.values addObject:valuesArr];
    }
    curve.type = [byte readFloat] ;
    curve.maxFrame =   [byte readFloat];
    curve.sideType =    [byte readBoolean]  ;
    curve.speedType = [byte readBoolean]  ;
    curve.useColorType =  [byte readBoolean]  ;
    curve.items = [self readItems:byte];
   
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
        obj[@"curve"] =[[CurveVo alloc]init];
        [self readTempCurve:byte  curve:obj[@"curve"] ];
        [arr addObject:obj];
    }
    self.materialParamData.conAry = arr;
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
