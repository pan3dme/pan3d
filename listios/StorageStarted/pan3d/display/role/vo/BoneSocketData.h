//
//  BoneSocketData.h
//  iosgl
//
//  Created by zhao on 3/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "Object3D.h"

NS_ASSUME_NONNULL_BEGIN

@interface BoneSocketData : Object3D
@property(nonatomic,strong)NSString* name;
@property(nonatomic,strong)NSString* boneName;
@property(nonatomic,assign)int index;
@end

NS_ASSUME_NONNULL_END
