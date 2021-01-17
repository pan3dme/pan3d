//
//  Context3D.h
//  base
//
//  Created by pan3dme on 2021/1/17.
//

#import "ResGC.h"
@import MetalKit;

NS_ASSUME_NONNULL_BEGIN

@interface Context3D : ResGC
@property (nonatomic, strong) id<MTLRenderCommandEncoder> renderEncoder;
@property (nonatomic, strong) id<MTLCommandQueue> commandQueue;
 

- (instancetype)init:(MTKView *)value;
-(void)clearColor;
@end

NS_ASSUME_NONNULL_END
