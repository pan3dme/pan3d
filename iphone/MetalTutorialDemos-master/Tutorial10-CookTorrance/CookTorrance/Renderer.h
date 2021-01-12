//
//  Renderer.h
//  UniformBuffer
//
//  Created by Xinhou Jiang on 2020/3/17.
//  Copyright © 2020 Xinhou Jiang. All rights reserved.
//

#import <MetalKit/MetalKit.h>

// Our platform independent renderer class.   Implements the MTKViewDelegate protocol which
//   allows it to accept per-frame update and drawable resize callbacks.
@interface Renderer : NSObject <MTKViewDelegate>

-(nonnull instancetype)initWithMetalKitView:(nonnull MTKView *)view;

@end

