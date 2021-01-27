//
//  MtlModelDisplayShader.h
//  iosgl
//
//  Created by pan3dme on 2021/1/24.
//  Copyright © 2021 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import "Scene3D.h"
#import "GC.h"

NS_ASSUME_NONNULL_BEGIN

@interface MtlModelDisplayShader : GC
@property (nonatomic, strong) id<MTLRenderPipelineState> pipelineState;
@property (nonatomic, strong)  id <MTLDepthStencilState> relaxedDepthState;
 
-(void)mtlEncode;
-(void)mtlSetProgramShader;
@end

NS_ASSUME_NONNULL_END
