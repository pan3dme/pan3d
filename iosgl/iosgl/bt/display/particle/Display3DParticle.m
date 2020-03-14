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
        [self updateMatrix];
        [self setVc];
        [self setVa];
        [self resetVa];
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
        [ctx setRenderTexture:self.data.materialParam.shader name:texVec[i].name texture:  texVec[i].textureRes.textTureLuint];
    }
    NSArray<DynamicTexItem*>* texDynamicVec  = self.data.materialParam.dynamicTexList;
    for (int i   = 0; i < texDynamicVec.count; i++) {
          [ctx setRenderTexture:self.data.materialParam.shader name:texDynamicVec[i].target.name texture:  texDynamicVec[i].textureRes.textTureLuint];
        // Scene_data.context3D.setRenderTexture(this.data.materialParam.shader, texDynamicVec[i].target.name, texDynamicVec[i].texture, texDynamicVec[i].target.id,true);
    }
    
    /*
     var texVec: Array<TexItem> = this.data.materialParam.material.texList;
        for (var i: number = 0; i < texVec.length; i++) {
            if (texVec[i].isDynamic) {
                continue;
            }
            //_context3D.setTextureAt(texVec[i].id, texVec[i].texture);
            Scene_data.context3D.setRenderTexture(this.data.materialParam.shader, texVec[i].name, texVec[i].texture, texVec[i].id,true);
        }

        var texDynamicVec: Array<DynamicTexItem> = this.data.materialParam.dynamicTexList;
        for (var i:number = 0; i < texDynamicVec.length; i++) {
           // _context3D.setTextureAt(texDynamicVec[i].target.id, texDynamicVec[i].texture);
            Scene_data.context3D.setRenderTexture(this.data.materialParam.shader, texDynamicVec[i].target.name, texDynamicVec[i].texture, texDynamicVec[i].target.id,true);
        }
     */
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
