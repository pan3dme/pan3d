//
//  DynamicBaseTexItem.h
//  iosgl
//
//  Created by zhao on 9/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "TextureRes.h"
#import "TexItem.h"

NS_ASSUME_NONNULL_BEGIN

@interface DynamicBaseTexItem : NSObject
@property (nonatomic, strong)  NSString* paramName;
@property (nonatomic, strong)  TexItem* target;
@property (nonatomic, strong)  TextureRes* textureRes;
 
-(void)creatTextureByCurve;
@end

NS_ASSUME_NONNULL_END
