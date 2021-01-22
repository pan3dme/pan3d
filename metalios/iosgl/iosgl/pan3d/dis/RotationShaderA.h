//
//  RotationShaderA.h
//  iosgl
//
//  Created by pan3dme on 2021/1/22.
//  Copyright © 2021 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import "MtkScene3D.h"

NS_ASSUME_NONNULL_BEGIN

@interface RotationShaderA : NSObject
@property (nonatomic, strong) id<MTLRenderPipelineState> pipelineState;
@property (nonatomic, strong)  id <MTLDepthStencilState> relaxedDepthState;
@property (nonatomic, strong)  MtkScene3D*   mtkScene3D;

- (instancetype)init:(MtkScene3D*)value;
-(void)encode;
-(void)setProgramShader;
@end

NS_ASSUME_NONNULL_END
