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
    
    int vesion = [fs readInt];
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
    
    
    /*
    var vesion: number = fs.readInt();


           this.shaderStr = fs.readUTF()  //fs.writeUTF(_compileData.shaderStr)
           this.hasTime = fs.readBoolean()//fs.writeBoolean(_compileData.hasTime);
           this.timeSpeed = fs.readFloat()//fs.writeFloat(_compileData.timeSpeed);
           this.blendMode = fs.readFloat() //fs.writeFloat(_compileData.blendMode);
           this.backCull = fs.readBoolean() //fs.writeBoolean(_compileData.backCull);
           this.killNum = fs.readFloat() //fs.writeFloat(_compileData.killNum);
           this.hasVertexColor = fs.readBoolean() //fs.writeBoolean(_compileData.hasVertexColor);
           this.usePbr = fs.readBoolean()   //fs.writeBoolean(_compileData.usePbr);
           this.useNormal = fs.readBoolean()  //fs.writeBoolean(_compileData.useNormal);
           this.roughness = fs.readFloat() //fs.writeFloat(_compileData.roughness);
           this.writeZbuffer = fs.readBoolean()//fs.writeBoolean(_compileData.writeZbuffer);
           this.hasFresnel = fs.readBoolean()//fs.writeBoolean(_compileData.hasFresnel);
           this.useDynamicIBL = fs.readBoolean() //fs.writeBoolean(_compileData.useDynamicIBL);
           this.normalScale = fs.readFloat()  //fs.writeFloat(_compileData.normalScale);
           this.lightProbe = fs.readBoolean()  //fs.writeBoolean(_compileData.lightProbe);
           this.useKill = fs.readBoolean() //fs.writeBoolean(_compileData.useKill);
           this.directLight = fs.readBoolean() //fs.writeBoolean(_compileData.directLight);
           this.noLight = fs.readBoolean() //fs.writeBoolean(_compileData.noLight);
           this.scaleLightMap = fs.readBoolean() //fs.writeBoolean(_compileData.scaleLightMap)
           if (vesion > 2){
               this.fogMode = fs.readInt();
           }
           if(vesion >= 22){
               this.fcNum = fs.readByte();
               var leg:number = fs.readByte();
               this.fcIDAry = new Array;
               for(var i:number=0;i<leg;i++){
                   this.fcIDAry.push(fs.readByte());
               }
           }else{

              // console.log("ddddd");
           }
           
           this.hasParticleColor = false;

           this.initFcData();

           this.readTexList(fs)
           this.readConstLis(fs)
    */
}
@end
