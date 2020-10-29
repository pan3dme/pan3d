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
static NSMutableDictionary* _dic;
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
        self._renderDic=[[NSMutableDictionary alloc]init];
        self._particleList=[[NSMutableArray alloc]init];
    }
    return self;
}
+(void)addResByte:(NSString*)url byteArray:(ByteArray*)byteArray;
{
    if(!_dic){
        _dic=[[NSMutableDictionary alloc]init];
    }
    if(!_dic[url]){
        CombineParticleData *combineParticleData=[[CombineParticleData alloc]init];
        [combineParticleData setDataByte:byteArray];
        _dic[url]=combineParticleData;
    }
}
+(CombineParticle*)getParticleByte:(NSString*)url;
{
    url= [url stringByReplacingOccurrencesOfString:@"_byte.txt" withString:@".txt"];
    url= [url stringByReplacingOccurrencesOfString:@".txt" withString:@"_byte.txt"];
    CombineParticle *combineParticle=[[CombineParticle alloc]init];
    if(_dic[url]){
        CombineParticleData *baseData = _dic[url];
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
    if (!self._renderDic[url]) {
        self._renderDic[url] = [[NSMutableArray alloc]init];
    }
    [self ._renderDic[url] addObject: particle];
}
-(void) update  ;
{
    [self updateTime];
    [self updateRenderDic];
}
-(void)removeParticle:(CombineParticle*)particle;
{
    
    NSUInteger  indexs=  [self._particleList indexOfObject:particle];
    if(indexs==-1){
        return;
    }
    [self._particleList removeObjectAtIndex:indexs];
    [self removeRenderDic:particle];
 
}
-(void)removeRenderDic:(CombineParticle*)particle
{
    
    NSString* url = particle.url;
    NSMutableArray* arr= [self._renderDic objectForKey:url];
    if(arr!=nil){
        NSUInteger  indexs=  [arr indexOfObject:particle];
        if(indexs==-1){
            return;
        }
        [arr removeObjectAtIndex:indexs];
        
        if(arr.count==0){
            [self._renderDic removeObjectForKey:url];
        }
        
    }

    
    
//            int indexs = this.renderDic.get(url).indexOf($particle);
//            if (indexs == -1) {
//                return;
//            }
//            this.renderDic.get(url).remove(indexs);
//            if (this.renderDic.get(url).size() == 0) {
//                 this.renderDic.remove(url);
//            }
}
-(void)registerUrl:(NSString*)url;
{
    /*
    if (self.dic[url]) {
        CombineParticleData* baseData  =self.dic[url];
    }
    */
}
-(void)updateRenderDic;
{
    for (NSString* key in self._renderDic) {
        NSArray *list= self._renderDic[key];
        for(int i=0;i<list.count;i++){
            CombineParticle* combineParticle=( (CombineParticle*)(list[i]));
            combineParticle.scene3d=self.scene3d;
            [combineParticle update];
        }
    }
    
}
-(void)removeAll;
{
    [self._renderDic removeAllObjects];
    [self._particleList removeAllObjects];
}
-(void)updateTime ;
{
    
    double _tempTime = [[TimeUtil default]getTimer];
    double t = _tempTime - self.time;
    for (NSString* key in self._renderDic) {
        NSArray *list= self._renderDic[key];
        for(int i=0;i<list.count;i++){
            CombineParticle* combineParticle=( (CombineParticle*)(list[i]));
            combineParticle.scene3d=self.scene3d;
            [combineParticle updateTime:t*1.0];
        }
    }
    self.time = _tempTime;
}

@end
