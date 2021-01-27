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
#import "Scene3D.h"
 
@import MetalKit;
@import GLKit;
NS_ASSUME_NONNULL_BEGIN

@interface MtkScene3D : Scene3D  <MTKViewDelegate>
 
@end

NS_ASSUME_NONNULL_END
