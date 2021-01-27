//
//  MtlModelDisplayShader.m
//  iosgl
//
//  Created by pan3dme on 2021/1/24.
//  Copyright © 2021 zhao. All rights reserved.
//

#import "MtlModelDisplayShader.h"
#import <UIKit/UIKit.h>

@implementation MtlModelDisplayShader

- (instancetype)init:(Scene3D*)value
{
    self = [super init];
    if (self) {
        self.mtkScene3D=value;
    }
    return self;
    
}
-(void)mtlEncode
{
   
    MTKView *mtkView=self.mtkScene3D.context3D. mtkView;
    
    id<MTLLibrary> defaultLibrary = [mtkView.device newDefaultLibrary];
 
  
    id<MTLFunction> vertexFunction = [defaultLibrary newFunctionWithName:@"vertexShaderModel"];
    id<MTLFunction> fragmentFunction = [defaultLibrary newFunctionWithName:@"samplingShaderModel"];
    
    MTLRenderPipelineDescriptor *pipelineStateDescriptor = [[MTLRenderPipelineDescriptor alloc] init];
    pipelineStateDescriptor.vertexFunction = vertexFunction;
    pipelineStateDescriptor.fragmentFunction = fragmentFunction;
    pipelineStateDescriptor.colorAttachments[0].pixelFormat = mtkView.colorPixelFormat;
    pipelineStateDescriptor.depthAttachmentPixelFormat =  mtkView.depthStencilPixelFormat;
    pipelineStateDescriptor.stencilAttachmentPixelFormat = mtkView.depthStencilPixelFormat;
    
    self.pipelineState = [mtkView.device newRenderPipelineStateWithDescriptor:pipelineStateDescriptor
                                                                                     error:NULL];
     
    
    MTLDepthStencilDescriptor *depthStateDesc = [[MTLDepthStencilDescriptor alloc] init];
    
    {
        depthStateDesc.depthCompareFunction = MTLCompareFunctionLessEqual;
        depthStateDesc.depthWriteEnabled = YES;
        self.relaxedDepthState = [self.mtkScene3D.mtkView.device newDepthStencilStateWithDescriptor:depthStateDesc];
    }
}
-(void)mtlSetProgramShader
{
   id<MTLRenderCommandEncoder> renderEncoder= self.mtkScene3D.context3D.renderEncoder;
   [renderEncoder setRenderPipelineState:self.pipelineState];
   [renderEncoder setDepthStencilState:self.relaxedDepthState];
   [renderEncoder setFrontFacingWinding:MTLWindingCounterClockwise];
   [renderEncoder setCullMode:MTLCullModeFront];
   [renderEncoder pushDebugGroup:@"Render Forward Lighting"];
   [renderEncoder setCullMode:MTLCullModeFront];
   [renderEncoder setFrontFacingWinding:MTLWindingCounterClockwise];
}
@end
