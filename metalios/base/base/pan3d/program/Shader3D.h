//
//  Shader3D.h
//  base
//
//  Created by pan3dme on 2021/1/17.
//

#import "ResCount.h"

NS_ASSUME_NONNULL_BEGIN

@interface Shader3D : ResCount
@property (nonatomic, strong) id<MTLRenderPipelineState> pipelineState;
@property (nonatomic, strong)  id <MTLDepthStencilState> relaxedDepthState;

-(void)encode;
-(void)setProgramShader;
@end

NS_ASSUME_NONNULL_END
