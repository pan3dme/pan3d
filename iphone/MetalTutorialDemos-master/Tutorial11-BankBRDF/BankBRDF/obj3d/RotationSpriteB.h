 
//
//  RotationSpriteA.h
//  BankBRDF
//
//  Created by pan3dme on 2021/1/16.
//  Copyright © 2021 Xinhou Jiang. All rights reserved.
//

#import <Foundation/Foundation.h>
@import MetalKit;

NS_ASSUME_NONNULL_BEGIN

@interface RotationSpriteB : NSObject
- (instancetype)init:(MTKView*)view;

-(void)updata:(id<MTLRenderCommandEncoder>)renderEncoder;
@end

NS_ASSUME_NONNULL_END
