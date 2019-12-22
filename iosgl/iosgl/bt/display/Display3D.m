//
//  Display3D.m
//  iosgl
//
//  Created by zhao on 7/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//
#import "Scene3D.h"
#import "Display3D.h"
#import "Matrix3D.h"
#import "Scene3D.h"

@implementation Display3D
- (instancetype)init
{
    self = [super init];
    if (self) {
        _rotationX=0;
        _rotationY=0;
        _rotationZ=0;
        _scaleX=1;
        _scaleY=1;
        _scaleZ=1;
        _posMatrix3d=[[Matrix3D alloc]init];
    }
    return self;
}
-(void)updateMatrix;
{
    [self.posMatrix3d isIdentity];
    self.posMatrix3d=[[Matrix3D alloc]init];
    [self.posMatrix3d outString];
    
    [self.posMatrix3d appendScale:_scaleX y:_scaleY z:_scaleZ];
    [self.posMatrix3d appendRotation:_rotationX axis:Vector3D.X_AXIS];
    [self.posMatrix3d appendRotation:_rotationY axis:Vector3D.Y_AXIS];
    [self.posMatrix3d appendRotation:_rotationZ axis:Vector3D.Z_AXIS];
    [self.posMatrix3d appendTranslation:_x y: _y z:_z];
    
//        this.posMatrix.appendScale(this._scaleX, this._scaleY, this._scaleZ);
//                this.posMatrix.appendRotation(this._rotationX, Vector3D.X_AXIS)
//                this.posMatrix.appendRotation(this._rotationY, Vector3D.Y_AXIS)
//                this.posMatrix.appendRotation(this._rotationZ, Vector3D.Z_AXIS)
//                 this.posMatrix.appendTranslation(this._x, this._y, this._z);
}
-(void) upFrame  ;{
}
-(void) destory ;{
    
}
- (void)setRotationX:(float)value ;{
    _rotationX=value;
    [self updateMatrix];
}
- (float)rotationX; {
    return _rotationX;
}
- (void)setRotationY:(float)value {
    _rotationY=value;
     [self updateMatrix];
}
- (float)rotationY; {
    return _rotationY;
}
- (void)setRotationZ:(float)value ;{
    _rotationZ=value;
     [self updateMatrix];
}
- (float)rotationZ; {
    return _rotationZ;
}

-(void)setScaleX:(float)value;{
   _scaleX=value;
      [self updateMatrix];
}
-(float)scaleX;{
    return _scaleX;
}
-(void)setScaleY:(float)value;{
   _scaleY=value;
      [self updateMatrix];
}
-(float)scaleY;{
    return _scaleY;
}
-(void)setScaleZ:(float)value;{
     _scaleZ=value;
      [self updateMatrix];
}
-(float)scaleZ;{
    return _scaleZ;
}



-(void)setX:(float)value; {
    _x=value;
     [self updateMatrix];
}
-(void)setY:(float)value;{
    _y=value;
     [self updateMatrix];
}
-(void)setZ:(float)value;{
    _z=value;
     [self updateMatrix];
}
-(void)setW:(float)value;{
    _w=value;
     [self updateMatrix];
}


- (void)setName:(NSString *)name;
{
    _name=name;
}
- (NSString *)name;
{
    return _name;
}
@end
