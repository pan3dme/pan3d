//
//  MtkCopyScene3D.m
//  iosgl
//
//  Created by pan3dme on 2021/1/25.
//  Copyright © 2021 zhao. All rights reserved.
//

#import "MtkCopyScene3D.h"


 
@implementation MtkCopyScene3D

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
    
}

- (void)drawInMTKView:(nonnull MTKView *)view {
  
}

- (void)mtkView:(nonnull MTKView *)view drawableSizeWillChange:(CGSize)size {
 
}

@end
