//
//  SkinMesh.h
//  iosgl
//
//  Created by zhao on 2/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//
#import "GL_Header.h"
#import "ResCount.h"
#import "Vector2D.h"
#import "MeshData.h"
#import "Matrix3D.h"

NS_ASSUME_NONNULL_BEGIN

@interface SkinMesh : ResCount
@property(nonatomic,strong)Vector2D* hitBox;
@property(nonatomic,assign)float fileScale;
@property(nonatomic,assign)float tittleHeight;
@property(nonatomic,assign)BOOL  ready;
@property(nonatomic,strong)NSMutableDictionary*  allParticleDic;
@property(nonatomic,strong)NSMutableDictionary* boneSocketDic ;
@property(nonatomic,strong)NSMutableArray<Matrix3D*>*  bindPosInvertMatrixAry;
@property(nonatomic,strong)NSMutableArray<Matrix3D*>*  bindPosMatrixAry;
@property(nonatomic,strong)NSMutableArray<MeshData*>*  meshAry ;
-(void)makeHitBoxItem;
-(void)addMesh:(MeshData*)mesh;
-(void)loadMaterial;
-(void)loadMaterial:(SuccessBlock)fun;
-(void)setAction:(NSMutableArray<NSString*>*)actionAry roleUrl:(NSString*)roleUrl;
@end
typedef void (^SkinMeshBfun)(SkinMesh* skinMesh);
NS_ASSUME_NONNULL_END
