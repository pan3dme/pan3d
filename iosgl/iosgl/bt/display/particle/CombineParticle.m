//
//  CombineParticle.m
//  iosgl
//
//  Created by zhao on 23/2/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "CombineParticle.h"
#import "Display3DParticle.h"

@interface CombineParticle ()
@property (nonatomic, strong)  NSMutableArray*  _displayAry ;
@property (nonatomic, assign)  float  _time;

@property (nonatomic, assign)  NSString*  _bindSocket;
@property (nonatomic, assign)  float  _rotationX;
@property (nonatomic, assign)  float  _rotationY;
@property (nonatomic, assign)  float  _rotationZ;
@property (nonatomic, assign)  BOOL  _isInGroup;
@property (nonatomic, assign)  Vector3D*  _groupPos;
@property (nonatomic, assign)  Vector3D*  _groupRotation;
@property (nonatomic, assign)  Vector3D*  _groupScale;
@end

 
@implementation CombineParticle

- (instancetype)init
{
    self = [super init];
    if (self) {
        self._displayAry=[[NSMutableArray alloc]init];
    }
    return self;
}

-(void)addPrticleItem:(Display3DParticle*)dic
{
    dic.visible=NO;
    
    [self._displayAry addObject:dic];
    
}
-(void)updateTime:(float)t;
{
    
}
-(void)update;
{
    for(int i=0;i<self._displayAry.count;i++)
    {
        Display3DParticle *dis=((Display3DParticle*)(self._displayAry[i]));
        dis.scene3d=self.scene3d;
        [dis update];
    }
}
-(void)updateItem:(int)idx;
{
    
}
/*
 public addPrticleItem($dis: Display3DParticle): void {
            $dis.visible = false;
            $dis.setBind(this.bindVecter3d, this.bindMatrix, this.bindScale, this.invertBindMatrix, this.groupMatrix);
            this._displayAry.push($dis);
        }
 */

@end
