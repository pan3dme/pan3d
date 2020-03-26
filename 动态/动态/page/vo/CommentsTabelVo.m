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
    
 
    self.cellHeight=100;
 
}
-(void)resetreplyContent;
{
       CGFloat tw150=130;
    self.replyContent=@"";
    for (int i=0; i<self.sonitem.count; i++) {
        self.replyContent = [self.replyContent stringByAppendingString:self.sonitem[i].nick_name];
        self.replyContent = [self.replyContent stringByAppendingString:@":"];
        self.replyContent = [self.replyContent stringByAppendingString:self.sonitem[i].content];
        if(i<self.sonitem.count-1){
            self.replyContent = [self.replyContent stringByAppendingString:@"\n"];
        }
    }
    CGSize contentSize = [self.content boundingRectWithSize:CGSizeMake(kScreenW-tw150, 200) options:NSStringDrawingUsesLineFragmentOrigin attributes:@{NSFontAttributeName:[UIFont systemFontOfSize:16]}  context:nil].size;
    self.cellHeight=100+contentSize.height;
    
    if(self.replyContent.length){
        CGSize replySize = [self.replyContent boundingRectWithSize:CGSizeMake(kScreenW-tw150-10, 200) options:NSStringDrawingUsesLineFragmentOrigin attributes:@{NSFontAttributeName:[UIFont systemFontOfSize:16]}  context:nil].size;
        self.cellHeight +=replySize.height;
    }
    
    
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
