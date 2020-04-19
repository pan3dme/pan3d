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
