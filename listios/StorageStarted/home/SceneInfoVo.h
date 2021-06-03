//
//  SceneInfoVo.h
//  iosgl
//
//  Created by pan3dme on 2021/3/29.
//  Copyright © 2021 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

 

@interface SceneInfoVo : NSObject
@property (nonatomic, assign) int id; //1场景 2特效果 3角色
@property (nonatomic, assign) int type;
@property (nonatomic, copy) NSString *text;
@property (nonatomic, copy) NSDictionary *info;
@property (nonatomic, copy) NSDictionary *data;//原始数据
- (instancetype)init:(NSDictionary*)val;
@end

NS_ASSUME_NONNULL_END
