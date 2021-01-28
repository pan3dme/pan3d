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

 
-(void)mtlEncode
{
   
    MTKView *mtkView=self.scene3D.context3D. mtkView;
    
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
        self.relaxedDepthState = [self.scene3D.mtkView.device newDepthStencilStateWithDescriptor:depthStateDesc];
    }
}
 
@end
