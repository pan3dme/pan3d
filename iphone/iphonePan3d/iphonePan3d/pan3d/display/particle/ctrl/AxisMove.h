//
//  AxisMove.h
//  iosgl
//
//  Created by zhao on 31/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "BaseAnim.h"
#import "Vector3D.h"

NS_ASSUME_NONNULL_BEGIN

@interface AxisMove : BaseAnim
@property(nonatomic,strong)Vector3D* axis;
@end

NS_ASSUME_NONNULL_END
