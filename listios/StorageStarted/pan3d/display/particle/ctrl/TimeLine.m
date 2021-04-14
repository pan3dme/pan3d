//
//  TimeLine.m
//  iosgl
//
//  Created by zhao on 25/2/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "TimeLine.h"
#import "Scene_data.h"
#import "TimeLineData.h"
#import "SelfRotation.h"
#import "AxisRotaion.h"
#import "AxisMove.h"
#import "ScaleChange.h"
#import "ScaleAnim.h"
#import "ScaleNoise.h"
#import "BaseAnim.h"
#import "Matrix3D.h"
#import "ParticleData.h"
#import "Display3DParticle.h"

@interface TimeLine ()
@property (nonatomic, assign)  BOOL  isByteData;
@end

@implementation TimeLine

- (instancetype)init
{
    self = [super init];
    if (self) {
        self.keyFrameAry=[[NSMutableArray alloc]init];
        self.targetFlag = -1;
        self.visible = NO;
        self.maxFrameNum = 0;
        self.time = 0;
    }
    return self;
}
-(void)updateMatrix:(Matrix3D*)posMatrix particle:(Display3DParticle*)particle ;
{
    TimeLine* this=self;
    if (this.axisMove) {
        [posMatrix prependTranslation:this.axisMove.axis.x * this.axisMove.num y:this.axisMove.axis.y * this.axisMove.num z:this.axisMove.axis.z * this.axisMove.num];
    }
    if (this.axisRotaion) {
        [posMatrix prependRotation:this.axisRotaion.num  axis:this.axisRotaion.axis];
    }
    [posMatrix prependTranslation:particle.data.center.x y:particle.data.center.y z:particle.data.center.z];
    if (this.scaleChange) {
        [posMatrix prependScale:particle.data._widthFixed ? 1 : this.scaleChange.num y:particle.data._heightFixed ? 1 : this.scaleChange.num z:particle.data._widthFixed ? 1 : this.scaleChange.num];
    } else if (this.scaleNosie) {
        [ posMatrix prependScale:particle.data._widthFixed ? 1 : (1 + this.scaleNosie.num) y:particle.data._heightFixed ? 1 : (1 + this.scaleNosie.num) z:particle.data._widthFixed ? 1 : (1 + this.scaleNosie.num)];
    } else if (this.scaleAnim) {
        [posMatrix prependScale:particle.data._widthFixed ? 1 : this.scaleAnim.num y:particle.data._heightFixed ? 1 : this.scaleAnim.num z:particle.data._widthFixed ? 1 : this.scaleAnim.num];
    }
    [posMatrix prependRotation:particle.data.rotationV3d.z axis:Vector3D.Z_AXIS];
    [posMatrix prependRotation:particle.data.rotationV3d.y axis:Vector3D.Y_AXIS];
    [posMatrix prependRotation:particle.data.rotationV3d.x axis:Vector3D.X_AXIS];
   
}
-(void)setAllDataInfo:(TimeLineData*)data;
{
    self.isByteData = true;
    NSUInteger len = data.dataAry.count ;
    for (int i = 0; i < len; i++) {
        KeyFrame*temp=((KeyFrame*)data.dataAry[i]);
        KeyFrame* key =  [self addKeyFrame:temp.frameNum];
        key.baseValue =temp.baseValue;
        key.animData = temp.animData;
    }
    self.maxFrameNum = data.maxFrameNum;
    self.beginTime = data.beginTime;
    self.currentKeyFrame = self.keyFrameAry[0];
    
}
-(void)updateTime:(float)t;
{
    TimeLine* this=self;
    if (!this.currentKeyFrame) {
        return;
    }
    this.time = t;
    [this getTarget];
   
     if (!this.currentKeyFrame) {
     return;
     }
     this.time = t;
    [this getTarget];
    if (this.axisRotaion) {
        [this.axisRotaion update:this.time];
    }
    if (this.selfRotaion) {
        [this.selfRotaion update:this.time];
    }
    if (this.axisMove) {
        [this.axisMove update:this.time];
    }
    if (this.scaleChange)
    {
        [this.scaleChange update:this.time];
    } else if (this.scaleNosie)
    {
        [this.scaleNosie update:this.time];
    } else if (this.scaleAnim) {
        [this.scaleAnim update:this.time];
    }
     
}
-(void)getTarget;
{
    TimeLine* this=self;
    int flag=-1;
    for (int i = 0; i < this.keyFrameAry.count; i++) {
        if (this.keyFrameAry[i].frameNum * [Scene_data default].frameTime < this.time) {
            flag = i;
        } else {
            break;
        }
    }
 
    if (flag != this.targetFlag) {
        this.currentKeyFrame = this.keyFrameAry[flag];
        this.targetFlag = flag;
        
        if (flag == (this.keyFrameAry.count - 1)) {
            this.visible = NO;
            this.currentKeyFrame = nil;
        } else {
            this.visible = YES;
   
            [this enterKeyFrame:this.currentKeyFrame.animData baseTime:this.currentKeyFrame.frameNum *[Scene_data default].frameTime baseValueAry:this.currentKeyFrame.baseValue];
        }
        
    }
   
}
-(void)enterKeyFrame:(NSArray*)ary baseTime:(float)baseTime baseValueAry:(NSArray<NSNumber*>*)baseValueAry;
{
    TimeLine* this=self;
    if (!baseValueAry) {
        return;
    }
    for (int i= 0;i < 10; i++){
        if ( ![baseValueAry[i]boolValue]) {
            continue;
        }
        switch (i) {
            case 1:
                if (!this.selfRotaion)
                {
                    this.selfRotaion = [[SelfRotation alloc]init] ;
                }
                this.selfRotaion.baseNum =[baseValueAry[i]floatValue];
                this.selfRotaion.num = [baseValueAry[i]floatValue];
                
                break;
            case 2:
                if (!this.axisRotaion)
                {
                    this.axisRotaion = [[AxisRotaion alloc]init];
                }
                this.axisRotaion.num =this.axisRotaion.baseNum = [baseValueAry[i]floatValue];
                break;
            case 6:
                if (!this.scaleChange)
                {
                    this.scaleChange = [[ScaleChange alloc]init];
                }
                this.scaleChange.num = this.scaleChange.baseNum = [baseValueAry[i]floatValue];
                break;
            case 7:
                if (!this.scaleAnim)            {
                    this.scaleAnim = [[ScaleAnim alloc]init];
                }
                this.scaleAnim.num = this.scaleAnim.baseNum = [baseValueAry[i]floatValue];
                break;
            case 8:
                if (!this.scaleNosie)
                {
                    this.scaleNosie =[[ScaleNoise alloc]init];
                }
                this.scaleNosie.num = this.scaleNosie.baseNum = [baseValueAry[i]floatValue];
                break;
            case 9:
                if (!this.axisMove)
                {
                    this.axisMove =[[ AxisMove alloc]init];
                }
                this.axisMove.num = this.axisMove.baseNum = [baseValueAry[i]floatValue];
                break;
        }
        
    }
    
    if (this.selfRotaion)
    {
        this.selfRotaion.isDeath = true;
        
    }
    if (this.axisRotaion)
    {
        this.axisRotaion.isDeath = true;
        
    }
    if (this.scaleChange)
    {
        this.scaleChange.isDeath = true;
    }
    if (this.scaleAnim)
    {
        this.scaleAnim.isDeath = true;
        
    }
    if (this.scaleNosie)
    {
        this.scaleNosie.isDeath = true;
        
    }
    if (this.axisMove)
    {
        this.axisMove.isDeath = true;
    }
    
    if (!ary) {
        return;
    }
    
    [self setBaseTimeByte:ary baseTime:baseTime baseValueAry:baseValueAry];
    
}
-(void)setBaseTimeByte:(NSArray<NSDictionary*>*)ary baseTime:(float)baseTime baseValueAry:(NSArray*)baseValueAry;
{
    TimeLine* this=self;
    for (int i = 0; i < ary.count; i++) {
        int type=[ary[i][@"type"]intValue];
        BaseAnim* baseAnim;
        if (type== 1) {
            if (!this.selfRotaion) {
                this.selfRotaion = [[SelfRotation alloc]init] ;
            }
            baseAnim=this.selfRotaion;
        } else if (type == 2) {
            if (!this.axisRotaion) {
                this.axisRotaion = [[AxisRotaion alloc]init];
            }
            baseAnim=this.axisRotaion;
        } else if (type == 6) {
            if (!this.scaleChange) {
                this.scaleChange = [[ScaleChange alloc]init];
            }
            baseAnim=this.scaleChange;
        } else if (type == 7) {
            if (!this.scaleAnim) {
                this.scaleAnim = [[ScaleAnim alloc]init];
            }
            baseAnim=this.scaleAnim;
        } else if (type == 8) {
            if (!this.scaleNosie) {
                this.scaleNosie = [[ScaleNoise alloc]init];
            }
            baseAnim=this.scaleNosie;
        } else if (type == 9) {
            if (!this.axisMove) {
                this.axisMove =[[AxisMove alloc]init];
            }
            baseAnim=this.axisMove;
        }
        [baseAnim reset];
        [baseAnim dataByte:ary[i][@"data"] arr:ary[i][@"dataByte"]];
        baseAnim.baseTime = baseTime;
        
  
    }
    
    
}
 
-(KeyFrame*)addKeyFrame:(int)num
{
    KeyFrame *keyframe=[[KeyFrame alloc]init];
    keyframe.frameNum=num;
    [self.keyFrameAry addObject:keyframe];
    return keyframe;
}
-(void)reset;
{
    self.time=0;
    self.currentKeyFrame=self.keyFrameAry[0];
    self.visible=NO;
    self.targetFlag=-1;
}

-(void)applySelfRotation:(Matrix3D*)targetMatrix axis:(Vector3D*)axis;
{
    if(self.selfRotaion){
        NSLog(@"%f",self.selfRotaion.num)
        [targetMatrix prependRotation:self.selfRotaion.num axis:axis];
  
    }
    
}
 
@end

