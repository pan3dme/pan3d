//
//  Scene3D.m
//  base
//
//  Created by pan3dme on 2021/1/17.
//

#import "Scene3D.h"
#import <UIKit/UIKit.h>
#import "RotationSpriteA.h"
#import "RotationSpriteB.h"
#import "RotationSpriteC.h"

@import MetalKit;
@import GLKit;

@interface Scene3D () <MTKViewDelegate>

 
@property (nonatomic, strong) UIView *uiView;

 
@property (nonatomic, strong)RotationSpriteA* _rotationSpriteA;
@property (nonatomic, strong)RotationSpriteB* _rotationSpriteB;
@property (nonatomic, strong)RotationSpriteC* _rotationSpriteC;

@end
@implementation Scene3D

- (instancetype)init:(UIView *)value
{
    self = [super init];
    if (self) {
        self.uiView=value;
 
        
        self.mtkView = [[MTKView alloc] initWithFrame:self.uiView.bounds];
        self.mtkView.device = MTLCreateSystemDefaultDevice();
        self.mtkView.depthStencilPixelFormat = MTLPixelFormatDepth32Float_Stencil8;
        [self.uiView insertSubview:self.mtkView atIndex:0];
        self.mtkView.delegate = self;
  
        
        [self initData];
        

      
    }
    return self;
}
-(void)initData
{
    [self resieSize:self.mtkView.drawableSize];
    
    self.camera3D=[[Camera3D alloc]init];
    self.context3D=[[Context3D alloc] init:self.mtkView];
 
    self._rotationSpriteA=[[RotationSpriteA alloc]init:self];
    self._rotationSpriteB=[[RotationSpriteB alloc]init:self];
    self._rotationSpriteC=[[RotationSpriteC alloc]init:self];
}
- (void)drawInMTKView:(nonnull MTKView *)view {
    
       id<MTLCommandBuffer> commandBuffer = [self.context3D.commandQueue commandBuffer];
       MTLRenderPassDescriptor *renderPassDescriptor =  self.mtkView.currentRenderPassDescriptor;
       if(renderPassDescriptor != nil)
       {
           renderPassDescriptor.colorAttachments[0].clearColor = MTLClearColorMake(0.0, 0.5, 0.5, 1.0f);
 
           id<MTLRenderCommandEncoder> renderEncoder = [commandBuffer renderCommandEncoderWithDescriptor:renderPassDescriptor];
           [renderEncoder setViewport:(MTLViewport){0.0, 0.0, self.camera3D.fovw, self.camera3D.fovh, -1.0, 1.0 }];
           [self._rotationSpriteA updata:renderEncoder];
           [self._rotationSpriteB updata:renderEncoder];
 
           
           [renderEncoder endEncoding];
       
           [commandBuffer presentDrawable:view.currentDrawable];
       }
       
       [commandBuffer commit];
}

- (void)mtkView:(nonnull MTKView *)view drawableSizeWillChange:(CGSize)size {
    
    [self resieSize:size];
}
-(void)resieSize:(CGSize)size
{
    self.camera3D.fovw=size.width;
    self.camera3D.fovh=size.height;
}

@end
