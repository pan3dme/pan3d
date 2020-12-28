//
//  MeshItem.h
//  iosgl
//
//  Created by pan3dme on 2020/11/12.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "Vector3D.h"
#import "ObjectUv.h"
NS_ASSUME_NONNULL_BEGIN

@interface MeshItem : NSObject
@property(nonatomic,strong)  Vector3D* verts;
@property(nonatomic,strong)  ObjectUv* uvInfo;
@property(nonatomic,assign)  int num;
@end

NS_ASSUME_NONNULL_END
