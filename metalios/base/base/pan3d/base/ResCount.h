//
//  ResCount.h
//  base
//
//  Created by pan3dme on 2021/1/17.
//

#import <UIKit/UIKit.h>
#import "GC.h"
#import "Scene3D.h"
 

NS_ASSUME_NONNULL_BEGIN

@interface ResCount : GC
@property (nonatomic, strong)  Scene3D*   scene3D;
- (instancetype)init:(Scene3D*)value;
@end

NS_ASSUME_NONNULL_END
