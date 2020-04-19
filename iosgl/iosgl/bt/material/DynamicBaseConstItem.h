//
//  DynamicBaseConstItem.h
//  iosgl
//
//  Created by zhao on 9/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "ConstItem.h"

NS_ASSUME_NONNULL_BEGIN
@class ConstItem;

@interface DynamicBaseConstItem : NSObject

@property(nonatomic,strong)ConstItem* target;
@property(nonatomic,strong)NSString* paramName;
@property(nonatomic,strong)NSMutableArray<NSNumber*>* currentValue;
@property(nonatomic,assign)int targetOffset;
@property(nonatomic,assign)int _type;
-(void)setType:(int)value;
-(int)type;
 
-(void)setTargetInfo:(ConstItem*)target paramName:(NSString*)paramName type:(int)type;
-(void)setCurrentVal:(NSNumber*)x;
-(void)setCurrentVal:(NSNumber*)x y:(NSNumber*)y;
-(void)setCurrentVal:(NSNumber*)x y:(NSNumber*)y z:(NSNumber*)z;
@end

NS_ASSUME_NONNULL_END
