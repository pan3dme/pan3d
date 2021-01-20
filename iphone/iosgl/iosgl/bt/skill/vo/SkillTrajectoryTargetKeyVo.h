//
//  SkillTrajectoryTargetKeyVo.h
//  iosgl
//
//  Created by zhao on 17/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "SkillKeyVo.h"
#import "Vector3D.h"

NS_ASSUME_NONNULL_BEGIN

@interface SkillTrajectoryTargetKeyVo : SkillKeyVo
@property(nonatomic,assign)int beginType;
@property(nonatomic,strong)NSString* beginSocket;
@property(nonatomic,strong)Vector3D* beginPos;
@property(nonatomic,strong)NSString* hitSocket;
@property(nonatomic,strong)NSString* endParticleUrl;
@property(nonatomic,assign)float speed;
@property(nonatomic,assign)int multype;
@end

NS_ASSUME_NONNULL_END
