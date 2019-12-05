//
//  GLSpriteView.h
//  iosgl
//
//  Created by zhao on 4/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "Matrix3D.h"

NS_ASSUME_NONNULL_BEGIN

@interface GLSpriteView : UIView
@property (nonatomic, assign)  Matrix3D *posMatrix3d;
@end

NS_ASSUME_NONNULL_END
