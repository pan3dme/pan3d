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

NS_ASSUME_NONNULL_BEGIN

@interface Display3DSprite : Display3D
@property (nonatomic, strong) TextureRes *textureRes;
@property (nonatomic, strong) Shader3D *shader3d;
@property (nonatomic, strong) ObjData *objData;
 
-(void)makeShader;
-(void)loadTextureResByUrl:(NSString*)value;
-(void)loadObjDataByUrl:(NSString*)url;
@end
NS_ASSUME_NONNULL_END
