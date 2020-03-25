//
//  CommentsTabelVo.m
//  动态
//
//  Created by zhao on 26/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "CommentsTabelVo.h"

@implementation CommentsTabelVo

-(void)praseData:(NSDictionary *)value;
{
    [self setValueToSelf:value];

}
+(NSMutableArray<CommentsTabelVo*>*)makeListArr:(NSMutableArray*)arr;
{
    NSMutableArray<CommentsTabelVo*>* bitem=[[NSMutableArray alloc]init];
    for(int i=0;i<arr.count;i++){
        CommentsTabelVo* vo=[[CommentsTabelVo alloc]init];
        [vo praseData:arr[i]];
        [bitem addObject:vo];
    }
    return bitem;
}
@end
