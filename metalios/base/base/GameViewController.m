//
//  ViewController.m
//  LearnMetal
//
//  Created by loyinglin on 2018/6/21.
//  Copyright © 2018年 loyinglin. All rights reserved.
//
@import MetalKit;
@import GLKit;

#import "ShaderTypes.h"
#import "GameViewController.h"
#import "RotationSpriteA.h"
#import "RotationSpriteB.h"
#import "RotationSpriteC.h"

@interface GameViewController () <MTKViewDelegate>

// view
@property (nonatomic, strong) MTKView *mtkView;
@property (nonatomic, strong) id<MTLCommandQueue> commandQueue;
  
@property (nonatomic, strong)RotationSpriteA* _rotationSpriteA;
@property (nonatomic, strong)RotationSpriteB* _rotationSpriteB;
@property (nonatomic, strong)RotationSpriteC* _rotationSpriteC;

@end

@implementation GameViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view, typically from a nib.
    
    self.mtkView = [[MTKView alloc] initWithFrame:self.view.bounds];
    self.mtkView.device = MTLCreateSystemDefaultDevice();
    self.mtkView.depthStencilPixelFormat = MTLPixelFormatDepth32Float_Stencil8;
    [self.view insertSubview:self.mtkView atIndex:0];
    self.mtkView.delegate = self;
 
    
    self.commandQueue = [self.mtkView.device newCommandQueue];
    
    self._rotationSpriteA=[[RotationSpriteA alloc]init:self.mtkView];
    self._rotationSpriteB=[[RotationSpriteB alloc]init:self.mtkView];
    self._rotationSpriteC=[[RotationSpriteC alloc]init:self.mtkView];
}
 

#pragma mark - delegate

- (void)mtkView:(MTKView *)view drawableSizeWillChange:(CGSize)size {
 
}

- (void)drawInMTKView:(MTKView *)view {
    
 
    id<MTLCommandBuffer> commandBuffer = [self.commandQueue commandBuffer];
    MTLRenderPassDescriptor *renderPassDescriptor = view.currentRenderPassDescriptor;
 
    
    if(renderPassDescriptor != nil)
    {
        renderPassDescriptor.colorAttachments[0].clearColor = MTLClearColorMake(0.0, 0.5, 0.5, 1.0f);
        renderPassDescriptor.colorAttachments[0].loadAction = MTLLoadActionClear;
        
        id<MTLRenderCommandEncoder> renderEncoder = [commandBuffer renderCommandEncoderWithDescriptor:renderPassDescriptor];
   
        
        [self._rotationSpriteA updata:renderEncoder];
        [self._rotationSpriteB updata:renderEncoder];
        [self._rotationSpriteC updata:renderEncoder];
        
        [renderEncoder endEncoding];
        
  
        
        
        [commandBuffer presentDrawable:view.currentDrawable];
    }
    
    [commandBuffer commit];
 
    
//
}

 

@end
