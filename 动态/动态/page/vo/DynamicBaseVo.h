//
//  DynamicBaseVo.h
//  动态
//
//  Created by zhao on 16/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "DynamicTabelVo.h"

NS_ASSUME_NONNULL_BEGIN

@interface DynamicBaseVo : NSObject
@property(nonatomic,strong)DynamicTabelVo* tabelVo;
@property(nonatomic,strong)NSString* usename;
@property(nonatomic,strong)NSString* headUrl;
@property (nonatomic, assign) NSInteger id;
@property (nonatomic, assign) CGFloat cellHeight;

@end

NS_ASSUME_NONNULL_END
