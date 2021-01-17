//
//  Context3D.m
//  base
//
//  Created by pan3dme on 2021/1/17.
//

#import "Context3D.h"

@implementation Context3D
- (instancetype)init:(MTKView *)value
{
    self = [super init];
        if (self) {
        
            self.mtkView=value;
            self.commandQueue = [ self.mtkView.device newCommandQueue];
        }
        return self;
}
 
-(void)clearColor:(Vector3D*)value
{
    
    self. commandBuffer = [self.commandQueue commandBuffer];
    MTLRenderPassDescriptor *renderPassDescriptor =  self.mtkView.currentRenderPassDescriptor;
    renderPassDescriptor.colorAttachments[0].clearColor = MTLClearColorMake(value.x,value.y,value.z,value.w);
    self.renderEncoder = [self.commandBuffer renderCommandEncoderWithDescriptor:renderPassDescriptor];

     
    
}
-(void)setViewport:(MTLViewport)value
{
//    [self.context3D setViewport:(MTLViewport){0.0, 0.0, self.camera3D.fovw, self.camera3D.fovh, -1.0, 1.0 }];
}
-(void)present
{
    [self.renderEncoder endEncoding];
    [self.commandBuffer presentDrawable:self.mtkView.currentDrawable];
    [self.commandBuffer commit];
}
@end
