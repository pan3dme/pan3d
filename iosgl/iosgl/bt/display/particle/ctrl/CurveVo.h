//
//  CurveVo.h
//  iosgl
//
//  Created by zhao on 9/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface CurveVo : NSObject
 
@property (nonatomic, assign)  float  type;
@property (nonatomic, assign)  float maxFrame;
@property (nonatomic, assign)  BOOL sideType;
@property (nonatomic, assign)  BOOL speedType;
@property (nonatomic, assign)  BOOL useColorType;

@property (nonatomic, strong)  NSMutableArray* values;
@property (nonatomic, strong)  NSMutableArray* items;
 
@end

NS_ASSUME_NONNULL_END
