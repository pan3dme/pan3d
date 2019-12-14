//
//  Matrix3D.m
//  iosgl
//
//  Created by zhao on 5/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "Matrix3D.h"
#import "Vector3D.h"
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

 

@end

@implementation Matrix3D

GLfloat  minfo[16];

- (instancetype)init
{
    
    self = [super init];
    if (self) {
    
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
    
    
}
-(void)outString{
    
}
-(void) prependTranslation:(float  )x  y:(float)y z:(float)z  {
    
    
    
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
    
    if (abs(len) < 0.000001) { return  ; };
    
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
     
}
-(Matrix3D*)append:(Matrix3D*)matrx3d;
{
    
    return self;
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
    
    
};

@end
