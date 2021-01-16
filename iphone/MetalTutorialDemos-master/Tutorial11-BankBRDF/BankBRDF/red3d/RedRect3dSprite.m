//
//  RedRect3dSprite.m
//  BankBRDF
//
//  Created by pan3dme on 2021/1/15.
//  Copyright © 2021 Xinhou Jiang. All rights reserved.
//

#import "RedRect3dSprite.h"
#import "ShaderTypes.h"
@import MetalKit;

@interface RedRect3dSprite ()
@property(nonatomic,strong) id <MTLDevice> device;;
@property(nonatomic,strong) id <MTLCommandQueue> commandQueue;
@property(nonatomic,strong) id <MTLRenderPipelineState> pipelineState;
@property(nonatomic,strong) id <MTLDepthStencilState> depthState;
@property(nonatomic,strong) id<MTLBuffer> vertexBuffer;

@end

@implementation RedRect3dSprite

- (instancetype)init:(MTKView*)view;
{
    self = [super init];
    if (self) {
        _device=view.device;
        [self _loadMetalWithView:view];
        [self _loadAssets];
 
    }
    return self;
}


- (void)_loadMetalWithView:(nonnull MTKView *)view;
{
    view.depthStencilPixelFormat = MTLPixelFormatDepth32Float_Stencil8;
    view.colorPixelFormat = MTLPixelFormatBGRA8Unorm_sRGB;
    view.sampleCount = 1;

    id<MTLLibrary> defaultLibrary = [_device newDefaultLibrary];

    id <MTLFunction> vertexFunction = [defaultLibrary newFunctionWithName:@"vertexShaderRect"];
    id <MTLFunction> fragmentFunction = [defaultLibrary newFunctionWithName:@"fragmentShaderRect"];

    MTLRenderPipelineDescriptor *pipelineStateDescriptor = [[MTLRenderPipelineDescriptor alloc] init];
    pipelineStateDescriptor.label = @"MyPipeline";
    pipelineStateDescriptor.sampleCount = view.sampleCount;
    pipelineStateDescriptor.vertexFunction = vertexFunction;
    pipelineStateDescriptor.fragmentFunction = fragmentFunction;
    pipelineStateDescriptor.colorAttachments[0].pixelFormat = view.colorPixelFormat;
    pipelineStateDescriptor.depthAttachmentPixelFormat = view.depthStencilPixelFormat;
    pipelineStateDescriptor.stencilAttachmentPixelFormat = view.depthStencilPixelFormat;
    
    pipelineStateDescriptor.colorAttachments[0].pixelFormat = view.colorPixelFormat;
    pipelineStateDescriptor.depthAttachmentPixelFormat = view.depthStencilPixelFormat;
    pipelineStateDescriptor.stencilAttachmentPixelFormat = view.depthStencilPixelFormat;
    

    NSError *error = NULL;
    _pipelineState = [_device newRenderPipelineStateWithDescriptor:pipelineStateDescriptor error:&error];
    if (!_pipelineState)
    {
        NSLog(@"Failed to created pipeline state, error %@", error);
    }
    
    
    
    MTLDepthStencilDescriptor *depthStateDesc = [[MTLDepthStencilDescriptor alloc] init];

    {
        depthStateDesc.depthCompareFunction = MTLCompareFunctionLessEqual;
        depthStateDesc.depthWriteEnabled = YES;
        _depthState = [_device newDepthStencilStateWithDescriptor:depthStateDesc];
    }
 

    _commandQueue = [_device newCommandQueue];
}

- (void)_loadAssets
{
    // 顶点buffer
    static const VertexRed vert[] = {
        {{0,1.0,1.1}},
        {{1.0,-1.0,0.05}},
        {{-1.0,-1.0,0.05}}
    };
    _vertexBuffer = [_device newBufferWithBytes:vert length:sizeof(vert) options:MTLResourceStorageModeShared];
}
-(void)updata:(id <MTLRenderCommandEncoder>) renderEncoder depthStencil:(id<MTLDepthStencilState>) depthState;
{
    
//    [renderEncoder pushDebugGroup:@"DrawTriangle"];
    [renderEncoder setRenderPipelineState:_pipelineState];
    [renderEncoder setDepthStencilState:depthState];
    [renderEncoder setVertexBuffer:_vertexBuffer offset:0 atIndex:0];
    [renderEncoder drawPrimitives:MTLPrimitiveTypeTriangle vertexStart:0 vertexCount:3];
}
@end
