//
//  CombineParticleData.h
//  iosgl
//
//  Created by zhao on 23/2/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "ResCount.h"
#import "ByteArray.h"

NS_ASSUME_NONNULL_BEGIN

@interface CombineParticleData : ResCount
@property (nonatomic, assign)  int maxTime;
@property (nonatomic, strong)  NSMutableArray *dataAry;
-(void)setDataByte:(ByteArray*)byte;
@end

NS_ASSUME_NONNULL_END
