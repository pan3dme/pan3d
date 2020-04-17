//
//  SkillKey.h
//  iosgl
//
//  Created by zhao on 17/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "SkillKeyVo.h"
 
#import "CombineParticle.h"


NS_ASSUME_NONNULL_BEGIN

@interface SkillKey : NSObject
typedef void (^SkillKeyBfun)(SkillKey* skillKey);
@property(nonatomic,assign)float time ;
@property(nonatomic,assign)CombineParticle*  particle;
@property(nonatomic,assign)SkillKeyBfun  removeCallFun;

-(void)setInfo:(SkillKeyVo*)obj;
@end

NS_ASSUME_NONNULL_END
