//
//  MeshData.h
//  iosgl
//
//  Created by zhao on 2/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "ObjData.h"
#import "Material.h"
#import "Matrix3D.h"
#import "MaterialBaseParam.h"
#import "BindParticle.h"

NS_ASSUME_NONNULL_BEGIN

@interface MeshData : ObjData
@property (nonatomic, copy)  NSArray  *tangents;
@property (nonatomic, copy)  NSArray  *bitangents;
@property (nonatomic, copy)  NSArray  *boneIDAry;
@property (nonatomic, copy)  NSArray  *boneWeightAry;
@property (nonatomic, copy)  NSArray<NSNumber*>* boneNewIDAry;
@property (nonatomic, strong)  NSMutableArray<NSMutableArray<NSNumber*>*>* bindPosAry;
  
@property(nonatomic,strong)MaterialBaseParam* materialParam;
@property(nonatomic,strong)NSString* materialUrl;
@property(nonatomic,strong)Material* material;

@property(nonatomic,strong)NSArray<NSDictionary*>* materialParamData;
@property(nonatomic,strong)NSArray<Matrix3D*>* invertAry;

@property(nonatomic,assign)GLuint boneWeightBuffer ;
@property(nonatomic,assign)GLuint boneIdBuffer ;
@property(nonatomic,assign)int  boneIDOffsets;
@property(nonatomic,assign)int  boneWeightOffsets;
@property(nonatomic,assign)int  uid;

@property(nonatomic,strong)NSMutableArray<BindParticle*>*  particleAry;


@property (nonatomic, strong) id<MTLBuffer> mtkboneWeight;
@property (nonatomic, strong) id<MTLBuffer> mtkboneId;
 
@end

NS_ASSUME_NONNULL_END
