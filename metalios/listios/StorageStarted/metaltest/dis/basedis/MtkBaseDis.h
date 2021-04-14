//
//  MtkBaseLine.h
//  iosgl
//
//  Created by pan3dme on 2021/1/23.
//  Copyright © 2021 zhao. All rights reserved.
//

#import "Display3D.h"
#import "ObjData.h"
#import "MtkBaseDisShader.h"
NS_ASSUME_NONNULL_BEGIN

@interface MtkBaseDis : Display3D
 

@property (nonatomic, strong) ObjData* objData;
@property (nonatomic, strong) MtkBaseDisShader* mtkBaseLineShader;
 
@end

NS_ASSUME_NONNULL_END
