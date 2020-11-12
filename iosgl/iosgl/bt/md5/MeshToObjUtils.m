//
//  MeshToObjUtils.m
//  iosgl
//
//  Created by pan3dme on 2020/11/12.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "MeshToObjUtils.h"
#import "TimeUtil.h"
static MeshToObjUtils *instance = nil;
@implementation MeshToObjUtils
+ (instancetype)default{
    if (instance == nil) {
        instance = [[MeshToObjUtils alloc] init];
    }
    return instance;
}
-(NSArray*)getStorNewTargerArr:(NSArray*)targetAry
{
    NSMutableArray* newTargetAry  = [[NSMutableArray alloc] init];
    for (int i = 0; i < targetAry.count; i++) {
       NSUInteger idx= [newTargetAry indexOfObject: targetAry[i]];
        if ( idx>newTargetAry.count) {
            [newTargetAry addObject:targetAry[i]];
        }
    }
    return newTargetAry;
 
}
@end
