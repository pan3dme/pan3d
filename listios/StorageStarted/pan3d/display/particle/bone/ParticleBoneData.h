//
//  ParticleBoneData.h
//  StorageStarted
//
//  Created by pan3dme on 2021/6/1.
//  Copyright © 2021 cuiyiran. All rights reserved.
//

#import "ParticleData.h"
#import "MeshData.h"
#import "AnimData.h"

NS_ASSUME_NONNULL_BEGIN

@interface ParticleBoneData : ParticleData
@property (nonatomic, strong)  MeshData*   meshData;
@property (nonatomic, strong)  AnimData*   animData;
@property (nonatomic, assign)  float objScale;
@end

NS_ASSUME_NONNULL_END
