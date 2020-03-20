//
//  Display3DParticle.m
//  iosgl
//
//  Created by zhao on 23/2/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Display3DParticle.h"
#import "ParticleData.h"
#import "DynamicTexItem.h"
#import "Context3D.h"
#import "Shader3D.h"
#import "Scene3D.h"

@implementation Display3DParticle

- (instancetype)init
{
    self = [super init];
    if (self) {
        self._time=0;
        self.visible=YES;
    }
    return self;
}
-(void)onCreated;
{
}
-(void)updateTime:(float)t;
{
    self._time=t;
}
-(void)update;
{
    if(self.visible ){
        if ( self.data.materialParam){
             Context3D *ctx=self.scene3d.context3D;
             glUseProgram(self.data.materialParam.shader.program);
            [ctx setBlendParticleFactors:self.data._alphaMode];
            [ctx cullFaceBack:self.data.materialParam.material.backCull];
            [self updateMatrix];
            [self setVc];
            [self setVa];
            [self resetVa];
        }
        
    }
}
-(void)setMaterialTexture;
{
    if(!self.data.materialParam){
        return;
    }
    Context3D *ctx=self.scene3d.context3D;
    NSArray<TexItem*>* texVec  = self.data.materialParam.material.texList;
    for (int i   = 0; i < texVec.count; i++) {
        if (texVec[i].isDynamic) {
            continue;
        }
        [ctx setRenderTexture:self.data.materialParam.shader name:texVec[i].name texture:  texVec[i].textureRes.textTureLuint level:0];
    }
    NSArray<DynamicTexItem*>* texDynamicVec  =( NSArray<DynamicTexItem*>*) self.data.materialParam.dynamicTexList;
    for (int i   = 0; i < texDynamicVec.count; i++) {
        TexItem* texItem=texDynamicVec[i].target;
         [ctx setRenderTexture:self.data.materialParam.shader name:texDynamicVec[i].target.name  texture:texDynamicVec[i].texture level:texItem.id];
    }
    
     
}
-(void)setVc;
{
}
-(void)setVa;
{
}
-(void)resetVa;
{
}


@end
