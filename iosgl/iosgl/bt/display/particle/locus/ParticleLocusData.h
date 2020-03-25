//
//  ParticleLocusData.h
//  iosgl
//
//  Created by zhao on 25/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "ParticleData.h"
NS_ASSUME_NONNULL_BEGIN

@interface ParticleLocusData : ParticleData
@property (nonatomic, strong)  Vector3D*  _resultUvVec;
@property (nonatomic, strong)  Vector3D*   _caramPosVec;
@property (nonatomic, strong)  Vector3D*  _uvVec;
@end

NS_ASSUME_NONNULL_END
