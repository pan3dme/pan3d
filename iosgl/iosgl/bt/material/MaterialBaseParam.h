//
//  MaterialBaseParam.h
//  iosgl
//
//  Created by zhao on 9/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "Material.h"

NS_ASSUME_NONNULL_BEGIN
 
@interface MaterialBaseParam : NSObject
@property (nonatomic, strong)  Material*  material;
@property (nonatomic, strong)  NSMutableArray*  dynamicTexList;
@property (nonatomic, strong)  NSMutableArray*  dynamicConstList;

@end

NS_ASSUME_NONNULL_END
