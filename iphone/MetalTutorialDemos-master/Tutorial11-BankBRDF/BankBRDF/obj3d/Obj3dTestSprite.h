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
-(void)setMeshInfo:(NSArray<AAPLMesh *> *) meshData ;
-(void)setMtlVertexDes:(MTLVertexDescriptor*)mtlVertexDes;
- (void)updataTest:(id<MTLRenderCommandEncoder>)renderEncoder;
- (void)drawMeshes:(id<MTLRenderCommandEncoder>)renderEncoder idx:(int)idx;
- (void) drawableSizeWillChange:(CGSize)size;
@end

NS_ASSUME_NONNULL_END
