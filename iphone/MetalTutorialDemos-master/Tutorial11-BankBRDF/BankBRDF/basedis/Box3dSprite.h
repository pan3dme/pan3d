//
//  Box3dSprite.h
//  BankBRDF
//
//  Created by pan3dme on 2021/1/14.
//  Copyright © 2021 Xinhou Jiang. All rights reserved.
//

#import <Foundation/Foundation.h>
@import MetalKit;

NS_ASSUME_NONNULL_BEGIN

@interface Box3dSprite : NSObject
- (instancetype)init:(MTKView*)view;
-(void)updata:(id <MTLRenderCommandEncoder>) renderEncoder;
@end

NS_ASSUME_NONNULL_END
