//
//  Matrix3D.m
//  iosgl
//
//  Created by zhao on 5/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "Matrix3D.h"


@implementation Matrix3D

- (instancetype)init
{
    self = [super init];
    if (self) {
        _isIdentity=true;
        
        self.m = [NSMutableArray array];
        
        [self.m addObject:@1];
        [self.m addObject:@0];
        [self.m addObject:@0];
        [self.m addObject:@0];
        
        [self.m addObject:@0];
        [self.m addObject:@1];
        [self.m addObject:@0];
        [self.m addObject:@0];
        
        [self.m addObject:@0];
        [self.m addObject:@0];
        [self.m addObject:@1];
        [self.m addObject:@0];
        
        [self.m addObject:@0];
        [self.m addObject:@0];
        [self.m addObject:@0];
        [self.m addObject:@1.3344];
        
      //  [self identity];
        
        NSLog(@"--->%f", [self.m[15] doubleValue]+[self.m[0] doubleValue]);
        
    }
    return self;
}
-(void)identity
{
    _m[0]=@1;
    _m[1]=@0;
    _m[2]=@0;
    _m[3]=@0;
    
    _m[4]=@0;
    _m[5]=@1;
    _m[6]=@0;
    _m[7]=@0;
    
    _m[8]=@0;
    _m[9]=@0;
    _m[10]=@1;
    _m[11]=@0;
    
    _m[12]=@0;
    _m[13]=@0;
    _m[14]=@0;
    _m[15]=@1;
    
    
}
-(void) copyTo  :(Matrix3D  *)$target {
    $target.m[0] = self.m[0];
    $target.m[1] = self.m[1];
    $target.m[2] = self.m[2];
    $target.m[3] = self.m[3];
    $target.m[4] = self.m[4];
    $target.m[5] = self.m[5];
    $target.m[6] = self.m[6];
    $target.m[7] = self.m[7];
    $target.m[8] = self.m[8];
    $target.m[9] = self.m[9];
    $target.m[10] = self.m[10];
    $target.m[11] = self.m[11];
    $target.m[12] = self.m[12];
    $target.m[13] = self.m[13];
    $target.m[14] = self.m[14];
    $target.m[15] = self.m[15];
}
//public prependTranslation(x: number, y: number, z: number): void {
-(void) prependTranslation:(NSNumber * )x  y:(float)y z:(float)z  {
    NSMutableArray *out = self.m;
        out[12] =   x ;
//        out[13] = [out[1]floatValue ] * x + [out[5]floatValue ] * y + [out[9]floatValue ] * z + [out[13]floatValue ];
//        out[14] = [out[2]floatValue ] * x + [out[6] floatValue ]* y + [out[10]floatValue ] * z + [out[14]floatValue ];
//        out[15] = [out[3] floatValue ]* x + [out[7] floatValue ]* y + [out[11] floatValue ]* z + [out[15]floatValue ];

    }

-(int )getddmbte{
    
    int vt[16]=  {
        1,-1,0,0,
        2,2,0,0,
        0,0,1.0,0,
        0,0,0,1.0,
    };
    vt[0]=999.9;
    
    
    return vt[0];
}
@end
