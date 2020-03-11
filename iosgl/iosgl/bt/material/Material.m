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
    self. shaderStr = [fs readUTF];
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
    /*
           this.initFcData();
           this.readTexList(fs)
           this.readConstLis(fs)
    */
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
    /*
     var texListLen: number = fs.readInt();
            this.texList = new Array;
            for (var i: number = 0; i < texListLen; i++) {


                var texItem: TexItem = new TexItem;
                texItem.id = fs.readFloat()
                texItem.url = fs.readUTF()
                texItem.isDynamic = fs.readBoolean()
                texItem.paramName = fs.readUTF()
                texItem.isMain = fs.readBoolean()
                texItem.isParticleColor = fs.readBoolean()
                texItem.type = fs.readFloat()
                texItem.wrap = fs.readFloat()
                texItem.filter = fs.readFloat()
                texItem.mipmap = fs.readFloat()

                if (texItem.isParticleColor) {
                    this.hasParticleColor = true;
                }

                this.texList.push(texItem);

            }
     */
    
}
-(void)initFcData;
{
     Material* this=self;
     GLfloat fcData[this.fcNum*4];
     this.fcData=fcData;
    if (this.fcNum <= 0) {
        return;
    }
    if (this.hasTime || this.useKill || this.fogMode != 0) {//fc0
        if (this.useKill) {
            this.fcData[0] = this.killNum;
        }
        if (this.fogMode != 0) {
            this.fcData[2] =0.0f;
            this.fcData[3] = 0.0f;
        }
    }
 
    /*
    this.fcData = new Float32Array(this.fcNum*4);

           if (this.fcNum <= 0) {
               return;
           }

           

           this.sceneNumId = Scene_data.sceneNumId;

           if (this.hasTime || this.useKill || this.fogMode != 0) {//fc0

               if (this.useKill) {
                   this.fcData[0] = this.killNum;
               }

               if (this.fogMode != 0) {
                   this.fcData[2] = Scene_data.fogData[0];
                   this.fcData[3] = Scene_data.fogData[1];
               }

           }

           if (this.usePbr || this.fogMode == 1) {
               var idx: number = this.fcIDAry[0] * 4;
               this.fcData[0 + idx] = Scene_data.cam3D.x / 100;
               this.fcData[1 + idx] = Scene_data.cam3D.y / 100;
               this.fcData[2 + idx] = Scene_data.cam3D.z / 100;
           }

           if (this.fogMode != 0) {
               var idx: number = this.fcIDAry[1] * 4;
               this.fcData[0 + idx] = Scene_data.fogColor[0];
               this.fcData[1 + idx] = Scene_data.fogColor[1];
               this.fcData[2 + idx] = Scene_data.fogColor[2];
           }

           if (this.scaleLightMap) {
               var idx: number = this.fcIDAry[2] * 4;
               this.fcData[0 + idx] = Scene_data.scaleLight[0];
           }
*/
}
@end
