//
//  Md5MeshData.m
//  iosgl
//
//  Created by pan3dme on 2020/11/12.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Md5MeshData.h"

@implementation Md5MeshData


-(void)upToGpu;
{
    if(self.compressBuffer){
        return;
    }
    if( self.vertices&&self.vertices.count){
//        self.verticesBuffer=  [self upGpuvertexBuffer:self.vertices];
//        self.uvBuffer=  [self upGpuvertexBuffer:self.uvs];
//        self.boneIdBuffer=  [self upGpuvertexBuffer:self.boneIDAry];
//        self.boneWeightBuffer=  [self upGpuvertexBuffer:self.boneWeightAry];
//        self.indexBuffer=  [self upGpuIndexBuffer:self.indexs];
//        self.trinum=(int)self.indexs.count;
        
     
 
        self.mtkvertices= [self.scene3D.context3D changeDataToGupMtkfloat3:self.vertices ];
        self.mtkuvs= [self.scene3D.context3D changeDataToGupMtkfloat2:self.uvs ];
        self.mtkboneId= [self.scene3D.context3D changeDataToGupMtkfloat4:self.boneIDAry ];
        self.mtkboneWeight= [self.scene3D.context3D changeDataToGupMtkfloat4:self.boneWeightAry ];
        self.mtkindexs= [self.scene3D.context3D changeObjDataIndexToMtkGpu:self.indexs];
        self.mtkindexCount = self.indexs.count;
    }
    self.compressBuffer=YES;
}
@end
