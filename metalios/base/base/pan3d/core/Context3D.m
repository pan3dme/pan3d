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
        
            [self initData:value];
        }
        return self;
}
-(void)initData:(MTKView *)value
{
    self.commandQueue = [value.device newCommandQueue];
}
-(void)clearColor
{
    
}
@end
