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
-(NSString*)nick_name;
{
    return  self.tabelVo.nick_name;
}
-(NSString*)content;
{
    return  self.tabelVo.content;
}
-(NSMutableArray<NSString*>*)miniimages;
{
    NSString *rootUrl=@"http://34.87.12.20:20080";
    NSMutableArray<NSString*> *arr=[[NSMutableArray alloc]init];
    [arr addObject:[ NSString stringWithFormat:@"%@/%@_mini.jpg",rootUrl,self.tabelVo.image1] ];
    return arr;
}
-(NSMutableArray<NSString*>*)images;
{
    NSString *rootUrl=@"http://34.87.12.20:20080";
    NSMutableArray<NSString*> *arr=[[NSMutableArray alloc]init];
    [arr addObject:[ NSString stringWithFormat:@"%@/%@",rootUrl,self.tabelVo.image1] ];
    return arr;
}
-(NSString*)headurl;
{
    NSString *url=self.tabelVo.head;
    // http://oss.ipigweb.com/public/attachment/201907/26/17/5d3ac6301da46.png?x-oss-process=image/resize,m_mfit,h_260,w_260
    return  @"http://oss.ipigweb.com/public/attachment/201907/26/17/5d3ac6301da46.png";
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
