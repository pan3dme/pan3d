//
//  DisplayTestSprite.m
//  iosgl
//
//  Created by zhao on 16/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "DisplayTestSprite.h"
#import "DisplayTestShader.h"
#import "ProgrmaManager.h"
#import "TextureManager.h"
#import "Scene_data.h"
#import "Context3D.h"
#import "TextureRes.h"
#import "Scene3D.h"

@implementation DisplayTestSprite
-(void)registetProgame;
{
    [[ProgrmaManager default] registe:DisplayTestShader.shaderStr shader3d: [[DisplayTestShader alloc]init]];
    self.shader3d=  [[ProgrmaManager default] getProgram:DisplayTestShader.shaderStr];
}
-(void)initData;
{
    [super initData];
    
    NSString* picurl=@"content/particleresources/textures/halo/hl_yxqy_01.png";
    picurl=@"content/particleresources/textures/pattern/pa_fazhen_06.jpg";
    picurl=@"content/particleresources/textures/smoke/sm_yawu_00.jpg";
    picurl=@"content/particleresources/textures/halo/hl__ptc_001.jpg";
    
    [[ TextureManager default]getTexture:[[Scene_data default]getWorkUrlByFilePath:picurl] fun:^(NSObject * _Nonnull any) {
        self.textureRes=(TextureRes*)any;
    } wrapType:0 info:nil filteType:0 mipmapType:0];
}
- (void)upFrame
{
    if(self.textureRes){
        [super upFrame];
    }
    
}
- (void)setVa;
{
    [super setVa];
    Context3D *ctx=self.mtkScene3D.context3D;
    [ctx setRenderTexture:self.shader3d name:@"fs0"  texture:self.textureRes.textTureLuint level:0];
    
}

@end
