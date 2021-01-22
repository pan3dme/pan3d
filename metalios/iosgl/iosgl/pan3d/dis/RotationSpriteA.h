//
//  RotationSpriteA.h
//  iosgl
//
//  Created by pan3dme on 2021/1/22.
//  Copyright © 2021 zhao. All rights reserved.
//

#import "Display3D.h"
 
#import "ObjData.h"
@class  MtkScene3D;
NS_ASSUME_NONNULL_BEGIN

@interface RotationSpriteA : Display3D
@property (nonatomic, strong)  MtkScene3D*   mtkScene3D;
@property (nonatomic, strong) ObjData* objData;

- (instancetype)init:(MtkScene3D*)val;
-(void)updata ;
@end

NS_ASSUME_NONNULL_END
