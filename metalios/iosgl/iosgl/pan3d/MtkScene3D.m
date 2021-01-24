//
//  MtkScene3D.m
//  iosgl
//
//  Created by pan3dme on 2021/1/22.
//  Copyright © 2021 zhao. All rights reserved.
//

#import "MtkScene3D.h"
#import "RotationSpriteA.h"
#import "MtkBaseLine.h"
#import "MtlModelDisplaySprite.h"


@interface MtkScene3D () <MTKViewDelegate>

@property (nonatomic, strong) UIView *uiView;
@property (nonatomic,strong)RotationSpriteA* _rotationSpriteA;
@property (nonatomic,strong)MtkBaseLine* _mtkBaseLine;
@property (nonatomic,strong)MtlModelDisplaySprite* _mtlModelDisplaySprite;
 
@end

@implementation MtkScene3D
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
    self.context3D=[[MtkContext3D alloc] init:self.mtkView ];
    self.textureManager=[[TextureManager alloc]init ];
    
    self._rotationSpriteA=[[RotationSpriteA alloc] init:self];
    self._mtkBaseLine=[[MtkBaseLine alloc] init:self];
    self._mtlModelDisplaySprite=[[MtlModelDisplaySprite alloc]init:self];
 
}

- (void)drawInMTKView:(nonnull MTKView *)view {
    [self.context3D clearColor:[[Vector3D alloc]x:1 y:1 z:0.16 w:1]];
    self.camera3D.rotationX=-15;
    [self.camera3D upFrame];
    
//    [self._rotationSpriteA updata];
    [self._mtkBaseLine updata];
    [self._mtlModelDisplaySprite updata];
    
 
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
