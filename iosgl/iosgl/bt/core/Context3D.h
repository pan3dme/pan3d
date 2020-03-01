//
//  Context3D.h
//  iosgl
//
//  Created by zhao on 8/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "ResGC.h"
#import "Shader3D.h"
#import "Vector3D.h"
#import "Matrix3D.h"
#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface Context3D : ResGC
@property (nonatomic, strong) EAGLContext *gl; // OpenGL context,管理使用opengl
-(void)setVcUniform1f:(Shader3D*)shader name:(GLchar*)name data:(CGFloat)data;
-(void)setVcUniform4f:(Shader3D*)shader name:(GLchar*)name x:(GLfloat)x y:(GLfloat)y z:(GLfloat)z w:(GLfloat)w;
-(void)setVc3fv:(Shader3D*)shader name:(GLchar*)name data:(GLfloat*)data;
-(void)setVcMatrix3fv:(Shader3D*)shader name:(GLchar*)name data:(GLfloat*)data;
-(void)setVcMatrix4fv:(Shader3D*)shader name:(GLchar*)name data:(GLfloat*)data;
-(void)pushVa:(GLuint)dataBuffer;
-(void)setVaOffset:(Shader3D*)shader name:(GLchar*)name dataWidth:(int)dataWidth stride:(int)stride offset:(int)offset;
-(void)drawCall:(GLuint)ibuff numTril:(int)numTril;
-(void)setRenderTexture:(Shader3D*)shader name:(GLchar*)name  texture: (GLuint)texture;
 
@end

NS_ASSUME_NONNULL_END
