//
//  SkillEffect.m
//  iosgl
//
//  Created by zhao on 17/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "SkillEffect.h"
#import "BaseEvent.h"

@implementation SkillEffect
-(void)addToRender:(ParticleManager*)particleManager
{
    SkillEffect* this=self;
    [super addToRender:particleManager];
    self.eventCallBack=^(NSObject * _Nonnull val, NSObject * _Nonnull event) {
        [this.particle removeEventListener:BaseEvent.COMPLETE callback: this.eventCallBack taget:this ];
        [particleManager removeParticle:this.particle ];
        this.removeCallFun(this);
    };
    [self.particle addEventListener:BaseEvent.COMPLETE callback: self.eventCallBack taget:self ];
}
 
@end
