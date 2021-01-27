//
//  GC.h
//  iosgl
//
//  Created by pan3dme on 2021/1/27.
//  Copyright © 2021 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>
@class Scene3D;
NS_ASSUME_NONNULL_BEGIN

@interface GC : NSObject
@property (nonatomic, strong)  Scene3D*  mtkScene3D;
- (instancetype)init:(Scene3D*)value;
@end

NS_ASSUME_NONNULL_END
