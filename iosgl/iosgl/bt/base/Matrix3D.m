//
//  Matrix3D.m
//  iosgl
//
//  Created by zhao on 5/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "Matrix3D.h"
#import "Vector3D.h"
#import "Matrix4x4.h"
#import <GLKit/GLKit.h>


@interface Matrix3D()

@property (nonatomic, assign)  float  m00;
@property (nonatomic, assign)  float  m01;
@property (nonatomic, assign)  float  m02;
@property (nonatomic, assign)  float  m03;
@property (nonatomic, assign)  float  m04;
@property (nonatomic, assign)  float  m05;
@property (nonatomic, assign)  float  m06;
@property (nonatomic, assign)  float  m07;
@property (nonatomic, assign)  float  m08;
@property (nonatomic, assign)  float  m09;
@property (nonatomic, assign)  float  m10;
@property (nonatomic, assign)  float  m11;
@property (nonatomic, assign)  float  m12;
@property (nonatomic, assign)  float  m13;
@property (nonatomic, assign)  float  m14;
@property (nonatomic, assign)  float  m15;
@property (nonatomic, assign)  Matrix4x4  matrix4x4;


@end

@implementation Matrix3D

GLfloat  minfo[16];


- (instancetype)init
{
    
    self = [super init];
    if (self) {
        
        self.matrix4x4=Matrix4x4Zero;
        self.isIdentity=true;
        [self identity];
        
        
    }
    return self;
} 
-(GLfloat *)m;{
    
    minfo[0]=self.m00;
    minfo[1]=self.m01;
    minfo[2]=self.m02;
    minfo[3]=self.m03;
    minfo[4]=self.m04;
    minfo[5]=self.m05;
    minfo[6]=self.m06;
    minfo[7]=self.m07;
    minfo[8]=self.m08;
    minfo[9]=self.m09;
    minfo[10]=self.m10;
    minfo[11]=self.m11;
    minfo[12]=self.m12;
    minfo[13]=self.m13;
    minfo[14]=self.m14;
    minfo[15]=self.m15;
    

    return minfo;
}
-(GLfloat *)m44m;
{
    return (GLfloat *)&_matrix4x4;
}
-(void)identity
{
    
    self.m00=1;
    self.m01=0;
    self.m02=0;
    self.m03=0;
    
    self.m04=0;
    self.m05=1;
    self.m06=0;
    self.m07=0;
    
    self.m08=0;
    self.m09=0;
    self.m10=1;
    self.m11=0;
    
    self.m12=0;
    self.m13=0;
    self.m14=0;
    self.m15=1;
    
    self.matrix4x4=Matrix4x4Identity;
    
}
-(void)outString{
    
}
 
-(void) appendTranslation:(float  )x  y:(float)y z:(float)z ;
{
     Matrix3D *tempM= [[Matrix3D alloc]init];
     [tempM prependTranslation:x y:y z:z];
     [self append:tempM];
    
 
     
}
-(void) prependTranslation:(float  )x  y:(float)y z:(float)z ;
{
    
    self.m12 = self.m00 * x + self.m04 * y +self.m08 * z + self.m12;
    self.m13 = self.m01 * x + self.m05 * y + self.m09 * z + self.m13;
    self.m14 = self.m02 * x + self.m06 * y + self.m10 * z + self.m14;
    self.m15 = self.m03* x + self.m07 * y + self.m11 * z + self.m15;
    
    
  self.matrix4x4=   Matrix4x4Translate(self.matrix4x4,x,y,z);
    
}
-(void) perspectiveFieldOfViewLH:(float)fieldOfViewY  aspectRatio:(float)aspectRatio zNear:(float)zNear zFar:(float)zFar;
{
    float yScale = 1.0 / tan(fieldOfViewY / 2.0);
    float xScale = yScale / aspectRatio;
    self.m00 = xScale;
    self.m01 = 0;
    self.m02 = 0;
    self.m03 = 0;
    self.m04= 0;
    self.m05= yScale;
    self.m06= 0;
    self.m07 = 0;
    self.m08= 0;
    self.m09= 0;
    self.m00= zFar / (zFar - zNear);
    self.m11= 1;
    self.m12 = 0;
    self.m13 = 0;
    self.m14 = (zNear * zFar) / (zNear - zFar);
    self.m15= 0;
}
 
-(void)append :(Matrix3D*)matrx3d;
{
    Matrix3D *tempM= [[Matrix3D alloc]init];
    tempM.m00=matrx3d.m00;
    tempM.m01=matrx3d.m01;
    tempM.m02=matrx3d.m02;
    tempM.m03=matrx3d.m03;
    tempM.m04=matrx3d.m04;
    tempM.m05=matrx3d.m05;
    tempM.m06=matrx3d.m06;
    tempM.m07=matrx3d.m07;
    tempM.m08=matrx3d.m08;
    tempM.m09=matrx3d.m09;
    tempM.m10=matrx3d.m10;
    tempM.m11=matrx3d.m11;
    tempM.m12=matrx3d.m12;
    tempM.m13=matrx3d.m13;
    tempM.m14=matrx3d.m14;
    tempM.m15=matrx3d.m15;
    
    
    tempM.matrix4x4= Matrix4x4clone(matrx3d.matrix4x4);
 
    
    [tempM prepend:self];
    
    self.m00=tempM.m00;
    self.m01=tempM.m01;
    self.m02=tempM.m02;
    self.m03=tempM.m03;
    self.m04=tempM.m04;
    self.m05=tempM.m05;
    self.m06=tempM.m06;
    self.m07=tempM.m07;
    self.m08=tempM.m08;
    self.m09=tempM.m09;
    self.m10=tempM.m10;
    self.m11=tempM.m11;
    self.m12=tempM.m12;
    self.m13=tempM.m13;
    self.m14=tempM.m14;
    self.m15=tempM.m15;
    
    
    self.matrix4x4= Matrix4x4clone(tempM.matrix4x4);

    
}
-(Matrix3D *)clone;
{
    Matrix3D *tempM= [[Matrix3D alloc]init];
     tempM.m00=self.m00;
     tempM.m01=self.m01;
     tempM.m02=self.m02;
     tempM.m03=self.m03;
     tempM.m04=self.m04;
     tempM.m05=self.m05;
     tempM.m06=self.m06;
     tempM.m07=self.m07;
     tempM.m08=self.m08;
     tempM.m09=self.m09;
     tempM.m10=self.m10;
     tempM.m11=self.m11;
     tempM.m12=self.m12;
     tempM.m13=self.m13;
     tempM.m14=self.m14;
     tempM.m15=self.m15;
    
    return tempM;
    
}
-(void)prepend :(Matrix3D*)matrx3d;
{
    float b[16] = {
        matrx3d.m00, matrx3d.m01, matrx3d.m02, matrx3d.m03,
        matrx3d.m04, matrx3d.m05, matrx3d.m06, matrx3d.m07,
        matrx3d.m08, matrx3d.m09, matrx3d.m10, matrx3d.m11,
        matrx3d.m12, matrx3d.m13, matrx3d.m14, matrx3d.m15
    };
    
    float a[16] = {
        self.m00, self.m01, self.m02, self.m03,
        self.m04, self.m05, self.m06, self.m07,
        self.m08, self.m09, self.m10, self.m11,
        self.m12, self.m13, self.m14, self.m15
    };
    
    float a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
    a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
    a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
    a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
    
    float b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    self.m00 = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    self.m01 = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    self.m02 = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    self.m03 = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    
    b0 = b[4]; b1 = b[5]; b2 = b[6]; b3 = b[7];
    self.m04 = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    self.m05 = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    self.m06 = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    self.m07 = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    
    b0 = b[8]; b1 = b[9]; b2 = b[10]; b3 = b[11];
    self.m08 = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    self.m09 = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    self.m10 = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    self.m11 = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    
    b0 = b[12]; b1 = b[13]; b2 = b[14]; b3 = b[15];
    self.m12 = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    self.m13 = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    self.m14 = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    self.m15 = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    
  
    
   self.matrix4x4=Matrix4x4Multiply( self.matrix4x4,  matrx3d.matrix4x4);
}
 
-(void)  appendRotation:(float)rad axis:(Vector3D*)axis;
{
    Matrix3D *tempM=[[Matrix3D alloc]init];
    [tempM prependRotation: rad axis:axis];
    [self append:tempM];
}
-(void)  prependRotation:(float)rad axis:(Vector3D*)axis;
{
    
    float x = axis.x, y = axis.y, z = axis.z,
    len = sqrt(x * x + y * y + z * z),
    s, c, t,
    a00, a01, a02, a03,
    a10, a11, a12, a13,
    a20, a21, a22, a23,
    b00, b01, b02,
    b10, b11, b12,
    b20, b21, b22;
    
    if (len< 0.000001&&len>-0.000001) {
        return  ;
        
    };
    
    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;
    
    s = sin(rad * 3.141592f /180.0f);
    c = cos(rad * 3.141592f /180.0f);
    t = 1 - c;
    
    a00 = self.m00; a01 = self.m01; a02 = self.m02; a03 = self.m03;
    a10 = self.m04; a11 = self.m05; a12 = self.m06; a13 = self.m07;
    a20 = self.m08; a21 = self.m09; a22 = self.m10; a23 = self.m11;
    
    b00 = x * x * t + c; b01 = y * x * t + z * s; b02 = z * x * t - y * s;
    b10 = x * y * t - z * s; b11 = y * y * t + c; b12 = z * y * t + x * s;
    b20 = x * z * t + y * s; b21 = y * z * t - x * s; b22 = z * z * t + c;
    
    self.m00 = a00 * b00 + a10 * b01 + a20 * b02;
    self.m01 = a01 * b00 + a11 * b01 + a21 * b02;
    self.m02 = a02 * b00 + a12 * b01 + a22 * b02;
    self.m03 = a03 * b00 + a13 * b01 + a23 * b02;
    self.m04 = a00 * b10 + a10 * b11 + a20 * b12;
    self.m05 = a01 * b10 + a11 * b11 + a21 * b12;
    self.m06 = a02 * b10 + a12 * b11 + a22 * b12;
    self.m07 = a03 * b10 + a13 * b11 + a23 * b12;
    self.m08 = a00 * b20 + a10 * b21 + a20 * b22;
    self.m09 = a01 * b20 + a11 * b21 + a21 * b22;
    self.m10 = a02 * b20 + a12 * b21 + a22 * b22;
    self.m11 = a03 * b20 + a13 * b21 + a23 * b22;
    
 self.matrix4x4=  Matrix4x4Rotate(self.matrix4x4,rad,axis.x,axis.y,axis.z);
    
}
 -(void) appendScale:(float  )x  y:(float)y z:(float)z;
{
    Matrix3D *tempM=[[Matrix3D alloc]init];
    [tempM prependScale: x y:y z:z];
    [self append:tempM];
}
-(void)prependScale:(float  )x  y:(float)y z:(float)z ;
{
    
    self.m00= self.m00 * x;
    self.m01= self.m01 * x;
    self.m02 = self.m02 * x;
    self.m03 = self.m03 * x;
    self.m04 = self.m04 * y;
    self.m05 = self.m05 * y;
    self.m06 = self.m06 * y;
    self.m07= self.m07 * y;
    self.m08 = self.m08 * z;
    self.m09= self.m09 * z;
    self.m10 =self.m10 * z;
    self.m11=self.m11 * z;
    
    
   self.matrix4x4= Matrix4x4Scale(self.matrix4x4,x,y,z);
    
    
};

@end
