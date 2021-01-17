//
//  Scene3D.h
//  base
//
//  Created by pan3dme on 2021/1/17.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import "Camera3D.h"
#import "Context3D.h"
//#import "TextureManager.h"
@import MetalKit;
@import GLKit;

@class  TextureManager;

NS_ASSUME_NONNULL_BEGIN

@interface Scene3D : NSObject
@property (nonatomic, strong) MTKView *mtkView;
@property (nonatomic, strong)  Camera3D*  camera3D;
@property (nonatomic, strong)  TextureManager*  textureManager;
@property (nonatomic, strong) Context3D* context3D;

- (instancetype)init:(UIView*)value;
@end

NS_ASSUME_NONNULL_END
