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
        self.verticesBuffer=  [self upGpuvertexBuffer:self.vertices];
        self.uvBuffer=  [self upGpuvertexBuffer:self.uvs];
//        self.boneIdBuffer=  [self upGpuvertexBuffer:self.boneIDAry];
//        self.boneWeightBuffer=  [self upGpuvertexBuffer:self.boneWeightAry];
        self.indexBuffer=  [self upGpuIndexBuffer:self.indexs];
        self.trinum=(int)self.indexs.count;
    }
    self.compressBuffer=YES;
}
@end
