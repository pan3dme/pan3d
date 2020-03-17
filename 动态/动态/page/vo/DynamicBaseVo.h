//
//  DynamicBaseVo.h
//  动态
//
//  Created by zhao on 16/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "DynamicTabelVo.h"
#import "DynamicBaseVo.h"


typedef NS_ENUM(NSInteger, DynamicType)
{
    DYNAMIC_IMG_TYPE          =1, //图片
    DYNAMIC_VIDE_TYPE          =2, //视频
  
};


NS_ASSUME_NONNULL_BEGIN



@interface DynamicBaseVo : NSObject
@property(nonatomic,strong)DynamicTabelVo* tabelVo;
@property (nonatomic, assign) CGFloat cellHeight;
-(NSInteger)type;
-(NSString*)nick_name;
-(NSString*)content;
-(NSString*)headurl;
-(NSString*)video_post;
-(CGPoint)videoSize;
-(NSMutableArray<NSString*>*)images;
-(NSMutableArray<NSString*>*)miniimages;
+(NSMutableArray<DynamicBaseVo*>*)makeListArr:(NSMutableArray*)arr;
@end

NS_ASSUME_NONNULL_END
