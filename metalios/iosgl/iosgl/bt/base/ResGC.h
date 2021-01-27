//
//  ResGC.h
//  iosgl
//
//  Created by zhao on 7/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>
@class Scene3D;

NS_ASSUME_NONNULL_BEGIN

@interface ResGC : NSObject
@property (nonatomic, strong)  NSMutableDictionary *dic;
@property (nonatomic, strong)  Scene3D*  mtkScene3D;
- (instancetype)init:(Scene3D*)value;
@end

NS_ASSUME_NONNULL_END
