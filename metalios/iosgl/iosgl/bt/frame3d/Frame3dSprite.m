//
//  Frame3dSprite.m
//  iosgl
//
//  Created by pan3dme on 2020/11/16.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Frame3dSprite.h"
#import "Frame3dRes.h"
#import "Scene3D.h"
#import "TimeUtil.h"
#import "FrameFileNode.h"
@interface Frame3dSprite ()
@property (nonatomic, assign) double lastTime;
@property (nonatomic, assign) float frameNum;

@property (nonatomic, strong) Frame3dRes *frame3dRes;
@property (nonatomic, strong) NSMutableArray<FrameFileNode*> *frameImodelItem;
 
@end

@implementation Frame3dSprite
 
- (instancetype)init:(Scene3D *)val
{
    self=[super init:val];
    self.lastTime=0;
    [self addLoadFrame3dRes];
    return self;
}

-(void)addLoadFrame3dRes;
{
    NSString* url=@"pan/frame3dres/huowumatou_frame.txt";
    self.frame3dRes=[[Frame3dRes alloc]init];
    [self.frame3dRes load:url fun:^(NSString *localPath) {
       
        [self loadFrame3DFinish ];
             
    }];
    
 
}
-(void)loadFrame3DFinish;
{
    Frame3dSprite* this=self;
 
   
    this.frameImodelItem = [[NSMutableArray alloc] init];
           for (int i = 0; i <this.frame3dRes.frameItem.count; i++) {
               FrameFileNode* base = [[FrameFileNode alloc]init:this.mtkScene3D];
               [base setFrameNodeVoInfo:this.frame3dRes.frameItem[i]];
           
               [this.frameImodelItem addObject:base];
           }
    
    
}
-(void)mathTimeFrame
{
    Frame3dSprite* this=self;
    float dt =  [[TimeUtil default]getTimer] - this.lastTime;
    this.frameNum += dt / (1000 / this.frame3dRes.frameSpeedNum);
    this.frameNum=(int)this.frameNum % (int)(this.frame3dRes.maxTime-1);;
    this.lastTime =  [[TimeUtil default]getTimer] ;
    for (int i = 0;  i < this.frameImodelItem.count; i++) {
        this.frameImodelItem[i].frameNodeVo.curTime=this.frameNum;
    }
}
- (void)upFrame
{
    Frame3dSprite* this=self;
    if(this.frame3dRes.isReady){
        [this mathTimeFrame];
        for (int i = 0;  i < this.frameImodelItem.count; i++) {
            [this.frameImodelItem[i] upFrame];
        }
    }
}


@end
