//
//  ParticleManager.m
//  iosgl
//
//  Created by zhao on 23/2/2020.
//  Copyright © 2020 zhao. All rights reserved.
//
#import "CombineParticleData.h"
#import "ParticleManager.h"
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
    [self updateRenderDic];
}
-(void)updateRenderDic;
{
    for (NSString* key in self.renderDic) {
        
        NSArray *list= self.renderDic[key];
        if(list.count==1){
            CombineParticle* combineParticle=( (CombineParticle*)(list[0]));
            combineParticle.scene3d=self.scene3d;
            [combineParticle update];
        }else{
            NSLog(@"批处理");
        }
    }
    /*
          for (var key in this.renderDic) {
                     var list: Array<CombineParticle> = this.renderDic[key];
                     if (list.length == 1) {
                         list[0].update();
                     } else {
                         var size: number = list[0].size;
     
                         for (var j: number = 0; j < size; j++) {
                             for (var i: number = 0; i < list.length; i++) {
                                 list[i].updateItem(j);
                             }
                         }
     
                     }
     
                 }
             }
     */
}
-(void) updateTime  ;
{
    
}
@end
