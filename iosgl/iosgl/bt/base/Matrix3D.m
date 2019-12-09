//
//  Matrix3D.m
//  iosgl
//
//  Created by zhao on 5/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "Matrix3D.h"
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
 
    minfo[0]=_m00;
    minfo[1]=_m01;
    minfo[2]=_m02;
    minfo[3]=_m03;
    minfo[4]=_m04;
    minfo[5]=_m05;
    minfo[6]=_m06;
    minfo[7]=_m07;
    minfo[8]=_m08;
    minfo[9]=_m09;
    minfo[10]=_m10;
    minfo[11]=_m11;
    minfo[12]=_m12;
    minfo[13]=_m13;
    minfo[14]=_m14;
    minfo[15]=_m15;
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
-(void)prependScale:(float  )x  y:(float)y z:(float)z ;
{
    
    _m00= _m00 * x;
    _m01= _m01 * x;
    _m02 = _m02 * x;
    _m03 = _m03 * x;
    _m04 = _m04 * y;
    _m05 = _m05 * y;
    _m06 = _m06 * y;
    _m07= _m07 * y;
    _m08 = _m08 * z;
    _m09= _m09 * z;
    _m10 =_m10 * z;
    _m11=_m11 * z;
    
    
};

@end
