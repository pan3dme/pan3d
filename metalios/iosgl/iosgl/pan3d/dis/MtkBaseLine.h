//
//  MtkBaseLine.h
//  iosgl
//
//  Created by pan3dme on 2021/1/23.
//  Copyright © 2021 zhao. All rights reserved.
//

#import "Display3D.h"
#import "ObjData.h"
NS_ASSUME_NONNULL_BEGIN

@interface MtkBaseLine : Display3D
@property (nonatomic, strong)  MtkScene3D*   mtkScene3D;
@property (nonatomic, strong) ObjData* objData;

- (instancetype)init:(MtkScene3D*)val;
-(void)updata ;
@end

NS_ASSUME_NONNULL_END
