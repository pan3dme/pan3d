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

 

-(void)initData;
-(void)loadTextureResByUrl:(NSString*)value;
-(void)loadObjDataByUrl:(NSString*)url;
-(void)onCreated;
-(void)setVc;
-(void)setVa;
-(void)updateBind;
-(void)registetProgame;
-(void)setObjUrl:(NSString*)value;
-(void)setMaterialUrl:(NSString*)value  paramData:(NSArray*)paramData;
-(void)setMaterialTexture:(Material*)material  mp:(MaterialBaseParam*)mp;
-(void)setBind:(id<IBind>)bindTarget bindSocket:(NSString*)bindSocket;
-(void)setGroup:(Vector3D*)pos rotaion:(Vector3D*)rotaion  scale:(Vector3D*)scale;
@end
NS_ASSUME_NONNULL_END
