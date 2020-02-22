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
    /*
    if (!this._dic[$url]) {
        var baseData: CombineParticleData = new CombineParticleData();
        ////console.log("load particle",$url);
        baseData.setDataByte($data);
        this._dic[$url] = baseData;
    }
    */
}
@end
