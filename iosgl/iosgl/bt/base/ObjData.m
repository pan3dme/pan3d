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
    if(self.dataView){
     
        /*
        GLfloat attrArr[self.vertices.count+self.uvs.count];
        for(int i=0;i<self.vertices.count/3;i++)
        {
            attrArr[i*5+0]= [self.vertices[i*3+0] floatValue];
            attrArr[i*5+1]=[self.vertices[i*3+1]floatValue];
            attrArr[i*5+2]=[self.vertices[i*3+2]floatValue];
            attrArr[i*5+3]=[self.uvs[i*0+0]floatValue];
            attrArr[i*5+4]=[self.uvs[i*1+1]floatValue];
        }
        
        glGenBuffers(1, &_verticesBuffer);
        glBindBuffer(GL_ARRAY_BUFFER, self.verticesBuffer);
        glBufferData(GL_ARRAY_BUFFER, sizeof(attrArr), attrArr, GL_DYNAMIC_DRAW);
        
        */
        
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
        //self.dataView = [[NSMutableData alloc] initWithLength:1024];
        glBufferData(GL_ARRAY_BUFFER, self.dataView.length, self.dataView.bytes,GL_STATIC_DRAW);
   
        NSLog(@"mData-%lu", self.dataView.length);
        
        //self.dataView.bytes;
        
    }
    
}
 

@end
