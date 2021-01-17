//
//  RotationSpriteC.h
//  base
//
//  Created by pan3dme on 2021/1/17.
//

#import <Foundation/Foundation.h>
@import MetalKit;

NS_ASSUME_NONNULL_BEGIN

@interface RotationSpriteC : NSObject
- (instancetype)init:(MTKView*)view;

-(void)updata:(id<MTLRenderCommandEncoder>)renderEncoder;
@end

NS_ASSUME_NONNULL_END
