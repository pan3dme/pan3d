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
        
 
        double x[] = {1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1};
        
 
     
        
        
        self.m = @[@(9.99)];
        
    }
    return self;
}

-(GLfloat  )getddm{
    
    //需求：旋转10度 -> 弧度
    float rotate = 10 * 3.141592f /180.0f;
    
    //旋转的矩阵公式
    float s = sin(rotate);
    float c = cos(rotate);
    
    //构建旋转的矩阵公式
    GLfloat zRotation[16]={
        c,-s,0,0,
        s,c,0,0,
        0,0,1.0,0,
        0,0,0,1.0,
    };
    
    return zRotation[1];
}
 
@end
