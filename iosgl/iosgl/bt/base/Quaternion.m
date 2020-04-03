//
//  Quaternion.m
//  iosgl
//
//  Created by zhao on 1/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Quaternion.h"
#import "Vector3D.h"
#import "Matrix3D.h"
#import "Matrix4x4.h"

@implementation Quaternion
- (instancetype)init
{
    self = [super init];
    if (self) {
         _x=0;
         _y=0;
         _z=0;
         _w=1;
    }
    return self;
}
- (instancetype)x:(float)x y:(float)y z:(float)z;
{
    _x=x;
       _y=y;
       _z=z;
       _w=1;
       return self;
}
- (instancetype)x:(float)x y:(float)y z:(float)z w:(float)w;
{
    _x=x;
    _y=y;
    _z=z;
    _w=w;
    return self;
}
-(void)setX:(float)value; {
    _x=value;
}
-(float)x;{
    return _x;
}
-(void)setY:(float)value;{
      _y=value;
}
-(float)y;{
       return _y;
}
-(void)setZ:(float)value;{
      _z=value;
}
-(float)z;{
       return _z;
}
-(void)setW:(float)value;{
      _w=value;
}
-(float)w;{
       return _w;
}
-(void)fromAxisAngle:(Vector3D*)axis angle:(double)angle;
{
    Quaternion* this=self;
    double sin_a = sin(angle / 2);
    double cos_a =cos(angle / 2);
    
    this.x = axis.x * sin_a;
    this.y = axis.y * sin_a;
    this.z = axis.z * sin_a;
    this.w = cos_a;
    [this normalize:1];
}
-(void) normalize:(double)val;
{
        Quaternion* this=self;
       double mag = val / sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);

       this.x *= mag;
       this.y *= mag;
       this.z *= mag;
       this.w *= mag;
   }
-(Matrix3D*)toMatrix3D:(Matrix3D*)value;
{
    Matrix3D* outm=   [self toMatrix3D];
    value.matrix4x4=  outm.matrix4x4;
    return value;
}
-(Matrix3D*)toMatrix3D;
{
    Quaternion* this=self;
    Matrix3D* outm=[[Matrix3D alloc ]init];
    
    double x = this.x;
    double y = this.y;
    double z = this.z;
    double w = this.w;
    double     x2 = x + x;
    double      y2 = y + y;
    double     z2 = z + z;
    
    double      xx = x * x2;
    double     yx = y * x2;
    double     yy = y * y2;
    double     zx = z * x2;
    double      zy = z * y2;
    double     zz = z * z2;
    double     wx = w * x2;
    double     wy = w * y2;
    double     wz = w * z2;
    
     Matrix4x4 tempM4x4=Matrix4x4Zero;
    tempM4x4.data[0] = 1 - yy - zz;
    tempM4x4.data[1] = yx + wz;
    tempM4x4.data[2] = zx - wy;
    tempM4x4.data[3] = 0;
    
    tempM4x4.data[4] = yx - wz;
    tempM4x4.data[5] = 1 - xx - zz;
    tempM4x4.data[6] = zy + wx;
    tempM4x4.data[7] = 0;
    
    tempM4x4.data[8] = zx + wy;
    tempM4x4.data[9] = zy - wx;
    tempM4x4.data[10] = 1 - xx - yy;
    tempM4x4.data[11] = 0;
    
    tempM4x4.data[12] = 0;
    tempM4x4.data[13] = 0;
    tempM4x4.data[14] = 0;
    tempM4x4.data[15] = 1;
    
    
    outm.matrix4x4=tempM4x4;
    return outm;
}
-(void)setMd5W;
{
    Quaternion* this=self;
    this.w = 1 - (this.x * this.x + this.y * this.y + this.z * this.z);
    if (this.w < 0) {
        this.w = 0;
    } else {
        this.w = - sqrt( this.w);
    }
}
/*
 
 if (!$matrix3d) {
            $matrix3d = new Matrix3D;
        }
        
        var out: any = $matrix3d.m
        var x: number = this.x, y: number = this.y, z: number = this.z, w: number = this.w,
            x2: number = x + x,
            y2: number = y + y,
            z2: number = z + z,

            xx: number = x * x2,
            yx: number = y * x2,
            yy: number = y * y2,
            zx: number = z * x2,
            zy: number = z * y2,
            zz: number = z * z2,
            wx: number = w * x2,
            wy: number = w * y2,
            wz: number = w * z2;

        out[0] = 1 - yy - zz;
        out[1] = yx + wz;
        out[2] = zx - wy;
        out[3] = 0;

        out[4] = yx - wz;
        out[5] = 1 - xx - zz;
        out[6] = zy + wx;
        out[7] = 0;

        out[8] = zx + wy;
        out[9] = zy - wx;
        out[10] = 1 - xx - yy;
        out[11] = 0;

        out[12] = 0;
        out[13] = 0;
        out[14] = 0;
        out[15] = 1;

        return $matrix3d
 */
@end
