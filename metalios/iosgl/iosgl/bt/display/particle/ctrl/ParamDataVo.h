//
//  ParamDataVo.h
//  iosgl
//
//  Created by zhao on 9/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "CurveVo.h"

NS_ASSUME_NONNULL_BEGIN


@interface ParamDataVo : NSObject
@property (nonatomic, strong)  NSString* paramName;
@property (nonatomic, assign)  BOOL isParticleColor;
@property (nonatomic, strong)  NSString* url;
@property (nonatomic, strong)  CurveVo* curve;
 
@end


NS_ASSUME_NONNULL_END
