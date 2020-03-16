//
//  DynamicBaseVo.h
//  动态
//
//  Created by zhao on 16/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "DynamicTabelVo.h"
#import "DynamicBaseVo.h"

NS_ASSUME_NONNULL_BEGIN

@interface DynamicBaseVo : NSObject
@property(nonatomic,strong)DynamicTabelVo* tabelVo;
@property (nonatomic, assign) CGFloat cellHeight;
-(NSString*)nick_name;
-(NSString*)content;
-(NSString*)headurl;
-(NSMutableArray<NSString*>*)images;
-(NSMutableArray<NSString*>*)miniimages;
+(NSMutableArray<DynamicBaseVo*>*)makeListArr:(NSMutableArray*)arr;
@end

NS_ASSUME_NONNULL_END
