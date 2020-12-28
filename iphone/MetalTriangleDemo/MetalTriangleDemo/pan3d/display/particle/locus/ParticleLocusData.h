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
@property (nonatomic, assign)  BOOL  _isEnd;
@property (nonatomic, assign)  BOOL  _changUv;
@property (nonatomic, assign)  BOOL  _isLoop;  //是否循环
@property (nonatomic, assign)  float  _density;
@property (nonatomic, assign)  float  _speed; //粒子运动数字
@property (nonatomic, strong)  Vector3D*  _resultUvVec;
@property (nonatomic, strong)  Vector3D*   _caramPosVec;
@property (nonatomic, strong)  Vector3D*  _uvVec;
@end

NS_ASSUME_NONNULL_END
