//
//  Material.m
//  iosgl
//
//  Created by zhao on 9/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Material.h"

@implementation Material
-(void)setByteData:(ByteArray*)fs;
{
    Material* this=self;
    
    self.version = [fs readInt];
    self.shaderStrRead = [fs readUTF];
    this.hasTime = [fs readBoolean];//fs.writeBoolean(_compileData.hasTime);
    this.timeSpeed = [fs readFloat];//fs.writeFloat(_compileData.timeSpeed);
    this.blendMode = [fs readFloat]; //fs.writeFloat(_compileData.blendMode);
    this.backCull = [fs readBoolean]; //fs.writeBoolean(_compileData.backCull);
    this.killNum = [fs readFloat];//fs.writeFloat(_compileData.killNum);
    this.hasVertexColor = [fs readBoolean]; //fs.writeBoolean(_compileData.hasVertexColor);
    this.usePbr = [fs readBoolean]; //fs.writeBoolean(_compileData.usePbr);
    this.useNormal = [fs readBoolean]; //fs.writeBoolean(_compileData.useNormal);
    this.roughness = [fs readFloat]; //fs.writeFloat(_compileData.roughness);
    this.writeZbuffer = [fs readBoolean];//fs.writeBoolean(_compileData.writeZbuffer);
    this.hasFresnel = [fs readBoolean];//fs.writeBoolean(_compileData.hasFresnel);
    this.useDynamicIBL = [fs readBoolean]; //fs.writeBoolean(_compileData.useDynamicIBL);
    this.normalScale = [fs readFloat];  //fs.writeFloat(_compileData.normalScale);
    this.lightProbe = [fs readBoolean]; //fs.writeBoolean(_compileData.lightProbe);
    this.useKill = [fs readBoolean];//fs.writeBoolean(_compileData.useKill);
    this.directLight = [fs readBoolean]; //fs.writeBoolean(_compileData.directLight);
    this.noLight = [fs readBoolean];//fs.writeBoolean(_compileData.noLight);
    this.scaleLightMap = [fs readBoolean]; //fs.writeBoolean(_compileData.scaleLightMap)
    
    this.fogMode = [fs readInt];
    this.fcNum =[fs readByte];
    int len = [fs readByte];
    this.fcIDAry =[[NSMutableArray alloc]init];
    for(int i=0;i<len;i++){
        [this.fcIDAry addObject:[NSString stringWithFormat:@"%d",[fs readByte]]];
    }
    this.hasParticleColor = false;
    [self initFcData];
    [self readTexList:fs];
    [self readConstLis:fs];
   
}
-(void)readConstLis:(ByteArray*)fs;
{
    Material* this=self;
    
    int constLisLen = [fs readInt];
    this.constList =[[NSMutableArray alloc]init];
          for (int i    = 0; i < constLisLen; i++) {
              ConstItem* constItem = [ConstItem alloc];;

              constItem.id = [fs readFloat ];
              constItem.value3d = [[Vector3D alloc]x:[fs readFloat] y:[fs readFloat] z:[fs readFloat] w:[fs readFloat]];

              constItem.paramName0 = [fs readUTF];
              constItem.param0Type = [fs readFloat];
              constItem.param0Index = [fs readFloat];

              constItem.paramName1 = [fs readUTF];
              constItem.param1Type = [fs readFloat];
              constItem.param1Index = [fs readFloat];

              constItem.paramName2 = [fs readUTF];
              constItem.param2Type = [fs readFloat];
              constItem.param2Index = [fs readFloat];

              constItem.paramName3 = [fs readUTF];
              constItem.param3Type = [fs readFloat];
              constItem.param3Index = [fs readFloat];
              [constItem creat:this.fcData];

              [this.constList addObject:constItem];
          }

}
 
-(void)readTexList:(ByteArray*)fs;
{
    Material* this=self;
    int  texListLen   = [fs readInt ];
    this.texList =[[NSMutableArray alloc] init];
    for (int i = 0; i < texListLen; i++) {
        TexItem* texItem =[[TexItem alloc] init];
        texItem.id = [fs readFloat ];
        texItem.url = [fs readUTF ];
        texItem.isDynamic = [fs readBoolean ];
        texItem.paramName = [fs readUTF ];
        texItem.isMain = [fs readBoolean ];
        texItem.isParticleColor = [fs readBoolean ];
        texItem.type = [fs readFloat ];
        texItem.wrap = [fs readFloat ];
        texItem.filter = [fs readFloat ];
        texItem.mipmap = [fs readFloat ];
        if (texItem.isParticleColor) {
            this.hasParticleColor = true;
        }
        [this.texList addObject:texItem];
    }
   
}
-(void)initFcData;
{
     Material* this=self;
    this.fcData=[[NSMutableArray alloc]init];
    for(int i=0;i<this.fcNum*4;i++){
        [this.fcData addObject:@0];
    }
    if (this.fcNum <= 0) {
        return;
    }
    if (this.hasTime || this.useKill || this.fogMode != 0) {//fc0
        if (this.useKill) {
            this.fcData[0] = [NSNumber numberWithFloat:this.killNum];
        }
        if (this.fogMode != 0) {
            this.fcData[2] =@0;
            this.fcData[3] = @0;
        }
    }
 
}
-(void)update:(float)t;
{
    [self updateTime:t];
    [self updateScene];
}
-(void)updateTime:(float)t;
{
    
}
-(void)updateScene;
{
    
}
/*
public update(t:number):void{
    this.updateTime(t);
    //this.updateCam();
    this.updateScene();
}
*/
@end
