//
//  MtkBaseLineShader.m
//  iosgl
//
//  Created by pan3dme on 2021/1/23.
//  Copyright © 2021 zhao. All rights reserved.
//

#import "MtkBaseLineShader.h"
#import <UIKit/UIKit.h>

@implementation MtkBaseLineShader

 
-(void)encode
{
   
    MTKView *mtkView=self.scene3D.context3D. mtkView;
    
    id<MTLLibrary> defaultLibrary = [mtkView.device newDefaultLibrary];
    NSError* errorfun = nil;
    id<MTLLibrary> aabbcc = [mtkView.device newLibraryWithSource:@"abd" options:nil error:nil];
 
  
    id<MTLFunction> vertexFunction = [defaultLibrary newFunctionWithName:@"vertexShaderLine"];
    id<MTLFunction> fragmentFunction = [defaultLibrary newFunctionWithName:@"samplingShaderLine"];
    
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
-(void)setProgramShader
{
   id<MTLRenderCommandEncoder> renderEncoder= self.scene3D.context3D.renderEncoder;
   [renderEncoder setRenderPipelineState:self.pipelineState];
   [renderEncoder setDepthStencilState:self.relaxedDepthState];
   [renderEncoder setFrontFacingWinding:MTLWindingCounterClockwise];
   [renderEncoder setCullMode:MTLCullModeFront];
   [renderEncoder pushDebugGroup:@"Render Forward Lighting"];
   [renderEncoder setCullMode:MTLCullModeFront];
   [renderEncoder setFrontFacingWinding:MTLWindingCounterClockwise];
}
@end
