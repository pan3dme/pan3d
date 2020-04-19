//
//  SkillVo.m
//  iosgl
//
//  Created by zhao on 17/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "SkillVo.h"
#import "SkillType.h"
#import "SkillFixEffectKeyVo.h"
#import "SkillTrajectoryTargetKeyVo.h"

@implementation SkillVo
+(float)defaultBloodTime;
{
    return 250;
}
-(void)setData:(NSMutableDictionary*)info;
{
    SkillVo* this=self;
    this.keyAry=[[NSMutableArray alloc]init];
    this.action = info[@"action"];
    this.skillname = info[@"skillname"];
    this.bloodTime = [info[@"blood"]floatValue];
    this.types =  [info[@"type"]intValue];
    if( this.types==SkillType.FixEffect){
        self.keyAry=[self getFixEffect:info[@"data"]];
    } else if (this.types == SkillType.TrajectoryDynamicTarget || this.types == SkillType.TrajectoryDynamicPoint){
        self.keyAry=[self getTrajectoryDynamicTarget:info[@"data"]];
    }
}

-(NSMutableArray<SkillKeyVo*>*)getTrajectoryDynamicTarget:(NSMutableArray<NSMutableDictionary*>*)arr;
{
    NSMutableArray<SkillKeyVo*>* keyAry=[[NSMutableArray alloc]init];
    for (int i = 0; i < arr.count; i++){
        SkillTrajectoryTargetKeyVo* key= [[SkillTrajectoryTargetKeyVo alloc]init];
        [key setData:arr[i]];
        [keyAry addObject:key];
    }
    
    return keyAry;
}
-(NSMutableArray<SkillKeyVo*>*)getFixEffect:(NSMutableArray<NSMutableDictionary*>*)arr;
{
    NSMutableArray<SkillKeyVo*>* keyAry=[[NSMutableArray alloc]init];
    for (int i = 0; i < arr.count; i++){
        SkillFixEffectKeyVo* key= [[SkillFixEffectKeyVo alloc]init];
        [key setData:arr[i]];
        [keyAry addObject:key];
    }
    
    return keyAry;
}

@end
