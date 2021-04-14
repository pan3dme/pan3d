//
//  FrameBaseDisplay.m
//  iosgl
//
//  Created by pan3dme on 2020/11/16.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "FrameBaseDisplay.h"

@implementation FrameBaseDisplay
 
 
-(void)setFrameNodeUrl:(FrameNodeVo*)nodeVo;
{
    FrameBaseDisplay* this=self;
    this.frameNodeVo=nodeVo;
    this.groupItem =[[NSMutableArray alloc]init];
    Display3DSprite* dis = [[Display3DSprite alloc]init:self.scene3D];
    [dis setObjUrl:nodeVo.resurl];
    [this.groupItem  addObject:dis];
}
@end
