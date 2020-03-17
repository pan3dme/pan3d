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
    self.cellHeight=100;
    switch (self.type) {
        case DYNAMIC_IMG_TYPE:
            if(self.images.count>2){
                self.cellHeight+=250;
            }else{
                self.cellHeight+=150;
            }
            break;
        case DYNAMIC_VIDE_TYPE:
             self.cellHeight+=200;
            break;
        default:
            break;
    }
 
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
-(NSString*)video_post;
{
    NSString* videoUrl=    [self getWebUrlByurl:self.tabelVo.vidio_url];
    videoUrl=  [videoUrl stringByReplacingOccurrencesOfString:@".mp4"withString:@"_mini.jpg"];
    return  videoUrl;
}
-(NSMutableArray<NSString*>*)miniimages;
{

 
    NSMutableArray<NSString*> *arr=[[NSMutableArray alloc]init];
 
    
  if(self.tabelVo.image1.length){
           [arr addObject:[self getWebUrlByurl:[self.tabelVo.image1 stringByReplacingOccurrencesOfString:@".jpg"withString:@"_mini.jpg"]]];
    }
    
    if(self.tabelVo.image2.length){
             [arr addObject:[self getWebUrlByurl:[self.tabelVo.image1 stringByReplacingOccurrencesOfString:@".jpg"withString:@"_mini.jpg"]]];
      }
    if(self.tabelVo.image3.length){
             [arr addObject:[self getWebUrlByurl:[self.tabelVo.image1 stringByReplacingOccurrencesOfString:@".jpg"withString:@"_mini.jpg"]]];
      }
    if(self.tabelVo.image4.length){
             [arr addObject:[self getWebUrlByurl:[self.tabelVo.image1 stringByReplacingOccurrencesOfString:@".jpg"withString:@"_mini.jpg"]]];
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
    [arr addObject:  [self getWebUrlByurl:self.tabelVo.image1] ];
    return arr;
}
-(NSString*)headurl;
{
    //NSString *url=self.tabelVo.head;
    // http://oss.ipigweb.com/public/attachment/201907/26/17/5d3ac6301da46.png?x-oss-process=image/resize,m_mfit,h_260,w_260
    return [self getWebUrlByurl:self.tabelVo.head];
}
+(NSMutableArray<DynamicBaseVo*>*)makeListArr:(NSMutableArray*)arr;
{
    NSMutableArray<DynamicBaseVo*>* bitem=[[NSMutableArray alloc]init];
    for(int i=0;i<arr.count&&i<5;i++){
        DynamicBaseVo* vo=[[DynamicBaseVo alloc]init];
        [vo praseData:arr[i]];
        
        [bitem addObject:vo];
    }
    
    return bitem;
}
@end
