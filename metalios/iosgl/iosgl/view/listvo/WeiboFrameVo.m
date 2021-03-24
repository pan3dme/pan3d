#import "WeiboFrameVo.h"
#import "Scene_data.h"
 

#define NameFont [UIFont systemFontOfSize:16]
#define TextFont [UIFont systemFontOfSize:15]

@implementation WeiboFrameVo

- (void)setWeiboInfo:(NSDictionary*)val;
{
    self.type=  [[val objectForKey:@"type"] intValue];
    self.picwidth=  [[val objectForKey:@"width"] intValue];
    self.picheight=  [[val objectForKey:@"height"] intValue];
    self.title=  [val objectForKey:@"tittle"];
    self.picitem=[val objectForKey:@"picitem"];
    self.text=[val objectForKey:@"text"];
    self.url=[val objectForKey:@"url"];
  
    WeiboFrameVo* _weibo=self;
    if(self.url){
        self.picture=[[Scene_data default]getWorkUrlByFilePath:self.url];
    }
       
    CGFloat padding = 10;
    
    // 1.设置头像的frame
    CGFloat iconViewX = padding;
    CGFloat iconViewY = padding;
    CGFloat iconViewH = 30;
 
    
    // 2.设置昵称的frame
    // 昵称的x = 头像最大的x + 间隙
    CGFloat nameLabelX =   padding;
    // 计算文字的宽高
    CGSize nameSize = [self sizeWithString:_weibo.title font:NameFont maxSize:CGSizeMake(MAXFLOAT, MAXFLOAT)];
    
    CGFloat nameLabelH = nameSize.height;
    CGFloat nameLabelW = nameSize.width;
    CGFloat nameLabelY = iconViewY + (iconViewH - nameLabelH) * 0.5;
    self.nameF = CGRectMake(nameLabelX, nameLabelY, nameLabelW, nameLabelH);
    
 
 
    // 4.设置正文的frame
    CGFloat introLabelX = iconViewX;
    CGFloat introLabelY = iconViewH  + padding;
    CGSize textSize =  [self sizeWithString:_weibo.text font:TextFont maxSize:CGSizeMake(300, MAXFLOAT)];
    
    CGFloat introLabelW = textSize.width;
    CGFloat introLabelH = textSize.height;
    
    self.introF = CGRectMake(introLabelX, introLabelY, introLabelW, introLabelH);
    
    // 5.设置配图的frame
    if (_weibo.picture) {// 如果有有配图
        CGFloat pictureViewX = iconViewX;
        CGFloat pictureViewY = CGRectGetMaxY(self.introF) + padding;
        CGFloat pictureViewW =  self.picwidth;
        CGFloat pictureViewH =  self.picheight;
        self.pictrueF = CGRectMake(pictureViewX, pictureViewY, pictureViewW, pictureViewH);
      
        self.cellHeight = CGRectGetMaxY(self.pictrueF) + padding;
    }else{
 
        self.cellHeight = CGRectGetMaxY(self.introF) + padding;
    }
    self.cellHeight+=100;
}

- (CGSize)sizeWithString:(NSString *)str font:(UIFont *)font maxSize:(CGSize)maxSize
{
    NSDictionary *dict = @{NSFontAttributeName : font};
    CGSize size =  [str boundingRectWithSize:maxSize options:NSStringDrawingUsesLineFragmentOrigin attributes:dict context:nil].size;
    return size;
}

@end
