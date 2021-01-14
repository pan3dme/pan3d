//
//  Box3dSprite.m
//  BankBRDF
//
//  Created by pan3dme on 2021/1/14.
//  Copyright © 2021 Xinhou Jiang. All rights reserved.
//

#import "Box3dSprite.h"
#import "ShaderTypes.h"
@import MetalKit;

 
@implementation Box3dSprite
id <MTLDevice> _device;
id <MTLCommandQueue> _commandQueue;
id<MTLBuffer> vertexBuffer;
id <MTLDepthStencilState> _depthState;
id <MTLRenderPipelineState> _pipelineState;
id<MTLTexture> mtltexture01;
MTLVertexDescriptor *vertexDescriptor;
- (instancetype)init:(MTKView*)view
{
    self = [super init];
    if (self) {
        _device=view.device;
        [self _loadMetalWithViewRect:view];
        [self makeRectModel];
    }
    return self;
}

-(void)updata:(id <MTLRenderCommandEncoder>) renderEncoder
{
    [renderEncoder setRenderPipelineState:_pipelineState];
    [renderEncoder setVertexBuffer:vertexBuffer offset:0 atIndex:0];
    [renderEncoder setFragmentTexture:mtltexture01 atIndex:0]; // 设置纹理贴图
    [renderEncoder drawPrimitives:MTLPrimitiveTypeTriangle vertexStart:0 vertexCount:3];
}

- (void)_loadMetalWithViewRect:(nonnull MTKView *)view;
{
    view.depthStencilPixelFormat = MTLPixelFormatDepth32Float_Stencil8;
    view.colorPixelFormat = MTLPixelFormatBGRA8Unorm_sRGB;
    view.sampleCount = 1;

    id<MTLLibrary> defaultLibrary = [_device newDefaultLibrary];
    
    vertexDescriptor = [[MTLVertexDescriptor alloc] init];
    // pos
    vertexDescriptor.attributes[0].format = MTLVertexFormatFloat2;
    vertexDescriptor.attributes[0].offset = 0;
    vertexDescriptor.attributes[0].bufferIndex = 0;
    // uv
    vertexDescriptor.attributes[1].format = MTLVertexFormatFloat2;
    vertexDescriptor.attributes[1].offset = 8;
    vertexDescriptor.attributes[1].bufferIndex = 0;
    // layout
    vertexDescriptor.layouts[0].stride = 16;
    vertexDescriptor.layouts[0].stepRate = 1;
    vertexDescriptor.layouts[0].stepFunction = MTLVertexStepFunctionPerVertex;

    id <MTLFunction> vertexFunction = [defaultLibrary newFunctionWithName:@"vertexShader"];
    id <MTLFunction> fragmentFunction = [defaultLibrary newFunctionWithName:@"fragmentShader"];

    MTLRenderPipelineDescriptor *pipelineStateDescriptor = [[MTLRenderPipelineDescriptor alloc] init];
    pipelineStateDescriptor.label = @"MyPipeline";
    pipelineStateDescriptor.sampleCount = view.sampleCount;
    pipelineStateDescriptor.vertexDescriptor = vertexDescriptor;
    pipelineStateDescriptor.vertexFunction = vertexFunction;
    pipelineStateDescriptor.fragmentFunction = fragmentFunction;
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
    depthStateDesc.depthCompareFunction = MTLCompareFunctionLess;
    depthStateDesc.depthWriteEnabled = YES;
    _depthState = [_device newDepthStencilStateWithDescriptor:depthStateDesc];

    _commandQueue = [_device newCommandQueue];
}

- (void)makeRectModel
{
    // 顶点buffer
    static const VertexRect vert[] = {
        {{0,1.0},     {0.5,0}},
        {{1.0,-1.0},  {1.0,1.0}},
        {{-1.0,-1.0}, {0,1.0}}
    };
    vertexBuffer = [_device newBufferWithBytes:vert length:sizeof(vert) options:MTLResourceStorageModeShared];
    
    // 加载贴图
    NSError *error;
    MTKTextureLoader* textureLoader = [[MTKTextureLoader alloc] initWithDevice:_device];
    NSDictionary *textureLoaderOptions =
    @{
      MTKTextureLoaderOptionTextureUsage       : @(MTLTextureUsageShaderRead),
      MTKTextureLoaderOptionTextureStorageMode : @(MTLStorageModePrivate)
      };
    mtltexture01 = [textureLoader newTextureWithName:@"texture01"
                                         scaleFactor:1.0
                                              bundle:nil
                                             options:textureLoaderOptions
                                               error:&error];
    if(!mtltexture01 || error)
    {
        NSLog(@"Error creating texture %@", error.localizedDescription);
    }
}

@end
