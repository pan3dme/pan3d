//
//  SkillKey.m
//  iosgl
//
//  Created by zhao on 17/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "SkillKey.h"
#import "SkillKeyVo.h"
#import "ParticleManager.h"

@implementation SkillKey
-(void)setInfo:(SkillKeyVo*)obj;
{
    
}
-(void)addToRender;
{
    SkillKey* this=self;
    if (!this.particle){
            return;
        }
    [this.particle reset];
    this.particle.sceneVisible = true;
    [[ParticleManager default] addParticle:this.particle];
}
/*
public addToRender(): void {
       if (!this.particle){
           return;
       }
       this.particle.reset();
       this.particle.sceneVisible = true

       ParticleManager.getInstance().addParticle(this.particle);
   }
*/
@end
