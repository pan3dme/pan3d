//
//  ObjectWeight.h
//  iosgl
//
//  Created by pan3dme on 2020/11/12.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface ObjectWeight : NSObject
@property(nonatomic,assign)float x;
@property(nonatomic,assign)float y;
@property(nonatomic,assign)float z;
@property(nonatomic,assign)float w;
@property(nonatomic,assign)float  weight;
@property(nonatomic,assign)int  boneId;
@property(nonatomic,assign)int id;
-(ObjectWeight*)clone;
@end

NS_ASSUME_NONNULL_END
