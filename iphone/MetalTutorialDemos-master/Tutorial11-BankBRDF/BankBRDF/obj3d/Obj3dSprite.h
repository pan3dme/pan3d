//
//  Obj3dSprite.h
//  BankBRDF
//
//  Created by pan3dme on 2021/1/15.
//  Copyright © 2021 Xinhou Jiang. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "AAPLMesh.h"
@import MetalKit;

NS_ASSUME_NONNULL_BEGIN

@interface Obj3dSprite : NSObject
- (instancetype)init:(MTKView*)view;
-(void)updata:(id <MTLRenderCommandEncoder>) renderEncoder;
-(void)setMeshInfo:(NSArray<AAPLMesh *> *) meshData ;
-(void)setMtlVertexDes:(MTLVertexDescriptor*)mtlVertexDes;
- (void)updataTest:(id<MTLRenderCommandEncoder>)renderEncoder  m:(matrix_float4x4)m;
- (void)drawMeshes:(id<MTLRenderCommandEncoder>)renderEncoder idx:(int)idx;
 
@end

NS_ASSUME_NONNULL_END
