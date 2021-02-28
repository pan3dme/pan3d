//
//  ObjectBaseBone.h
//  iosgl
//
//  Created by zhao on 3/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface ObjectBaseBone : NSObject
@property(nonatomic,assign)int father;
@property(nonatomic,assign)float  tx;
@property(nonatomic,assign)float  ty;
@property(nonatomic,assign)float  tz;
@property(nonatomic,assign)float  qx;
@property(nonatomic,assign)float  qy;
@property(nonatomic,assign)float  qz;
@property(nonatomic,assign)float  qw;
@end

NS_ASSUME_NONNULL_END
