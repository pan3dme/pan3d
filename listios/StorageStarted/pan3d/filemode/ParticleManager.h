//
//  ParticleManager.h
//  iosgl
//
//  Created by zhao on 23/2/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "ResGC.h"
#import "ByteArray.h"
#import "CombineParticle.h"
NS_ASSUME_NONNULL_BEGIN

@interface ParticleManager : ResGC
//+ (instancetype)default;


@property (nonatomic, strong)  NSMutableDictionary *_renderDic;
@property (nonatomic, strong)  NSMutableArray<CombineParticle*> *_particleList;
@property (nonatomic, strong)  Scene3D *scene3d;
@property (nonatomic, assign)  double time;
 
-(void)addResByte:(NSString*)url byteArray:(ByteArray*)byteArray;
-(CombineParticle*)getParticleByte:(NSString*)url;
-(void)addParticle:(CombineParticle*)particle;
-(void)registerUrl:(NSString*)url;
-(void)updateTime;
-(void)update;
-(void)removeAll;
-(void)removeParticle:(CombineParticle*)particle;

@end

NS_ASSUME_NONNULL_END
