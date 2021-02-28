//
//  MtlModelDisplaySprite.h
//  iosgl
//
//  Created by pan3dme on 2021/1/24.
//  Copyright © 2021 zhao. All rights reserved.
//

#import "Display3D.h"
#import "Material.h"
#import "ObjData.h"
NS_ASSUME_NONNULL_BEGIN

@interface MtlModelDisplaySprite : Display3D
@property (nonatomic, strong) ObjData* objData;
@property (nonatomic, strong) Material* material;
-(void)updata ;
-(void) setInfo:(NSDictionary*)value;
@end

NS_ASSUME_NONNULL_END
