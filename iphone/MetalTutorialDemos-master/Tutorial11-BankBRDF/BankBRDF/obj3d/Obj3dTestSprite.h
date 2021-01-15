//
//  Obj3dTestSprite.h
//  BankBRDF
//
//  Created by pan3dme on 2021/1/16.
//  Copyright © 2021 Xinhou Jiang. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "AAPLMesh.h"
@import MetalKit;
NS_ASSUME_NONNULL_BEGIN

@interface Obj3dTestSprite : NSObject
- (instancetype)init:(MTKView*)view;
-(void)updata:(id <MTLRenderCommandEncoder>) renderEncoder;
-(void)setMeshInfo:(NSArray<AAPLMesh *> *) meshData;
- (void)updataTest:(id<MTLRenderCommandEncoder>)renderEncoder  m:(matrix_float4x4)m;
- (void)drawMeshes:(id<MTLRenderCommandEncoder>)renderEncoder idx:(int)idx;
 
@end

NS_ASSUME_NONNULL_END
