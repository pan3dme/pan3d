//
//  ParticleManager.h
//  iosgl
//
//  Created by zhao on 23/2/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "ResCount.h"
#import "ByteArray.h"
NS_ASSUME_NONNULL_BEGIN

@interface ParticleManager : ResCount
+ (instancetype)default;
@property (nonatomic, strong)  NSMutableDictionary *dic;
-(void)addResByte:(NSString*)url byteArray:(ByteArray*)byteArray;
@end

NS_ASSUME_NONNULL_END
