//
//  Matrix3D.m
//  iosgl
//
//  Created by zhao on 5/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "Matrix3D.h"
#import <GLKit/GLKit.h>
 

@interface Matrix3D ()
 
//@property (nonatomic, assign) float  m00;//是否为拖动结束
 
@end
@implementation Matrix3D

char* matches[1];
float  minfo[16];
 float t00;
 float t01;
 float t02;
 float t03;
 float t04;
 float t05;
 float t06;
 float t07;
 float t08;
 float t09;
 float t10;
 float t11;
 float t12;
 float t13;
 float t14;
 float t15;
  
- (instancetype)init
{
    self = [super init];
    if (self) {
        _isIdentity=true;
        [self identity];
        
        [self setMtoGl];
    }
    return self;
}
-(void)identity
{
    t00=1;
    t01=0;
    t02=0;
    t03=0;

    t04=0;
    t05=1;
    t06=0;
    t07=0;

    t08=0;
    t09=0;
    t10=1;
    t11=0;

    t12=0;
    t13=0;
    t14=0;
    t15=1;
 
}
-(void) copyTo  :(Matrix3D  *)$target {
   
}
/*
 public prependTranslation(x: number, y: number, z: number): void {
            var out: Float32Array = this.m
            out[12] = out[0] * x + out[4] * y + out[8] * z + out[12];
            out[13] = out[1] * x + out[5] * y + out[9] * z + out[13];
            out[14] = out[2] * x + out[6] * y + out[10] * z + out[14];
            out[15] = out[3] * x + out[7] * y + out[11] * z + out[15];

        }
*/
-(void) prependTranslation:(float  )x  y:(float)y z:(float)z  {
 
    t12 = t00 * x + t04 * y + t08 * z + t12;
    t13 = t01 * x + t05 * y + t09 * z + t13;
    t14 = t02 * x + t06 * y + t10 * z + t14;
    t15 = t03 * x + t07 * y + t11 * z + t15;
    
}
-(void)setMtoGl{
    float vt[16]=  {
        t00,t01,t02,t03,
        t04,t05,t06,t07,
        t08,t09,t10,t11,
        t12,t13,t14,t15
       };
    
    
    [self glUniformMatrix4:vt];
    
}

//-(void)glUniformMatrix4 (GLint location, GLsizei count, GLboolean transpose, const GLfloat* value)
-(void)glUniformMatrix4  :(  float*)value
{
   // lhString=@"ccav";
     value =    [self getbet];
     
     NSLog(@"value---0---%f",value[0]);
     NSLog(@"value---1---%f",value[4]);
     NSLog(@"value---2---%f",value[3]);
     NSLog(@"value---3---%f",value[2]);
     NSLog(@"value---3---%f",value[1]);
     
}

 

-(float* )getbet{
    
    
 //   minfo[0]=2.0f;
     minfo[0]=0.0332;
     minfo[1]=1.111;
     minfo[2]=22.22;
       minfo[3]=3.333;
       minfo[4]=444.4;

    return minfo;
 
}
 
@end
