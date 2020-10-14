//
//  BaseAnim.h
//  iosgl
//
//  Created by zhao on 31/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface BaseAnim : NSObject
 
@property(nonatomic,assign)float baseNum;
@property(nonatomic,assign)float num;
@property(nonatomic,assign)float time;
@property(nonatomic,assign)float speed;
@property(nonatomic,assign)float  aSpeed;
@property(nonatomic,assign)float beginTime;
@property(nonatomic,assign)float  lastTime;
@property(nonatomic,assign)float  baseTime;
@property(nonatomic,assign)BOOL  isDeath;
@property(nonatomic,assign)BOOL  isActiva;
 -(void)reset;
-(void)dataByte:(NSArray<NSNumber*>*)va arr:(NSArray<NSNumber*>*)arr;
-(void)update:(float)t;
@end

NS_ASSUME_NONNULL_END
