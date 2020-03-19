//
//  Curve.h
//  iosgl
//
//  Created by zhao on 14/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "CurveVo.h"
NS_ASSUME_NONNULL_BEGIN

@interface Curve : NSObject
@property(nonatomic,assign)int  type;
@property(nonatomic,strong)NSMutableArray<NSMutableArray*>*  valueVec ;
@property(nonatomic,strong)NSMutableArray*  valueV3d;
@property(nonatomic,assign)int  begintFrame;
@property(nonatomic,assign)int  maxFrame;

-(void)setData:(CurveVo*)obj;
@end

NS_ASSUME_NONNULL_END
