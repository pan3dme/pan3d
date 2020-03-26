//
//  CommentsTabelVo.m
//  动态
//
//  Created by zhao on 26/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "CommentsTabelVo.h"
#import "Header.h"

@implementation CommentsTabelVo

-(void)praseData:(NSDictionary *)value;
{
    [self setValueToSelf:value];
    
      CGSize rectSize = [self.content boundingRectWithSize:CGSizeMake(kScreenW-200, 200) options:NSStringDrawingUsesLineFragmentOrigin attributes:@{NSFontAttributeName:[UIFont systemFontOfSize:16]}  context:nil].size;
    
    self.cellHeight=100+rectSize.height;
    
    

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
