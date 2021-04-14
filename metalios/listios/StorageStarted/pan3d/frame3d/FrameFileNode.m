//
//  FrameFileNode.m
//  iosgl
//
//  Created by pan3dme on 2020/11/16.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "FrameFileNode.h"
#import "FrameNodeVo.h"
#import "CombineParticle.h"
#import "FrameSceneChar.h"
 
#import "FrameBuildSprite.h"
 
#import "Scene3D.h"
#import "Quaternion.h"
#import "Display3D.h"

@interface FrameFileNode ()


@property (nonatomic, strong)CombineParticle* _particle;
@property (nonatomic, strong)FrameSceneChar* _sceneChar;
 
@property (nonatomic, strong)FrameBuildSprite* _frameBuildSprite;
 
@property (nonatomic, strong)Display3D* sprite ;
@end

@implementation FrameFileNode
-(void)setFrameNodeVoInfo:(FrameNodeVo*)vo;
{
    FrameFileNode* this=self;
    this.frameNodeVo = vo;
    if (this.frameNodeVo.type == 1) {
        if (this.frameNodeVo.directLight) {  //有法线的对象
            this._frameBuildSprite =[[FrameBuildSprite alloc]init:this.scene3D];
            [this._frameBuildSprite setFrameNodeUrl:this.frameNodeVo];
            [this.scene3D addDisplay:this._frameBuildSprite];
            this.sprite = this._frameBuildSprite;
        } else {
            if (this.frameNodeVo.receiveShadow) {
                //                this._shadowDisplay3DSprite = new ShadowDisplay3DSprite(this.scene3d);
                //                this._shadowDisplay3DSprite.setFrameNodeUrl(this.frameNodeVo);
                //                this.scene3d.addDisplay(this._shadowDisplay3DSprite);
                //                this.sprite = this._shadowDisplay3DSprite;
            } else {
                //                this._lightSprite = new LightDisplay3DSprite(this.scene3d);
                //                this._lightSprite.setFrameNodeUrl(this.frameNodeVo);
                //                this.scene3d.addDisplay(this._lightSprite);
                //                this.sprite = this._lightSprite;
            }
        }
    }
    
    
}
- (void)upFrame
{
    FrameFileNode* this=self;
    this.sceneVisible = [this isVisible:this.frameNodeVo.curTime];
    if (this.sceneVisible) {
        [this setModelSprite: [this playFrameVoByTime:this.frameNodeVo.curTime]];
    }
    if (this._particle!=nil) {
        this._particle.sceneVisible = this.sceneVisible;
    }
    if (this._frameBuildSprite!=nil) {
        this._frameBuildSprite.sceneVisible = this.sceneVisible;
    }
    
}
-(FrameLinePointVo*) playFrameVoByTime:(float )$time {
    FrameFileNode* this=self;
    FrameLinePointVo* $keyC=nil;
    FrameLinePointVo* $a = [this getPreFrameLinePointVoByTime:$time];
    FrameLinePointVo* $b = [this getNextFrameLinePointVoByTime:$time];
    for (int i = 0; i < this.frameNodeVo.pointitem.count; i++) {
        if (this.frameNodeVo.pointitem[i].time == $time) {
            $keyC = this.frameNodeVo.pointitem[i];
        }
    }
    if ($keyC!=nil) {
        if ($keyC.iskeyFrame) {
            return $keyC;
        }
    } else {
        if ($a!=nil && !$a.isAnimation) {
            return $a;
        } else if ($a!=nil && $b!=nil) {
            return  [this setModelData:$a pointVo:$b time:$time];
        }
    }
    return nil;
}

-(FrameLinePointVo*) setModelData:(FrameLinePointVo*)$a pointVo:(FrameLinePointVo*)$b time:(float)$time;
{
    FrameFileNode* this=self;
    float $num = ($time - $a.time) / ($b.time - $a.time);
    
    FrameLinePointVo* $obj =   [[FrameLinePointVo alloc] init];
    $obj.x = $a.x + ($b.x - $a.x) * $num;
    $obj.y = $a.y + ($b.y - $a.y) * $num;
    $obj.z = $a.z + ($b.z - $a.z) * $num;
    
    $obj.scaleX = $a.scaleX + ($b.scaleX - $a.scaleX) * $num;
    $obj.scaleY = $a.scaleY + ($b.scaleY - $a.scaleY) * $num;
    $obj.scaleZ = $a.scaleZ + ($b.scaleZ - $a.scaleZ) * $num;
    
    
    
    
    Vector3D* $eulerAngle = [this qtoq:$a pointVo:$b time: $num];
    
    
    
    $obj.rotationX = $eulerAngle.x;
    $obj.rotationY = $eulerAngle.y;
    $obj.rotationZ = $eulerAngle.z;
    $obj.data = $a.data; //存前面一个的数所有
    
    if (!$b.iskeyFrame) {
        return $a;
    } else {
        return $obj;
    }
    
}
-(Vector3D*)qtoq:(FrameLinePointVo*)$a pointVo:(FrameLinePointVo*)$b time:(float)tm;{
    
    Matrix3D* $m0 = [[Matrix3D alloc] init];
    
    [$m0 appendRotation:$a.rotationX axis: Vector3D.X_AXIS];
    [$m0 appendRotation:$a.rotationY axis: Vector3D.Y_AXIS];
    [$m0 appendRotation:$a.rotationZ axis: Vector3D.Z_AXIS];
    
    Quaternion* q0 = [[Quaternion alloc]init] ;
    
    [q0 fromMatrix:$m0];
    
    
    Matrix3D* $m1 =[[Matrix3D alloc] init];
    
    
    [$m1 appendRotation:$b.rotationX axis: Vector3D.X_AXIS];
    [$m1 appendRotation:$b.rotationY axis: Vector3D.Y_AXIS];
    [$m1 appendRotation:$b.rotationZ axis: Vector3D.Z_AXIS];
    
    
    Quaternion* q1 = [[Quaternion alloc]init] ;
    
    [q1 fromMatrix:$m1];
    
    Quaternion* resultQ =  [[Quaternion alloc]init] ;
    
    [resultQ slerp:q0 qb:q1 t:tm];
    
    
    Vector3D* $ve = [resultQ toEulerAngles:nil];
    
    
    [$ve scaleBy:180/M_PI];
    
    
    if ( [self isNaN:$ve.x] || [self isNaN:$ve.y] ||  [self isNaN:$ve.z]) {
        $ve.x = $a.rotationX;
        $ve.y = $a.rotationY;
        $ve.z = $a.rotationZ;
    }
    
    return $ve;
}
-(BOOL)isNaN:(float)val{
    
    if(val-0.0<1e-6) return true;else return false;
}
-(void) setModelSprite:(FrameLinePointVo* )$obj {
    FrameFileNode* this=self;
    if (this.sprite!=nil) {
        this.sprite.x = $obj.x;
        this.sprite.y = $obj.y;
        this.sprite.z = $obj.z;
        this.sprite.scaleX = $obj.scaleX;
        this.sprite.scaleY = $obj.scaleY;
        this.sprite.scaleZ = $obj.scaleZ;
        this.sprite.rotationX = $obj.rotationX;
        this.sprite.rotationY = $obj.rotationY;
        this.sprite.rotationZ = $obj.rotationZ;
    }
    if (this._sceneChar!=nil) {
        //            if ($obj.data && $obj.data.action) {
        //                if (this._sceneChar.curentAction != $obj.data.action) {
        //                    this._sceneChar.play($obj.data.action)
        //                }
        //            }
        
    }
    
}
-(Boolean)   isVisible:(float) $num{
    FrameFileNode* this=self;
    float $min = this.frameNodeVo.pointitem[0].time;
    float $max = this.frameNodeVo.pointitem[this.frameNodeVo.pointitem.count - 1].time;
    FrameLinePointVo* dd = [this getPreFrameLinePointVoByTime :$num ];
    if ($num >= $min && $num <= $max && dd!=nil) {
        return dd.iskeyFrame;
    } else {
        return false;
    }
}
-(FrameLinePointVo*) getNextFrameLinePointVoByTime:(float )$time  //包含当前
{
    FrameFileNode* this=self;
    FrameLinePointVo* $next = nil;
    for (int i = 0; i < this.frameNodeVo.pointitem.count; i++) {
        if (this.frameNodeVo.pointitem[i].time >= $time) {
            if ($next==nil || $next.time > this.frameNodeVo.pointitem[i].time) {
                $next = this.frameNodeVo.pointitem[i];
            }
        }
    }
    return $next;
}
-(FrameLinePointVo*)  getPreFrameLinePointVoByTime:(float )$time
{
    FrameFileNode* this=self;
    FrameLinePointVo* $pre;
    for (int  i = 0; i < this.frameNodeVo.pointitem.count; i++) {
        if (this.frameNodeVo.pointitem[i].time <= $time) {
            if ($pre==nil || $pre.time < this.frameNodeVo.pointitem[i].time) {
                $pre = this.frameNodeVo.pointitem[i];
            }
        }
    }
    return $pre;
}
@end
