//
//  DynamicBaseVo.m
//  动态
//
//  Created by zhao on 16/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "DynamicBaseVo.h"
#import "DynamicTabelVo.h"

@implementation DynamicBaseVo
- (instancetype)init
{
    self = [super init];
    if (self) {
        self.cellHeight=350.0f;
        
    }
    return self;
}
-(void)praseData:(NSDictionary*)dic
{
    self.tabelVo=[[DynamicTabelVo alloc]init];
    [self.tabelVo refrishData:dic];
 
}
+(NSMutableArray<DynamicBaseVo*>*)makeListArr:(NSMutableArray*)arr;
{
    NSMutableArray<DynamicBaseVo*>* bitem=[[NSMutableArray alloc]init];
    for(int i=0;i<arr.count;i++){
        DynamicBaseVo* vo=[[DynamicBaseVo alloc]init];
        [vo praseData:arr[i]];
        
        [bitem addObject:vo];
    }
    
    return bitem;
}
@end
