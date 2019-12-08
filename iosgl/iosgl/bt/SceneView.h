//
//  SceneView.h
//  iosgl
//
//  Created by zhao on 7/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "Display3DSprite.h"
#import "Matrix3D.h"
#import "Shader3D.h"
#import "TextureRes.h"
#import "ObjData.h"
#import "Scene3D.h"

NS_ASSUME_NONNULL_BEGIN

@interface SceneView : UIView
@property (nonatomic, strong)  Matrix3D *posMatrix3d;

@property (nonatomic, strong) EAGLContext *myContext; // OpenGL context,管理使用opengl es进行绘制的状态,命令及资源
@property (nonatomic, strong) GLKBaseEffect *mEffect;
@property (nonatomic, strong) CAEAGLLayer *myEAGLayer;
@property (nonatomic, assign) GLuint myColorRenderBuffer;
@property (nonatomic, assign) GLuint myColorFrameBuffer;
 
 
@property (nonatomic, assign) int skipnum;

@property (nonatomic,copy) NSString *name;///< name

@property (nonatomic, strong) TextureRes *textureResOne;
@property (nonatomic, strong) TextureRes *textureResTwo;
@property (nonatomic, strong) Shader3D *shaderOne;
@property (nonatomic, strong) Shader3D *shaderTwo;
@property (nonatomic, strong) ObjData *objDataOne;
@property (nonatomic, strong) ObjData *objDataTwo;

@property (nonatomic, strong) Display3DSprite *dispOne;
@property (nonatomic, strong) Scene3D *scene3D;
 
@end

NS_ASSUME_NONNULL_END
