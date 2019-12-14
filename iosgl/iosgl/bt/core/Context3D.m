//
//  Context3D.m
//  iosgl
//
//  Created by zhao on 8/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "Context3D.h"

@implementation Context3D
- (instancetype)init
{
    self = [super init];
    if (self) {
        [self setupContext];
    }
    return self;
}
-(void)setupContext
{
    EAGLRenderingAPI api = kEAGLRenderingAPIOpenGLES3;
    self.gl = [[EAGLContext alloc]initWithAPI:api];
    if( self.gl==NULL)
    {
        NSLog(@"Create Context Failed!");
        return;
    }
    if(![EAGLContext setCurrentContext: self.gl])
    {
        NSLog(@"setCurrentContext failed!");
        return;
    }
  
    
}
@end
