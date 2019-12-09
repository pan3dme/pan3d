//
//  ObjData.m
//  iosgl
//
//  Created by zhao on 7/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "ObjData.h"

@implementation ObjData
-(void)upToGpu;
{
    float whf=1.0;
    GLfloat attrArr[] = {
        
        whf, -whf, 0.0f,     1.0f, 0.0f,
        -whf, whf, 0.0f,     0.0f, 1.0f,
        -whf, -whf, 0.0f,    0.0f, 0.0f,
        whf, whf, 0.0f,      1.0f, 1.0f,
        -whf, whf, 0.0f,     0.0f, 1.0f,
        whf, -whf, 0.0f,     1.0f, 0.0f,
    };
    
 
  
   
    glGenBuffers(1, &_verticesBuffer);
    glBindBuffer(GL_ARRAY_BUFFER, _verticesBuffer);
    glBufferData(GL_ARRAY_BUFFER, sizeof(attrArr), attrArr, GL_DYNAMIC_DRAW);
}

@end
