//
//  Shader3D.m
//  base
//
//  Created by pan3dme on 2021/1/17.
//

#import "Shader3D.h"

@implementation Shader3D
 

-(void)encode
{
    
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
