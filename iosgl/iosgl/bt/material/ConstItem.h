//
//  ConstItem.h
//  iosgl
//
//  Created by zhao on 9/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "Vector3D.h"
#import "DynamicBaseConstItem.h"
 
@class DynamicBaseConstItem;
NS_ASSUME_NONNULL_BEGIN

@interface ConstItem : NSObject
@property(nonatomic,assign)int id;
@property(nonatomic,strong)NSString* name;
@property(nonatomic,strong)Vector3D* value;
//@property(nonatomic,assign)int vecNum: Float32Array;

@property(nonatomic,strong)NSString*  paramName0;
@property(nonatomic,assign)int param0Type;
@property(nonatomic,assign)int param0Index;

@property(nonatomic,strong)NSString*  paramName1;
@property(nonatomic,assign)int param1Type;
@property(nonatomic,assign)int param1Index;

@property(nonatomic,strong)NSString*  paramName2;
@property(nonatomic,assign)int param2Type;
@property(nonatomic,assign)int param2Index;

@property(nonatomic,strong)NSString*  paramName3;
@property(nonatomic,assign)int param3Type;
@property(nonatomic,assign)int param3Index;

@property(nonatomic,assign)BOOL isDynamic;
@property(nonatomic,assign)int offset;

-(void)setDynamicOffset:(DynamicBaseConstItem*)dynamic;
@end

NS_ASSUME_NONNULL_END
