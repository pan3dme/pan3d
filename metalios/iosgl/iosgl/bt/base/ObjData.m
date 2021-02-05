//
//  ObjData.m
//  iosgl
//
//  Created by zhao on 7/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "ObjData.h"
#import "../../metail/LYShaderTypes.h"
#import "../../pan3d/dis//model/MtlModelDisplayType.h"

@implementation ObjData
-(void)upToGpu;
{
    if(self.compressBuffer){
        return;
    }
    
    if( self.vertices&&self.vertices.count){
        self.verticesBuffer=  [self upGpuvertexBuffer:self.vertices];
        self.uvBuffer=  [self upGpuvertexBuffer:self.uvs];
        if(self.lightuvs&&self.lightuvs.count){
            self.lightuvsBuffer=  [self upGpuvertexBuffer:self.lightuvs];
        }
        if(self.nrms&&self.nrms.count){
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
    self.compressBuffer=YES;
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
 

-(void)makeTempObjData
{
    static const LYVertex quadVertices[] =
    {  // 顶点坐标                          顶点颜色                    纹理坐标
        {{-0.5f, 0.5f, 0.0f, 1.0f},      {0.0f, 0.0f, 0.5f},       {0.0f, 1.0f}},//左上
        {{0.5f, 0.5f, 0.0f, 1.0f},       {0.0f, 0.5f, 0.0f},       {1.0f, 1.0f}},//右上
        {{-0.5f, -0.5f, 0.0f, 1.0f},     {0.5f, 0.0f, 1.0f},       {0.0f, 0.0f}},//左下
        {{0.5f, -0.5f, 0.0f, 1.0f},      {0.0f, 0.0f, 0.5f},       {1.0f, 0.0f}},//右下
        {{0.0f, 0.0f, 1.0f, 1.0f},       {1.0f, 1.0f, 1.0f},       {0.5f, 0.5f}},//顶点
    };
    self.mtkvertices = [self.scene3D.mtkView.device newBufferWithBytes:quadVertices
                                                 length:sizeof(quadVertices)
                                                options:MTLResourceStorageModeShared];
    static int indices[] =
    { // 索引
        0, 3, 2,
        0, 1, 3,
        0, 2, 4,
        0, 4, 1,
        2, 3, 4,
        1, 4, 3,
    };
    self.mtkindexs = [self.scene3D.mtkView.device newBufferWithBytes:indices
                                                     length:sizeof(indices)
                                                    options:MTLResourceStorageModeShared];
    self.mtkindexCount = sizeof(indices) / sizeof(int);
}

-(void)changeObjDataToMtkGpu ;
{
 
    self.mtkindexs= [self.scene3D.context3D changeObjDataIndexToMtkGpu:self.indexs];
    self.mtkvertices= [self.scene3D.context3D changeDataToGupMtkfloat4:self.vertices ];
    self.mtkuvs=[self.scene3D.context3D changeDataToGupMtkfloat2:self.uvs];
    if( self.lightuvs&&self.lightuvs.count){
        self.mtklightuvs=[self.scene3D.context3D changeDataToGupMtkfloat2:self.lightuvs];
    }
    self.mtkindexCount = self.indexs.count;
}
 
//顶点
 

 


@end
