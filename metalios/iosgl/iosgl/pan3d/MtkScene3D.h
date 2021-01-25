//
//  MtkScene3D.h
//  iosgl
//
//  Created by pan3dme on 2021/1/22.
//  Copyright © 2021 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import "Camera3D.h"
#import "Context3D.h"
#import "TextureManager.h"
#import "MtlModelDisplaySprite.h"
 
@import MetalKit;
@import GLKit;
NS_ASSUME_NONNULL_BEGIN

@interface MtkScene3D : NSObject
@property (nonatomic, strong) MTKView *mtkView;
@property (nonatomic, strong)  Camera3D*  camera3D;
@property (nonatomic, strong)  TextureManager*  textureManager;
@property (nonatomic, strong) Context3D* mtkContext3D;
@property (nonatomic, strong) NSMutableArray<MtlModelDisplaySprite*>* modelList;
 
//必须传入UiView
- (instancetype)init:(UIView*)value;
@end

NS_ASSUME_NONNULL_END
