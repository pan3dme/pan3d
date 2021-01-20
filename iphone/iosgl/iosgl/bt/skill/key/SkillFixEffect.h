//
//  SkillFixEffect.h
//  iosgl
//
//  Created by zhao on 17/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "SkillEffect.h"
#import "Vector3D.h"

NS_ASSUME_NONNULL_BEGIN

@interface SkillFixEffect : SkillEffect
@property(nonatomic,strong)Vector3D* pos;
@property(nonatomic,strong)Vector3D* rotation;
@property(nonatomic,strong)Vector3D* outPos;
@property(nonatomic,assign)BOOL hasSocket;
@property(nonatomic,strong)NSString* socket;
@end

NS_ASSUME_NONNULL_END
