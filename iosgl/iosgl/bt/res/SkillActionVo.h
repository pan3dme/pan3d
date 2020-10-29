//
//  SkillActionVo.h
//  iosgl
//
//  Created by zhao on 29/10/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "DataObjTempVo.h"
#import "ShockAryVo.h"

NS_ASSUME_NONNULL_BEGIN

@interface SkillActionVo : NSObject
@property (nonatomic, strong)  NSString* skillname;
@property (nonatomic, strong)  NSDictionary* sound;
@property (nonatomic, strong)  NSString*action;
@property (nonatomic, assign)  int type;
@property (nonatomic, assign) int blood;
@property(nonatomic,strong)NSMutableArray<ShockAryVo*>*  shock;
@property(nonatomic,strong)NSMutableArray<DataObjTempVo*>* data;
@end

NS_ASSUME_NONNULL_END
