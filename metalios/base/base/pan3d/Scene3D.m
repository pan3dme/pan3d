//
//  Scene3D.m
//  base
//
//  Created by pan3dme on 2021/1/17.
//

#import "Scene3D.h"
#import "Vector3D.h"
#import <UIKit/UIKit.h>
#import "RotationSpriteA.h"
#import "RotationSpriteB.h"
#import "RotationSpriteC.h"
#import "TextureManager.h"

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
        self.mtkView.delegate = self;
        [self.uiView insertSubview:self.mtkView atIndex:0];
        [self initData];
    }
    return self;
}
-(void)initData
{
    self.camera3D=[[Camera3D alloc]init];
   [self resieSize:self.mtkView.drawableSize];
    self.context3D=[[Context3D alloc] init:self.mtkView];
    self.textureManager=[[TextureManager alloc]init:self];
     
    self._rotationSpriteA=[[RotationSpriteA alloc]init:self];
    self._rotationSpriteB=[[RotationSpriteB alloc]init:self];
    self._rotationSpriteC=[[RotationSpriteC alloc]init:self];
}
- (void)drawInMTKView:(nonnull MTKView *)view {
    [self.context3D clearColor:[[Vector3D alloc]x:0.16 y:0.16 z:0.16 w:1]];
    
    [self._rotationSpriteA updata];
    [self._rotationSpriteB updata ];
    
    [self.context3D present];
    
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
