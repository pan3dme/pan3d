//
//  RotationSpriteA.h
//  BankBRDF
//
//  Created by pan3dme on 2021/1/16.
//  Copyright © 2021 Xinhou Jiang. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "Display3D.h"
#import "ObjData.h"
@import MetalKit;

NS_ASSUME_NONNULL_BEGIN

@interface RotationSpriteA : Display3D
@property (nonatomic, strong) ObjData* objData;
-(void)updata:(id<MTLRenderCommandEncoder>)renderEncoder;
@end

NS_ASSUME_NONNULL_END
