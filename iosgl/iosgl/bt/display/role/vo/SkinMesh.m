//
//  SkinMesh.m
//  iosgl
//
//  Created by zhao on 2/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "SkinMesh.h"
#import "Matrix3D.h"
#import "MeshData.h"
#import "Vector2D.h"
@interface SkinMesh()
@property(nonatomic,strong)NSMutableArray<MeshData*>*  meshAry ;
@property(nonatomic,strong)NSMutableArray<Matrix3D*>*  bindPosMatrixAry;
@property(nonatomic,strong)NSMutableArray<Matrix3D*>*  bindPosInvertMatrixAry;
@property(nonatomic,strong)NSMutableArray<NSString*>*   animUrlAry;
@property(nonatomic,strong)NSMutableArray<NSNumber*>*   lightData;
@property(nonatomic,strong)NSMutableArray<Vector3D*>*   hitPosItem;

@property(nonatomic,strong)NSMutableDictionary* boneSocketDic ;
@property(nonatomic,strong)NSMutableDictionary*  animDic;
@property(nonatomic,strong)NSMutableDictionary*  allParticleDic;
 
@property(nonatomic,strong)Vector2D* hitBox;

@property(nonatomic,assign)float fileScale;
@property(nonatomic,assign)float tittleHeight;
@property(nonatomic,assign)BOOL  ready;
@property(nonatomic,assign)float  type;

 
@end
@implementation SkinMesh

@end
