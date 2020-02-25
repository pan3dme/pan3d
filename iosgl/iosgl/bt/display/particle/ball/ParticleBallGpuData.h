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
@property (nonatomic, strong)  NSMutableArray*   basePos;
@property (nonatomic, assign) GLuint   basePosBuffer;
@property (nonatomic, strong)  NSMutableArray*   beMove;
@property (nonatomic, assign) GLuint   beMoveBuffer;
@property (nonatomic, strong)  NSMutableArray*   randomColor;
@property (nonatomic, assign) GLuint  randomColorBuffer;
@property (nonatomic, assign)  float   randomOffset;
@property (nonatomic, strong)  NSMutableArray*   baseRotation;
@property (nonatomic, assign) GLuint   baseRotationBuffer;
@end

NS_ASSUME_NONNULL_END
