//
//  SkillKey.h
//  iosgl
//
//  Created by zhao on 17/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "SkillKeyVo.h"
#import "ParticleManager.h"
#import "CombineParticle.h"
#import "GC.h"


NS_ASSUME_NONNULL_BEGIN

@interface SkillKey : GC
typedef void (^SkillKeyBfun)(SkillKey* skillKey);
@property(nonatomic,assign)float time ;
@property(nonatomic,strong)CombineParticle*  particle;
@property(nonatomic,strong)SkillKeyBfun  removeCallFun;
-(void)addToRender:(ParticleManager*)particleManager;
-(void)setInfo:(SkillKeyVo*)obj;
@end

NS_ASSUME_NONNULL_END
