//
//  MtkMoveDisplay3D.h
//  iosgl
//
//  Created by pan3dme on 2021/2/2.
//  Copyright © 2021 zhao. All rights reserved.
//

#import "Display3dMovie.h"
 
#import "ObjData.h"
NS_ASSUME_NONNULL_BEGIN

@interface MtkMoveDisplay3D : Display3dMovie

 
@property (nonatomic, strong) Vector3D* colorV3d;


-(void)updata ;
 

@end

NS_ASSUME_NONNULL_END
