//
//  MeshData.m
//  iosgl
//
//  Created by zhao on 2/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "MeshData.h"
#import "MaterialBaseParam.h"
#import "Material.h"

@interface MeshData()
@property(nonatomic,assign)BOOL isComple;
@end

@implementation MeshData

- (instancetype)init
{
    self = [super init];
    if (self) {
        self.particleAry=[[NSMutableArray alloc]init];
    }
    return self;
}
-(void)upToGpu
{
    if(!self.isComple){
        
        self.verticesBuffer=[self upGpuvertexBuffer:self.vertices];
        self.uvBuffer=[self upGpuvertexBuffer:self.uvs];
        self.boneIdBuffer=[self upGpuvertexBuffer:self.boneIDAry];
        self.boneWeightBuffer=[self upGpuvertexBuffer:self.boneWeightAry];
        
        self.indexBuffer=[self upGpuvertexBuffer:self.indexs];
        self.trinum=(int)self.indexs.count;
        self.isComple=YES;
        
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
