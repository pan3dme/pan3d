//
//  Camera3D.h
//  iosgl
//
//  Created by zhao on 30/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "Object3D.h"
#import "Matrix3D.h"

NS_ASSUME_NONNULL_BEGIN

@interface Camera3D : Object3D
 
@property (nonatomic, strong)  Object3D *lookAtTargt;
@property (nonatomic, strong)  Matrix3D *camMatrix3D;
@property (nonatomic, strong)  Matrix3D *viewMatrix;
@property (nonatomic, strong)  Matrix3D *modelMatrix;
@property (nonatomic, assign)  float   distance;
-(void) upFrame  ;
 
@end

NS_ASSUME_NONNULL_END
