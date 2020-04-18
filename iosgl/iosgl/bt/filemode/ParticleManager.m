//
//  ParticleManager.m
//  iosgl
//
//  Created by zhao on 23/2/2020.
//  Copyright © 2020 zhao. All rights reserved.
//
#import "CombineParticleData.h"
#import "ParticleManager.h"
#import "CombineParticleData.h"
#import "TimeUtil.h"
static ParticleManager *instance = nil;
@implementation ParticleManager
+ (instancetype)default{
    if (instance == nil) {
        instance = [[ParticleManager alloc] init];
    }
    return instance;
}
- (instancetype)init
{
    self = [super init];
    if (self) {
        self.time=0;
        self.dic=[[NSMutableDictionary alloc]init];
        self.renderDic=[[NSMutableDictionary alloc]init];
        self._particleList=[[NSMutableArray alloc]init];
    }
    return self;
}
-(void)addResByte:(NSString*)url byteArray:(ByteArray*)byteArray;
{
    if(!self.dic[url]){
        CombineParticleData *combineParticleData=[[CombineParticleData alloc]init];
        [combineParticleData setDataByte:byteArray];
        self.dic[url]=combineParticleData;
    }
}
-(CombineParticle*)getParticleByte:(NSString*)url;
{
    CombineParticle *combineParticle=[[CombineParticle alloc]init];
    if(self.dic[url]){
        CombineParticleData *baseData = self.dic[url];
        combineParticle= [baseData getCombineParticle];
    }
    combineParticle.url=url;
    return combineParticle;
}
-(void)addParticle:(CombineParticle*)particle;
{
    [self._particleList addObject:particle];
    [self addRenderDic:particle];
}
-(void)addRenderDic:(CombineParticle*)particle;
{
    NSString* url = particle.url;
    if (!self.renderDic[url]) {
        self.renderDic[url] = [[NSMutableArray alloc]init];
    }
    [self .renderDic[url] addObject: particle];
}
-(void) update  ;
{
    [self updateTime];
    [self updateRenderDic];
}

-(void)registerUrl:(NSString*)url;
{
    if (self.dic[url]) {
        CombineParticleData* baseData  =self.dic[url];
    }
}
-(void)updateRenderDic;
{
    for (NSString* key in self.renderDic) {
        NSArray *list= self.renderDic[key];
        for(int i=0;i<list.count;i++){
            CombineParticle* combineParticle=( (CombineParticle*)(list[i]));
            combineParticle.scene3d=self.scene3d;
            [combineParticle update];
        }
    }
    
}
-(void)updateTime ;
{
    
    int _tempTime = [[TimeUtil default]getTimer];
    float t = _tempTime - self.time;
    for (NSString* key in self.renderDic) {
        NSArray *list= self.renderDic[key];
        for(int i=0;i<list.count;i++){
            CombineParticle* combineParticle=( (CombineParticle*)(list[i]));
            combineParticle.scene3d=self.scene3d;
            [combineParticle updateTime:t*1.0];
        }
    }
    self.time = _tempTime;
}

@end
