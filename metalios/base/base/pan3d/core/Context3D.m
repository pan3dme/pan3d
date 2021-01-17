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
    renderPassDescriptor.colorAttachments[0].clearColor = MTLClearColorMake(0.5, 0.0, 0.0, 1.0f);
    self.renderEncoder = [self.commandBuffer renderCommandEncoderWithDescriptor:renderPassDescriptor];

     
    
}
@end
