//
//  FrameBaseDisplay.h
//  iosgl
//
//  Created by pan3dme on 2020/11/16.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Display3DSprite.h"
#import "FrameNodeVo.h"

NS_ASSUME_NONNULL_BEGIN

@interface FrameBaseDisplay : Display3DSprite
@property(nonatomic,assign)bool sceneVisible;
@property(nonatomic,strong)FrameNodeVo* frameNodeVo;
@property(nonatomic,strong)NSMutableArray<Display3DSprite*>* groupItem;
-(void)setFrameNodeUrl:(FrameNodeVo*)nodeVo;

@end

NS_ASSUME_NONNULL_END
