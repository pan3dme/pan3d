//
//  MtkMoveDisplay3D.h
//  iosgl
//
//  Created by pan3dme on 2021/2/2.
//  Copyright © 2021 zhao. All rights reserved.
//

#import "Display3D.h"
 
#import "ObjData.h"
NS_ASSUME_NONNULL_BEGIN

@interface MtkMoveDisplay3D : Display3D

@property (nonatomic, strong) ObjData* objData;
@property (nonatomic, strong) Vector3D* colorV3d;


-(void)updata ;
-(void)clearLine;
-(void)addLineA2B:(Vector3D*)a b:(Vector3D*)b;

@end

NS_ASSUME_NONNULL_END
