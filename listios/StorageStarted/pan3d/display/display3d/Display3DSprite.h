//
//  Display3DSprite.h
//  iosgl
//
//  Created by zhao on 7/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "Display3D.h"
#import "TextureRes.h"
#import "Shader3D.h"
#import "ObjData.h"
#import "IBind.h"
#import "Material.h"
#import "MaterialBaseParam.h"

NS_ASSUME_NONNULL_BEGIN

@interface Display3DSprite : Display3D
@property (nonatomic, strong) TextureRes *textureRes;
@property (nonatomic, strong) Shader3D *shader3d;
@property (nonatomic, strong) ObjData *objData;
@property (nonatomic, assign) BOOL  dynamic;

@property (nonatomic, strong) Matrix3D *bindMatrix;
@property (nonatomic, strong) id<IBind> bindTarget;
@property (nonatomic, strong) NSString *bindSocket;
@property (nonatomic, strong) Matrix3D *groupMatrix;
@property (nonatomic, strong) Matrix3D *groupRotationMatrix;
@property (nonatomic, strong) Material* material;
@property (nonatomic, assign) BOOL isInGroup;

-(void)initData;
-(void)loadTextureResByUrl:(NSString*)value;
-(void)loadObjDataByUrl:(NSString*)url;
-(void)onCreated;
-(void)setVc;
-(void)setVa;
-(void)updateBind;
-(void)setMaterialVa;
-(void)setObjUrl:(NSString*)value;
-(void)setPicUrl:(NSString*)value;
-(void)setMaterialUrl:(NSString*)value  paramData:(NSArray*)paramData;
-(void)setMaterialVc:(Material*)material  mp:(MaterialBaseParam*)mp;
-(void)setMaterialTexture:(Material*)material  mp:(MaterialBaseParam*)mp;
-(void)setBind:(id<IBind>)bindTarget bindSocket:(NSString*)bindSocket;
-(void)setGroup:(Vector3D*)pos rotaion:(Vector3D*)rotaion  scale:(Vector3D*)scale;
@end
NS_ASSUME_NONNULL_END
