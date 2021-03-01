//
//  OnePageView.m
//  iosgl
//
//  Created by zhao on 2/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "OnePageView.h"
#import "MathCore.h"
#import "CtxUIView.h"
#import "GLSpriteView.h"
#import "SceneView.h"
#import "Matrix3D.h"
#import "Matrix4x4.h"
@import MetalKit;
@import GLKit;

 

 
@interface OnePageView () <MTKViewDelegate>
@property (nonatomic, strong) MTKView *mtkView;
@property (nonatomic, strong) SceneView *sceneView;
@property (nonatomic, assign) vector_uint2 viewportSize;
@property (nonatomic, strong) id<MTLRenderPipelineState> pipelineState;
@property (nonatomic, strong) id<MTLCommandQueue> commandQueue;
@property (nonatomic, strong) id<MTLTexture> texture;
@property (nonatomic, strong) id<MTLBuffer> vertices;
@property (nonatomic, strong) id<MTLBuffer> indexs;
@property (nonatomic, assign) NSUInteger indexCount;
@end

@implementation OnePageView

- (void)viewDidLoad {
    [super viewDidLoad];
 
}
 
#pragma mark - delegate

- (void)mtkView:(MTKView *)view drawableSizeWillChange:(CGSize)size {
    self.viewportSize = (vector_uint2){size.width, size.height};
}

- (void)drawInMTKView:(MTKView *)view {
     
}


- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}


 
 

@end
