//
//  Display3DParticle.m
//  iosgl
//
//  Created by zhao on 23/2/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Display3DParticle.h"
#import "ParticleData.h"

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
