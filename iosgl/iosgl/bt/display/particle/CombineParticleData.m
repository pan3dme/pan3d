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
#import "ParticleLocusData.h"
#import "ParticleBallData.h"
#import "ParticleFollowData.h"
#import "CombineParticle.h"
#import "ParticleLocusballData.h"
#import "ParticleModelData.h"
#import "Display3DParticle.h"
#import "Display3DBallPartilce.h"

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
        if(pdata){
            pdata.version=version;
            [pdata setAllByteInfo:byte];
            if ([pdata isKindOfClass:[ParticleModelData class]]) {
                if(self.dataAry.count==0){
                }
            }
           [self.dataAry addObject:pdata];
            if (pdata.timelineData.maxFrameNum > self.maxTime) {
                self.maxTime = pdata.timelineData.maxFrameNum;
            }
        }
        
    }
    
}
-(ParticleData*)getParticleDataType:(int)type;
{
    ParticleData *pdata;
    switch (type) {
        case 1:
            pdata = [[ParticleFacetData alloc]init];
            break;
        case 3:
            pdata = [[ParticleLocusData alloc]init];
            break;
        case 8:
            pdata = [[ParticleFollowData alloc]init];
            break;
        case 4:
            pdata = [[ParticleModelData alloc]init];
            break;
        case 7:
            pdata = [[ParticleModelData alloc]init];
            break;
        case 9:
            pdata = [[ParticleModelData alloc]init];
            break;
        case 14:
            pdata = [[ParticleLocusballData alloc]init];
            break;
        case 18:
            pdata = [[ParticleBallData alloc]init];
            break;
        default:
            NSLog(@"没有的类型  %d",type);
            break;
    }
    
    return pdata;
}


-(CombineParticle*)getCombineParticle;
{
    CombineParticle* particle=[[CombineParticle alloc]init];
    particle.maxTime=self.maxTime;
    for (int i = 0; i < self.dataAry.count; i++) {
        Display3DParticle *display = [((ParticleData*)self.dataAry[i]) creatPartilce];
       
        if ([display isKindOfClass:[Display3DBallPartilce class]]) {
        }
        [particle addPrticleItem:display];
     
    }
    particle.sourceData = self;
    return particle;
}
@end
