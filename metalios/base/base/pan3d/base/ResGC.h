//
//  ResGC.h
//  base
//
//  Created by pan3dme on 2021/1/17.
//

#import <Foundation/Foundation.h>
#import "GC.h"
NS_ASSUME_NONNULL_BEGIN

@interface ResGC : GC
@property (nonatomic, strong)  NSMutableDictionary *dic;
@end

NS_ASSUME_NONNULL_END
