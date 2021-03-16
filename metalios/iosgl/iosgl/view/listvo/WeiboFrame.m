#import "WeiboFrame.h"
 

#define NameFont [UIFont systemFontOfSize:15]
#define TextFont [UIFont systemFontOfSize:16]

@implementation WeiboFrame

- (void)setWeiboInfo
{
 
    
//    self.name=@"标题";
//    self.text=@"完美胡设计方案";
    self.picture= @"https://webpan.oss-cn-shanghai.aliyuncs.com/res/2dbg.jpg";
    
    WeiboFrame* _weibo=self;
    
    // 间隙
    CGFloat padding = 10;
    
    // 1.设置头像的frame
    CGFloat iconViewX = padding;
    CGFloat iconViewY = padding;
    CGFloat iconViewW = 30;
    CGFloat iconViewH = 30;
    self.iconF = CGRectMake(iconViewX, iconViewY, iconViewW, iconViewH);
    
    // 2.设置昵称的frame
    // 昵称的x = 头像最大的x + 间隙
    CGFloat nameLabelX = CGRectGetMaxX(self.iconF) + padding;
    // 计算文字的宽高
    CGSize nameSize = [self sizeWithString:_weibo.name font:NameFont maxSize:CGSizeMake(MAXFLOAT, MAXFLOAT)];
    
    CGFloat nameLabelH = nameSize.height;
    CGFloat nameLabelW = nameSize.width;
    CGFloat nameLabelY = iconViewY + (iconViewH - nameLabelH) * 0.5;
    self.nameF = CGRectMake(nameLabelX, nameLabelY, nameLabelW, nameLabelH);
    
    // 3.设置vip的frame
    CGFloat vipViewX = CGRectGetMaxX(self.nameF) + padding;
    CGFloat vipViewY = nameLabelY;
    CGFloat vipViewW = 14;
    CGFloat vipViewH = 14;
    self.vipF = CGRectMake(vipViewX, vipViewY, vipViewW, vipViewH);
    
    // 4.设置正文的frame
    CGFloat introLabelX = iconViewX;
    CGFloat introLabelY = CGRectGetMaxY(self.iconF) + padding;
    CGSize textSize =  [self sizeWithString:_weibo.text font:TextFont maxSize:CGSizeMake(300, MAXFLOAT)];
    
    CGFloat introLabelW = textSize.width;
    CGFloat introLabelH = textSize.height;
    
    self.introF = CGRectMake(introLabelX, introLabelY, introLabelW, introLabelH);
    
    // 5.设置配图的frame
    if (_weibo.picture) {// 如果有有配图
        CGFloat pictureViewX = iconViewX;
        CGFloat pictureViewY = CGRectGetMaxY(self.introF) + padding;
        CGFloat pictureViewW = 100;
        CGFloat pictureViewH = 100;
        self.pictrueF = CGRectMake(pictureViewX, pictureViewY, pictureViewW, pictureViewH);
        
        // 6.计算行高
        self.cellHeight = CGRectGetMaxY(self.pictrueF) + padding;
    }else{
        NSLog(@"a");
        // 6.没有配图情况下的行高
        self.cellHeight = CGRectGetMaxY(self.introF) + padding;
    }
//    self.cellHeight=200.f;
}

/**
 *  计算文本的宽高
 *
 *  @param str     需要计算的文本
 *  @param font    文本显示的字体
 *  @param maxSize 文本显示的范围
 *
 *  @return 文本占用的真实宽高
 */
- (CGSize)sizeWithString:(NSString *)str font:(UIFont *)font maxSize:(CGSize)maxSize
{
    NSDictionary *dict = @{NSFontAttributeName : font};
    // 如果将来计算的文字的范围超出了指定的范围,返回的就是指定的范围
    // 如果将来计算的文字的范围小于指定的范围, 返回的就是真实的范围
    CGSize size =  [str boundingRectWithSize:maxSize options:NSStringDrawingUsesLineFragmentOrigin attributes:dict context:nil].size;
    return size;
}

@end
