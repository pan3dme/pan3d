//
//  Context3D.m
//  iosgl
//
//  Created by zhao on 8/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "Context3D.h"
#import "Matrix3D.h"

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
}
-(void)setVcMatrix4fv:(Shader3D*)shader name:(GLchar*)name data:(Matrix3D*)data;
{
      glUniformMatrix4fv(  glGetUniformLocation( shader.program,name), 1, GL_TRUE,  data.m);
}
-(void)setVaOffset:(Shader3D*)shader name:(GLchar*)name dataWidth:(int)dataWidth stride:(int)stride offset:(int)offset;
{
    /*
 GLuint textCoor = glGetAttribLocation( progame, "textCoordinate");
     glEnableVertexAttribArray(textCoor);
     glVertexAttribPointer(textCoor, 2, GL_FLOAT, GL_FALSE, self.objData.stride, (GLfloat *)NULL+self.objData.uvsOffsets);
     */
     //glVertexAttribPointer (GLuint indx, GLint size, GLenum type, GLboolean normalized, GLsizei stride, const GLvoid* ptr)   OPENGLES_DEPRECATED(ios(3.0, 12.0), tvos(9.0, 12.0));
           GLuint position = glGetAttribLocation( shader.program,name);
           glEnableVertexAttribArray(position);
           glVertexAttribPointer(position, dataWidth, GL_FLOAT, GL_FALSE,stride, (GLfloat *)NULL+offset);
}
@end
