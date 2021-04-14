//
//  GridLineSprite.h
//  iosgl
//
//  Created by zhao on 6/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "LineDisplaySprite.h"
 

NS_ASSUME_NONNULL_BEGIN

@interface GridLineSprite : Display3D


@property (nonatomic, strong) ObjData* objData;
@property (nonatomic, strong) Vector3D* colorV3d;


 
-(void)clearLine;
-(void)addLineA2B:(Vector3D*)a b:(Vector3D*)b;
@end

NS_ASSUME_NONNULL_END
