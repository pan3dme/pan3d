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

@property(nonatomic,strong)NSMutableArray<NSNumber*>* boneIDAry;
@property(nonatomic,strong)NSMutableArray<NSNumber*>* boneWeightAry;
@property(nonatomic,strong)NSMutableArray<NSNumber*>* boneNewIDAry;

@property(nonatomic,strong)NSMutableArray<NSNumber*>* materialParamData;
@property(nonatomic,strong)MaterialBaseParam* materialParam;
@property(nonatomic,strong)Material* material;
@property(nonatomic,strong)NSString* materialUrl;

@property(nonatomic,assign)GLuint boneWeightBuffer ;
@property(nonatomic,assign)GLuint boneIdBuffer ;
 
@property(nonatomic,assign)float  uid;
@property(nonatomic,assign)float  boneIDOffsets;
@property(nonatomic,assign)float  boneWeightOffsets;
 
@end

@implementation MeshData

@end