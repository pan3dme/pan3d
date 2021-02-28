//
//  ObjData.m
//  iosgl
//
//  Created by zhao on 7/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "ObjData.h"
//#import "../../metail/LYShaderTypes.h"
 

@implementation ObjData
-(void)upToGpu;
{
    if(self.compressBuffer){
        return;
    }
    
    self.mtkindexs= [self.scene3D.context3D changeObjDataIndexToMtkGpu:self.indexs];
    self.mtkvertices= [self.scene3D.context3D changeDataToGupMtkfloat4_copy:self.vertices ];
    self.mtkuvs=[self.scene3D.context3D changeDataToGupMtkfloat2:self.uvs];
    if( self.lightuvs&&self.lightuvs.count){
        self.mtklightuvs=[self.scene3D.context3D changeDataToGupMtkfloat2:self.lightuvs];
    }
    self.mtkindexCount = self.indexs.count;
    
    self.compressBuffer=YES;
}
 -(GLuint)upGpuIndexBuffer:(NSArray*)arr;
 {

 
     return 0;
 }

 -(GLuint)upGpuvertexBuffer:(NSArray*)arr;
 {

   
     return 0;
 }
  
 
 
//顶点
 

 


@end
