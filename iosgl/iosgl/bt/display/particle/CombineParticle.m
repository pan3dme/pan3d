//
//  CombineParticle.m
//  iosgl
//
//  Created by zhao on 23/2/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "CombineParticle.h"
#import "Display3DParticle.h"
#import "Display3DLocusPartilce.h"
#import "IBind.h"


@interface CombineParticle ()



@property (nonatomic, assign)float  _time;
@property (nonatomic, assign)BOOL  _isInGroup;
@property (nonatomic, strong)Vector3D*  _groupPos;
@property (nonatomic, strong)Vector3D*  _groupRotation;
@property (nonatomic, strong)Vector3D*  _groupScale;
@property (nonatomic, strong)id<IBind>  _bindTarget;

//@property(assign,nonatomic) id<DynamicBaseCellDelegate>delegate;

@end

@implementation CombineParticle

-(id<IBind>)bindTarget;
{
    return __bindTarget;
}
-(void)setBindTarget:(id<IBind>)value;
{
    __bindTarget=value;
}
-(void)setX:(float)value; {
    self.bindVecter3d.x=value;
}
-(float)x;{
    return  self.bindVecter3d.x;
}
-(void)setY:(float)value;{
    self.bindVecter3d.y=value;
}
-(float)y;{
    return self.bindVecter3d.y;
}
-(void)setZ:(float)value;{
    self.bindVecter3d.z=value;
}
-(float)z;{
    return self.bindVecter3d.z;
}
 
-(void)setScaleX:(float)value;{
   self.bindScale.x=value;
  
}
-(float)scaleX;{
    return self.bindScale.x;
}
-(void)setScaleY:(float)value;{
   self.bindScale.y=value;
      
}
-(float)scaleY;{
    return self.bindScale.y;
}
-(void)setScaleZ:(float)value;{
     self.bindScale.z=value;
      
}
-(float)scaleZ;{
    return self.bindScale.z;
}


- (instancetype)init
{
    self = [super init];
    if (self) {
        self._displayAry=[[NSMutableArray alloc]init];
        self._time=0;
        self.bindVecter3d =[[Vector3D alloc]init];
        self.bindScale = [[Vector3D alloc]x:1 y:1 z:1];
        self.bindMatrix = [[Matrix3D alloc]init];
        self.invertBindMatrix =  [[Matrix3D alloc]init];
        self.groupMatrix =  [[Matrix3D alloc]init];
        self.groupRotationMatrix = [[Matrix3D alloc]init];
    }
    return self;
}

-(void)addPrticleItem:(Display3DParticle*)dic
{
    dic.visible=YES;
    [dic setBind:self.bindVecter3d rotation:self.bindMatrix scale:self.bindScale invertRotation:self.invertBindMatrix groupMatrix:self.groupMatrix];
    [self._displayAry addObject:dic];
    
}
-(void)updateTime:(float)t;
{
    self._time += t;
    for(int i=0;i<self._displayAry.count;i++)
    {
        [self._displayAry[i] updateTime:self._time];
    }
}
-(void)reset;
{
    self._time=0;
    for (int i = 0; i < self._displayAry.count; i++) {
        [self._displayAry[i] reset];
    }
    
}
-(void)update;
{
    for(int i=0;i<self._displayAry.count;i++)
    {
        self._displayAry[i].scene3d=self.scene3d;
        
        if([ self._displayAry[i] isKindOfClass:[Display3DLocusPartilce class ] ]){
           
        }
        [self._displayAry[i] update];
        
    }
}
-(void)updateItem:(int)idx;
{
    
}

@end
