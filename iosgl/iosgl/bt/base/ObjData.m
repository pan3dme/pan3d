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
    
    if( self.vertices&&self.vertices.count){
        self.verticesBuffer=  [self upGpuvertexBuffer:self.vertices];
        self.uvBuffer=  [self upGpuvertexBuffer:self.uvs];
        if(self.uvs&&self.uvs.count){
            self.nrmsBuffer=  [self upGpuvertexBuffer:self.nrms];
        }
        self.indexBuffer=  [self upGpuIndexBuffer:self.indexs];
        self.trinum=(int)self.indexs.count;
    }  else if(self.dataView){
     

        unsigned int Indices[self.indexs.count];
        for(int j=0;j<self.indexs.count;j++)
        {
            Indices[j]=[self.indexs[j]intValue];
        }
        
        glGenBuffers(1, &_indexBuffer);
        glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, self.indexBuffer);
        glBufferData(GL_ELEMENT_ARRAY_BUFFER, sizeof(Indices), Indices, GL_STATIC_DRAW);
        
        
        glGenBuffers(1, &_dataViewBuffer);
        glBindBuffer(GL_ARRAY_BUFFER, self.dataViewBuffer);
        glBufferData(GL_ARRAY_BUFFER, self.dataView.length, self.dataView.bytes,GL_STATIC_DRAW);
   
   
        
    }
    
}
 -(GLuint)upGpuIndexBuffer:(NSArray*)arr;
 {
     unsigned int Indices[arr.count];
     for (int i=0; i<arr.count; i++) {
         Indices[i]=[arr[i] intValue];
     }
     GLuint indexBuffer;
     glGenBuffers(1, &indexBuffer);
     glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, indexBuffer);
     glBufferData(GL_ELEMENT_ARRAY_BUFFER, sizeof(Indices), Indices, GL_STATIC_DRAW);
     return indexBuffer;
 }

 -(GLuint)upGpuvertexBuffer:(NSArray*)arr;
 {
     GLfloat attrArr[arr.count];
     for (int i=0; i<arr.count; i++) {
         attrArr[i]=[arr[i] floatValue];
     }
     GLuint verticesBuffer;
     glGenBuffers(1, &verticesBuffer);
     glBindBuffer(GL_ARRAY_BUFFER, verticesBuffer);
     glBufferData(GL_ARRAY_BUFFER, sizeof(attrArr), attrArr, GL_DYNAMIC_DRAW);
     return verticesBuffer;
 }

@end
