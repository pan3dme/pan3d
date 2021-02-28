//
//  ParticleBallGpuData.h
//  iosgl
//
//  Created by zhao on 26/2/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "ParticleGpuData.h"

NS_ASSUME_NONNULL_BEGIN

@interface ParticleBallGpuData : ParticleGpuData

@property (nonatomic, assign)  GLfloat*    basePos;
@property (nonatomic, assign) GLuint   basePosBuffer;
@property (nonatomic, assign) GLuint   speedBuffer;
@property (nonatomic, strong)  NSMutableArray*   randomColor;
@property (nonatomic, assign) GLuint  randomColorBuffer;
@property (nonatomic, assign)  float   randomOffset;
@property (nonatomic, strong)  NSMutableArray*   baseRotation;
@property (nonatomic, assign) GLuint   baseRotationBuffer;
@property (nonatomic, strong) id<MTLBuffer> mtkbasePos;
@property (nonatomic, strong) id<MTLBuffer> mtkbaseRotation;
@property (nonatomic, copy)  NSArray  *speeds;
@property (nonatomic, strong) id<MTLBuffer> mtkspeed;
@property (nonatomic, strong) id<MTLBuffer> mtkrandomColor;

@end

NS_ASSUME_NONNULL_END
