//
//  DynamicBaseVo.m
//  动态
//
//  Created by zhao on 16/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "DynamicBaseVo.h"
#import "Dt_DynamicTabelVo.h"
#import "Dt_DynamicModel.h"

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
    self.tabelVo=[[Dt_DynamicTabelVo alloc]init];
    [self.tabelVo refrishData:dic];
    self.cellHeight=50;
    
    if(self.content.length){
        self.cellHeight+=30;
    }
    switch (self.type) {
        case DYNAMIC_IMG_TYPE:
            if(self.images.count>2){
                self.cellHeight+=200;
            }else{
                if(self.images.count==1){
                    self.cellHeight+=150;
                }else{
                    self.cellHeight+=100;
                }
            }
            break;
        case DYNAMIC_VIDE_TYPE:
            self.cellHeight+=self.videoSize.y;
            break;
        default:
            break;
    }
    self.cellHeight+=50;
    
}

-(BOOL)isSelf;
{
    return  [Dt_DynamicModel default].selfUserInfoVo.username== self.tabelVo.username;
}
-(NSInteger)type;
{
    if(self.tabelVo.vidio_url.length){
        return  DYNAMIC_VIDE_TYPE;
    }else{
        return  DYNAMIC_IMG_TYPE;
    }
}
-(NSString*)nick_name;
{
    return  self.tabelVo.nick_name;
}
-(NSString*)content;
{
    return  self.tabelVo.content;
}
-(CGPoint)videoSize;
{
    CGPoint tempWh=[self getResizeWh:self.video_post];
    CGFloat tw=150;
    CGFloat th=200;
    CGFloat toSize=1.0;
    if (tempWh.x/ tw > tempWh.y / th) {
        toSize = tw / tempWh.x;
    } else {
        toSize = th / tempWh.y;
    }
    return CGPointMake(tempWh.x * toSize , tempWh.y * toSize);
}
-(CGPoint)getResizeWh:(NSString*)url;
{
    if( [url rangeOfString:@"x-oss-process"].location != NSNotFound){
        NSArray *item = [url componentsSeparatedByString:@","];
        NSString* h=   [ item[item.count - 2] stringByReplacingOccurrencesOfString:@"h_"withString:@""];
        NSString* w=   [ item[item.count - 1] stringByReplacingOccurrencesOfString:@"w_"withString:@""];
        return CGPointMake([w floatValue] , [h floatValue]);
        
    }else{
        return CGPointMake(100,100);
    }
    
}
/*
 
 export function getResizeWh(url: string) {
 if (url.indexOf("x-oss-process") != -1) {
 var item: Array<string> = url.split(",");
 return { h: Number(item[item.length - 2].replace("h_", "")), w: Number(item[item.length - 1].replace("w_", "")) }
 } else {
 return null
 }
 }
 */
-(NSString*)video_post;
{
    NSString* videoUrl=    [self getWebUrlByurl:self.tabelVo.vidio_url];
    videoUrl=  [videoUrl stringByReplacingOccurrencesOfString:@".mp4"withString:@"_mini.jpg"];
    return  videoUrl;
}
-(NSString*)videourl;
{
    NSString* videoUrl=    [self getWebUrlByurl:self.tabelVo.vidio_url];
    return  videoUrl;
}
-(NSMutableArray<NSString*>*)miniimages;
{
    
    
    NSMutableArray<NSString*> *arr=[[NSMutableArray alloc]init];
    
    
    if(self.tabelVo.image1.length){
        [arr addObject:[self getWebUrlByurl:[self.tabelVo.image1 stringByReplacingOccurrencesOfString:@".jpg"withString:@"_mini.jpg"]]];
    }
    if(self.tabelVo.image2.length){
        [arr addObject:[self getWebUrlByurl:[self.tabelVo.image2 stringByReplacingOccurrencesOfString:@".jpg"withString:@"_mini.jpg"]]];
    }
    if(self.tabelVo.image3.length){
        [arr addObject:[self getWebUrlByurl:[self.tabelVo.image3 stringByReplacingOccurrencesOfString:@".jpg"withString:@"_mini.jpg"]]];
    }
    if(self.tabelVo.image4.length){
        [arr addObject:[self getWebUrlByurl:[self.tabelVo.image4 stringByReplacingOccurrencesOfString:@".jpg"withString:@"_mini.jpg"]]];
    }
    
    return arr;
}
-(NSString*)getWebUrlByurl:(NSString*)value
{
    NSString *rootUrl=@"http://34.87.12.20:20080";
    if ([value rangeOfString:@"http:"].location != NSNotFound||[value rangeOfString:@"https:"].location != NSNotFound) {
        return value;
    }else{
        return[NSString stringWithFormat:@"%@/%@",rootUrl,value];
    }
}
-(NSMutableArray<NSString*>*)images;
{
    NSMutableArray<NSString*> *arr=[[NSMutableArray alloc]init];
    if(self.tabelVo.image1.length){
        [arr addObject:  [self getWebUrlByurl:self.tabelVo.image1] ];
    }
    if(self.tabelVo.image2.length){
        [arr addObject:  [self getWebUrlByurl:self.tabelVo.image2] ];
    }
    if(self.tabelVo.image3.length){
        [arr addObject:  [self getWebUrlByurl:self.tabelVo.image3] ];
    }
    if(self.tabelVo.image4.length){
        [arr addObject:  [self getWebUrlByurl:self.tabelVo.image4] ];
    }
    
    return arr;
}
-(NSString*)headurl;
{
    return [self getWebUrlByurl:self.tabelVo.head];
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
