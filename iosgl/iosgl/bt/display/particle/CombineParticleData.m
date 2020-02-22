//
//  CombineParticleData.m
//  iosgl
//
//  Created by zhao on 23/2/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "CombineParticleData.h"
#import "ParticleData.h"
#import "ParticleFacetData.h"

@implementation CombineParticleData
-(void)setDataByte:(ByteArray*)byte;
{
    int version=[byte readInt];
    int len=[byte readInt];
    self.maxTime=0;
    self.dataAry=[[NSMutableArray alloc]init];
    for (int i = 0; i < len; i++) {
        int particleType=[byte readInt];
        ParticleData *pdata= [self getParticleDataType:particleType];
        pdata.version=version;
      
    }
    /*
     
     var version: number = byte.readInt();
     
                 var len: number = byte.readInt();
                 this.maxTime = 0;
                 this.dataAry = new Array;
                 for (var i: number = 0; i < len; i++) {
     
                     var $particleType: number = byte.readInt();
     
                     var pdata: ParticleData = this.getParticleDataType($particleType);
                     pdata.version = version;
                     pdata.setAllByteInfo(byte);
     
                     this.dataAry.push(pdata);
     
                     if (pdata.timelineData.maxFrameNum > this.maxTime) {
                         this.maxTime = pdata.timelineData.maxFrameNum;
                     }
     
                 }
     
                 this.maxTime *= Scene_data.frameTime;
     */
}
-(ParticleData*)getParticleDataType:(int)type;
{
    ParticleData *pdata;
    switch (type) {
        case 1:
            pdata = [[ParticleFacetData alloc]init];
            break;
            
        default:
            break;
    }
    
    return pdata;
}
/*
  private getParticleDataType($type: number): ParticleData {
 
             var pdata: ParticleData;
             switch ($type) {
                 case 1:
                     {
                         pdata = new ParticleFacetData();
                         break;
                     }
                 case 18:
                     {
                         pdata = new ParticleBallData();
                         break;
                     }
                 case 3:
                     {
                         pdata = new ParticleLocusData();
                         break;
                     }
                 case 14:
                     {
                         pdata = new ParticleLocusballData();
                         break;
                     }
                 case 9:
                 case 4:
                 case 7:
                     {
                         pdata = new ParticleModelData();
                         break;
                     }
                 case 8:
                     {
                         pdata = new ParticleFollowData();
                         break;
                     }
                 case 12:
                     {
                         pdata = new ParticleFollowLocusData();
                         break;
                     }
                 case 13:
                     {
                         pdata = new ParticleBoneData()
                         break;
                     }
 
             }
             return pdata;
         }
 */
@end
