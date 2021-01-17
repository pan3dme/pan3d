//
//  Scene3D.m
//  base
//
//  Created by pan3dme on 2021/1/17.
//

#import "Scene3D.h"
@import MetalKit;
@import GLKit;

@interface Scene3D () <MTKViewDelegate>

// view
@property (nonatomic, strong) MTKView *mtkView;
@property (nonatomic, strong) id<MTLCommandQueue> commandQueue;
  
 

@end
@implementation Scene3D

- (void)drawInMTKView:(nonnull MTKView *)view {
    
}

- (void)mtkView:(nonnull MTKView *)view drawableSizeWillChange:(CGSize)size {
 
}

@end
