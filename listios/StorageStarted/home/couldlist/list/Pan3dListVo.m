//
//  Pan3dListVo.m
//  StorageStarted
//
//  Created by pan3dme on 2021/4/14.
//  Copyright © 2021 cuiyiran. All rights reserved.
//

#import "Pan3dListVo.h"
#import <AVOSCloud/AVOSCloud.h>
@implementation Pan3dListVo
+(instancetype)initWithObject:(NSDictionary *)obj{
    Pan3dListVo * product = [[Pan3dListVo alloc] init];
    product.type=  [[obj objectForKey:@"type"] intValue];
    product.title=  [obj objectForKey:@"title"];
    product.text=[obj objectForKey:@"text"];
    product.tag=[obj objectForKey:@"tag"];
    product.createdAt=[obj objectForKey:@"createdAt"];
    product.objectId=[obj objectForKey:@"objectId"];
    
    
    product.avFile0=[obj objectForKey:@"image0"];
    product.avFile1=[obj objectForKey:@"image1"];
    product.avFile2=[obj objectForKey:@"image2"];
    product.avFile3=[obj objectForKey:@"image3"];
    
 
    
    product.images = [[obj objectForKey:@"images"] componentsSeparatedByString:@","];
    
    product.bannerimage=[obj objectForKey:@"bannerimage"];
    
  
    NSData *stringData = [[obj objectForKey:@"sceneinfo"] dataUsingEncoding:NSUTF8StringEncoding];
    product.sceneinfo= [NSJSONSerialization JSONObjectWithData:stringData options:0 error:nil];
    

    return product;
}
#pragma mark -  自适应cell高度
-(CGFloat)cellHeight{
    //如果cell 的高度已经计算过,就直接返回
    if(_cellHeight) return _cellHeight;
    
    // cell高度 = 187+加文字高度
    _cellHeight = 187;
    CGSize labelSize =[self getSizeWithStr:self.title Width:[[UIScreen mainScreen] bounds].size.width-73 Font:11];
    _cellHeight+= labelSize.height;
    return _cellHeight;
}
- (CGSize) getSizeWithStr:(NSString *) str Width:(float)width Font:(float)fontSize
{
    NSDictionary * attribute = @{NSFontAttributeName:[UIFont systemFontOfSize:fontSize]};
    CGSize tempSize = [str boundingRectWithSize:CGSizeMake(width, MAXFLOAT)
                                        options:NSStringDrawingUsesLineFragmentOrigin
                                     attributes:attribute
                                        context:nil].size;
    return tempSize;
}
@end

