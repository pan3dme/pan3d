//
//  LineDisplaySprite.h
//  iosgl
//
//  Created by zhao on 6/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Display3D.h"
#import "Display3DSprite.h"
NS_ASSUME_NONNULL_BEGIN

@interface LineDisplaySprite : Display3DSprite
@property (nonatomic, strong) Vector3D* colorV3d;
-(void)clearLine;
-(void)addLineA2B:(Vector3D*)a b:(Vector3D*)b;
@end

NS_ASSUME_NONNULL_END
