//
//  FrameBuildSprite.m
//  iosgl
//
//  Created by pan3dme on 2020/11/16.
//  Copyright © 2020 zhao. All rights reserved.
//
#import "FrameBuildSprite.h"
@implementation FrameBuildSprite
-(void)setFrameNodeUrl:(FrameNodeVo*)nodeVo;
{
    [super setFrameNodeUrl:nodeVo];
    FrameBuildSprite* this=self;
    this.groupItem =[[NSMutableArray alloc] init];
    Display3DSprite* dis =[[Display3DSprite alloc]init:this.scene3d];
    [dis setObjUrl:nodeVo.resurl];
    NSDictionary* info =nodeVo.materialInfoArr[0];
    [dis setPicUrl:  [info valueForKey:@"url"]];
    [this.groupItem addObject:dis];
    
}
- (void)upFrame
{
    FrameBuildSprite* this=self;
    if( this.sceneVisible){
        for (int i=0;i<this.groupItem.count;i++){
            [self drawTempDisplay:this.groupItem[i]];
        }
    }
}
-(void)drawTempDisplay:(Display3DSprite*)display
{
    if(display.objData==nil){
        return;
    }
    ObjData* objData= display.objData;
    
}
@end
