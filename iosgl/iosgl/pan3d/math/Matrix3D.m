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
 
 
        [self prependTranslation:0.5 y:0.5 z:0];
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
    
    GLfloat  *out =  minfo;
    out[12] = out[0] * x + out[4] * y + out[8] * z + out[12];
    out[13] = out[1] * x + out[5] * y + out[9] * z + out[13];
    out[14] = out[2] * x + out[6] * y + out[10] * z + out[14];
    out[15] = out[3] * x + out[7] * y + out[11] * z + out[15];
    
}


@end
