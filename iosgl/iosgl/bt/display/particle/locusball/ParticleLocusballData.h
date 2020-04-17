//
//  ParticleLocusballData.h
//  iosgl
//
//  Created by zhao on 17/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "ParticleBallData.h"

NS_ASSUME_NONNULL_BEGIN

@interface ParticleLocusballData : ParticleBallData
@property(nonatomic,strong)NSArray<NSNumber*>* _posAry;
@property(nonatomic,strong)NSArray<NSNumber*>* _angleAry;
@property(nonatomic,strong)NSArray<NSNumber*>* _tangentAry;
@property(nonatomic,assign)float _tangentSpeed;
@end

NS_ASSUME_NONNULL_END
