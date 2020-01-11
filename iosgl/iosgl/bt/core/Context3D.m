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
   
    self.gl = [[EAGLContext alloc]initWithAPI:kEAGLRenderingAPIOpenGLES3];
   
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
-(void)setVc3fv:(Shader3D*)shader name:(GLchar*)name data:(float32x4_t)data;
{
     GLuint glPos = glGetAttribLocation( shader.program, name);
 
     const GLfloat color[3] = {  255.0, 255.0,255.0 };
     glUniform3fv(glPos, 1, color);
    
     
    
    //        glUniformMatrix4fv(rotateID, 1, GL_TRUE, self.modeMatrix.m);
}
@end
