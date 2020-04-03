//
//  AnimData.h
//  iosgl
//
//  Created by zhao on 3/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "Vector3D.h"
#import "Matrix3D.h"
#import "DualQuatFloat32Array.h"

NS_ASSUME_NONNULL_BEGIN

@interface AnimData : NSObject
@property(nonatomic,assign)int inLoop;
@property(nonatomic,assign)int  nameHeight;
@property(nonatomic,assign)BOOL  hasProcess;
@property(nonatomic,strong)NSMutableArray<NSNumber*>*  inter;
@property(nonatomic,strong)NSMutableArray<Vector3D*>*    bounds;
@property(nonatomic,strong)NSMutableArray<Vector3D*>*    posAry;
@property(nonatomic,strong)NSMutableArray<NSMutableArray<Matrix3D*>*>*    matrixAry;
@property(nonatomic,strong)NSMutableArray<NSMutableArray<DualQuatFloat32Array*>*>*    boneQPAry;

@end

NS_ASSUME_NONNULL_END
