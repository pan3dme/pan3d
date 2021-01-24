//
//  Scene3D.h
//  iosgl
//
//  Created by zhao on 8/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//
#import <UIKit/UIKit.h>
#import "ResGC.h"
#import "Vector3D.h"
#import "Display3D.h"
#import "Context3D.h"
#import "Matrix3D.h"
#import "Camera3D.h"
#import "Rectangle.h"
#import "Display3dMovie.h"
#import "SkillManager.h"
#import "ParticleManager.h"
 
@class ParticleManager,SkillManager;

NS_ASSUME_NONNULL_BEGIN

@interface Scene3D : ResGC
 {
float _sceneScale;
 }
@property (nonatomic, strong) Context3D *context3D; // OpenGL context,管理使用opengl
@property (nonatomic, strong) CAEAGLLayer *myEAGLayer;
@property (nonatomic, assign) GLuint myColorRenderBuffer;
@property (nonatomic, assign) GLuint mydepthRenderBuffer;
@property (nonatomic, assign) GLuint myColorFrameBuffer;
@property (nonatomic, strong) NSMutableArray<Display3D*>* displayList;
@property (nonatomic, strong) NSMutableArray<Display3dMovie*>* displayRoleList;
@property (nonatomic, strong) UIView *uiView;
@property (nonatomic, strong) Camera3D *camera3D;
@property (nonatomic, strong) Rectangle *viewRect;
@property (nonatomic, strong) ParticleManager *particleManager;
@property (nonatomic, strong) SkillManager *skillManager;
@property (nonatomic, strong) Vector2D *fogData;
@property (nonatomic, strong) Vector3D *fogColor;
@property (nonatomic, assign) float gameAngle;

@property (nonatomic, assign) double time;
 
-(void)setSceneScale:(float)value;
-(float)sceneScale;
- (instancetype)init:(UIView*)uiview;
-(void) addDisplay:(Display3D*)dis;
-(void) addMovieDisplay:(Display3dMovie*)dis;
-(void) clearAll;
-(void) upFrame  ;
//-(void)resetViewport;
@end

NS_ASSUME_NONNULL_END