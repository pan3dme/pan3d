//
//  Context3D.h
//  base
//
//  Created by pan3dme on 2021/1/17.
//

#import "ResGC.h"
#import "Vector3D.h"
@import MetalKit;

NS_ASSUME_NONNULL_BEGIN

@interface Context3D : ResGC
@property (nonatomic, strong) id<MTLRenderCommandEncoder> renderEncoder;
@property (nonatomic, strong) id<MTLCommandQueue> commandQueue;
@property (nonatomic, strong) id<MTLCommandBuffer> commandBuffer;
@property (nonatomic, strong) MTKView *mtkView;

- (instancetype)init:(MTKView *)value;
-(void)clearColor:(Vector3D*)value;
@end

NS_ASSUME_NONNULL_END
