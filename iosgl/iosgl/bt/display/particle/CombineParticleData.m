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
#import "CombineParticle.h"
#import "Display3DParticle.h"

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
        [pdata setAllByteInfo:byte];
        [self.dataAry addObject:pdata];
        if (pdata.timelineData.maxFrameNum > self.maxTime) {
            self.maxTime = pdata.timelineData.maxFrameNum;
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
        case 18:
            pdata = [[ParticleBallData alloc]init];
            break;
        default:
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
        [particle addPrticleItem:display];
    }
    particle.sourceData = self;
    return particle;
}
@end
