//
//  FrameBaseDisplay.m
//  iosgl
//
//  Created by pan3dme on 2020/11/16.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "FrameBaseDisplay.h"

@implementation FrameBaseDisplay
- (instancetype)scene3d:(Scene3D *)val
{
    self.scene3d=val;
    return self;
}
-(void)setFrameNodeUrl:(FrameNodeVo*)nodeVo;
{
    FrameBaseDisplay* this=self;
    this.frameNodeVo=nodeVo;
    this.groupItem =[[NSMutableArray alloc]init];
    Display3DSprite* dis = [[Display3DSprite alloc]init];
    [dis setObjUrl:nodeVo.resurl];
    [this.groupItem  addObject:dis];
}
@end
