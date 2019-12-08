//
//  Matrix3D.m
//  iosgl
//
//  Created by zhao on 5/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "Matrix3D.h"
#import <GLKit/GLKit.h>


 
@implementation Matrix3D
 
GLfloat  minfo[16];
 
- (instancetype)init
{
    self = [super init];
    if (self) {
    
        _isIdentity=true;
        [self identity];
 
    }
    return self;
}
-(GLfloat *)m;{
    return minfo;
}
-(void)identity
{
    
    minfo[0]=1;
    minfo[1]=0;
    minfo[2]=0;
    minfo[3]=0;
    
    minfo[4]=0;
    minfo[5]=1;
    minfo[6]=0;
    minfo[7]=0;
    
    minfo[8]=0;
    minfo[9]=0;
    minfo[10]=1;
    minfo[11]=0;
    
    minfo[12]=0;
    minfo[13]=0;
    minfo[14]=0;
    minfo[15]=1;
    
}
-(void)outString{
    for(int i=0;i<16;i++){
        NSLog(@"%f",minfo[i]);
    }
}
-(void) prependTranslation:(float  )x  y:(float)y z:(float)z  {
    
   // GLfloat  *out =  minfo;
    minfo[12] = minfo[0] * x + minfo[4] * y + minfo[8] * z + minfo[12];
    minfo[13] = minfo[1] * x + minfo[5] * y + minfo[9] * z + minfo[13];
    minfo[14] = minfo[2] * x + minfo[6] * y + minfo[10] * z + minfo[14];
    minfo[15] = minfo[3] * x + minfo[7] * y + minfo[11] * z + minfo[15];
    
}
-(void)prependScale:(float  )x  y:(float)y z:(float)z ;
{
 
    GLfloat  *a =  minfo;
GLfloat  *out =  minfo;

            out[0] = a[0] * x;
            out[1] = a[1] * x;
            out[2] = a[2] * x;
            out[3] = a[3] * x;
            out[4] = a[4] * y;
            out[5] = a[5] * y;
            out[6] = a[6] * y;
            out[7] = a[7] * y;
            out[8] = a[8] * z;
            out[9] = a[9] * z;
            out[10] = a[10] * z;
            out[11] = a[11] * z;
            out[12] = a[12];
            out[13] = a[13];
            out[14] = a[14];
            out[15] = a[15];
         
        };

@end
