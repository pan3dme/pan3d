//
//  SkillKey.m
//  iosgl
//
//  Created by zhao on 17/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "SkillKey.h"
#import "SkillKeyVo.h"
#import "Scene_data.h"
#import "Scene3D.h"
#import "ParticleManager.h"

@implementation SkillKey
-(void)setInfo:(SkillKeyVo*)obj;
{
    SkillKey* this=self;
    this.time=obj.frame*[Scene_data default].frameTime;
    this.particle=  [ self.scene3D.particleManager    getParticleByte: obj.url];
 
}
-(void)addToRender:(ParticleManager*)particleManager;
{
    SkillKey* this=self;
    if (!this.particle){
            return;
        }
    [this.particle reset];
    this.particle.sceneVisible = true;
    [particleManager addParticle:this.particle];
}
 

@end
