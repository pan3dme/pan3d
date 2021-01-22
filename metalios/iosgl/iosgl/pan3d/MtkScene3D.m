//
//  MtkScene3D.m
//  iosgl
//
//  Created by pan3dme on 2021/1/22.
//  Copyright © 2021 zhao. All rights reserved.
//

#import "MtkScene3D.h"


@interface MtkScene3D () <MTKViewDelegate>

@property (nonatomic, strong) UIView *uiView;
 
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
    
    self.uiView.frame=CGRectMake(0, 0, 300, 300);
//    self.uiView.backgroundColor=UIColor.redColor;
}

- (void)drawInMTKView:(nonnull MTKView *)view {
    [self.context3D clearColor:[[Vector3D alloc]x:1 y:1 z:0.16 w:1]];
    
//    [self._rotationSpriteA updata];
//    [self._rotationSpriteB updata ];
    
    [self.context3D present];
    
    NSLog(@"abc---1234");
    
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
