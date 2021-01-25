//
//  MtkContext3D.h
//  iosgl
//
//  Created by pan3dme on 2021/1/22.
//  Copyright © 2021 zhao. All rights reserved.
//

#import "ResGC.h"
#import "Vector3D.h"
@import MetalKit;

NS_ASSUME_NONNULL_BEGIN

@interface MtkContext3D : ResGC
@property (nonatomic, strong) id<MTLRenderCommandEncoder> renderEncoder;
@property (nonatomic, strong) id<MTLCommandQueue> commandQueue;
@property (nonatomic, strong) id<MTLCommandBuffer> commandBuffer;
@property (nonatomic, strong) MTKView *mtkView;

- (instancetype)init:(MTKView *)value;
-(void)mtkclearColor:(Vector3D*)value;
-(void)mtksetViewport:(MTLViewport)value;
-(void)mtkpresent;
@end

NS_ASSUME_NONNULL_END
