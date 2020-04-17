//
//  SkillFixEffect.m
//  iosgl
//
//  Created by zhao on 17/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "SkillFixEffect.h"
#import "SkillFixEffectKeyVo.h"

@implementation SkillFixEffect

- (void)setInfo:(SkillKeyVo *)obj
{
    [super setInfo:obj];
    SkillFixEffect* this=self;
    SkillFixEffectKeyVo* data = (SkillFixEffectKeyVo*)obj;
    this.pos = data.pos;
    this.rotation = data.rotation;
    this.hasSocket = data.hasSocket;
    this.socket = data.socket;
    
}

 

@end
