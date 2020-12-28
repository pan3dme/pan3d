//
//  MaterialBaseParam.h
//  iosgl
//
//  Created by zhao on 9/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "Material.h"
 
#import "DynamicBaseTexItem.h"

NS_ASSUME_NONNULL_BEGIN
@class DynamicTexItem;
@interface MaterialBaseParam : NSObject
@property (nonatomic, strong)  Material*  material;
@property (nonatomic, strong)  NSMutableArray<DynamicTexItem*>*  dynamicTexList;
@property (nonatomic, strong)  NSMutableArray*  dynamicConstList;
 
-(void)setData:(Material*)material ary:(NSArray<NSDictionary*>*)ary;
-(void)update;
@end

NS_ASSUME_NONNULL_END
