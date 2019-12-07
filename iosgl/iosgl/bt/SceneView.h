//
//  SceneView.h
//  iosgl
//
//  Created by zhao on 7/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "Matrix3D.h"
#import "DisplayBaseShader3D.h"

NS_ASSUME_NONNULL_BEGIN

@interface SceneView : UIView
@property (nonatomic, strong)  Matrix3D *posMatrix3d;

@property (nonatomic, strong) EAGLContext *myContext; // OpenGL context,管理使用opengl es进行绘制的状态,命令及资源
@property (nonatomic, strong) GLKBaseEffect *mEffect;
@property (nonatomic, strong) CAEAGLLayer *myEAGLayer;
@property (nonatomic, assign) GLuint myColorRenderBuffer;
@property (nonatomic, assign) GLuint myColorFrameBuffer;
@property (nonatomic, assign) GLuint myProgramOne;
@property (nonatomic, assign) GLuint myProgramTwo;
@property (nonatomic, assign) GLuint attrBufferTwo;
@property (nonatomic, assign) GLuint attrBufferOne;
@property (nonatomic, assign) int skipnum;

@property (nonatomic,copy) NSString *name;///< name
@property (nonatomic,copy) GLKTextureInfo *textureInfoOne; 
@property (nonatomic,copy) GLKTextureInfo *textureInfoTwo;

@property (nonatomic, strong) DisplayBaseShader3D *shaderOne;
@property (nonatomic, strong) DisplayBaseShader3D *shaderTwo;
 
@end

NS_ASSUME_NONNULL_END
