//
//  SkillTrajectory.h
//  iosgl
//
//  Created by zhao on 17/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "SkillKey.h"
#import "Matrix3D.h"
#import "Vector3D.h"
#import "Object3D.h"
#import "SkillPath.h"
#import "SkillPath.h"
#import "SkillTrajectoryTargetKeyVo.h"

NS_ASSUME_NONNULL_BEGIN

@interface SkillTrajectory : SkillKey

@property(nonatomic,assign)Object3D*  active;
@property(nonatomic,assign)Object3D*  target;

@property(nonatomic,assign)SkillTrajectoryTargetKeyVo*  data;

@property(nonatomic,assign)Vector3D*  _currentPos;
@property(nonatomic,assign)Matrix3D*  rotationMatrix;
@property(nonatomic,assign)Matrix3D*  _socketMaxrix;
@property(nonatomic,assign)Vector3D*  _currentTargetPos;

@property(nonatomic,assign)CombineParticle*  endParticle;

@property(nonatomic,assign)SkillPath*  path;

-(void)update:(float)t;
 
@end

NS_ASSUME_NONNULL_END
