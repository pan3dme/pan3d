//
//  MtkBaseLineShader.h
//  iosgl
//
//  Created by pan3dme on 2021/1/23.
//  Copyright © 2021 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import "Scene3D.h"

NS_ASSUME_NONNULL_BEGIN

@interface MtkBaseLineShader : NSObject
@property (nonatomic, strong) id<MTLRenderPipelineState> pipelineState;
@property (nonatomic, strong)  id <MTLDepthStencilState> relaxedDepthState;
@property (nonatomic, strong)  Scene3D*   mtkScene3D;

- (instancetype)init:(Scene3D*)value;
-(void)encode;
-(void)setProgramShader;
@end

NS_ASSUME_NONNULL_END
