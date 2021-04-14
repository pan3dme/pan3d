//
//  CombineParticleData.h
//  iosgl
//
//  Created by zhao on 23/2/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "GC.h"
#import "ByteArray.h"
#import "CombineParticleData.h"


@class CombineParticle;

NS_ASSUME_NONNULL_BEGIN

@interface CombineParticleData : GC
@property (nonatomic, assign)  int maxTime;
@property (nonatomic, strong)  NSMutableArray *dataAry;
-(void)setDataByte:(ByteArray*)byte;
-(CombineParticle*)getCombineParticle;
@end

NS_ASSUME_NONNULL_END
