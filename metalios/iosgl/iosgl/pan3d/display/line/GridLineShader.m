//
//  GridLineShader.m
//  iosgl
//
//  Created by zhao on 8/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "GridLineShader.h"
#import "Scene3D.h"

@implementation GridLineShader
+(NSString*)shaderStr;
{
    return @"GridLineShader";
}

-(void)mtlEncode
{
  
   MTKView *mtkView=self.scene3D.context3D. mtkView;
   
   id<MTLLibrary> defaultLibrary = [mtkView.device newDefaultLibrary];
 
 
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
@end
