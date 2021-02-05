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

- (instancetype)init:value
{
    self = [super init:value];
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
        self.indexBuffer=[self upGpuIndexBuffer:self.indexs];
        self.trinum=(int)self.indexs.count;
        self.isComple=YES;
        
    }
}

-(GLuint)upGpuIndexBuffer:(NSArray*)arr;
{
  
    return nil;
}

-(GLuint)upGpuvertexBuffer:(NSArray*)arr;
{
 
    return nil;
}
-(void)changeObjDataToMtkGpu ;
{
    
}


@end
