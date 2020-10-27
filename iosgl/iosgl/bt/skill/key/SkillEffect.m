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
- (void)addToRender{
    [self.particle addEventListener:BaseEvent.COMPLETE callback:^(NSObject * _Nonnull val, NSObject * _Nonnull event) {
         
    } taget:self ];
}
@end
