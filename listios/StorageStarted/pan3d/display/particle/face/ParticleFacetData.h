//
//  ParticleFacetData.h
//  iosgl
//
//  Created by zhao on 23/2/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "ParticleData.h"

NS_ASSUME_NONNULL_BEGIN

@interface ParticleFacetData : ParticleData
 
@property (nonatomic, assign)  float   _maxAnimTime;
@property (nonatomic, assign)  BOOL   _lockx;;
@property (nonatomic, assign)  BOOL   _locky;
@property (nonatomic, assign)  BOOL   _isCycle ;
@end

NS_ASSUME_NONNULL_END
