//
//  CtxUIView.m
//  iosgl
//
//  Created by zhao on 2/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "CtxUIView.h"

@implementation CtxUIView


 
-(void)drawArrowRectangleTwo:(CGRect) frameRect

{
    
    
    CGContextRef ctx =UIGraphicsGetCurrentContext();
    
 
    CGFloat tw = frameRect.size.width;
    CGFloat th = frameRect.size.height;
    
    
    [[UIColor yellowColor] set];
    CGContextMoveToPoint(ctx,10,10);
 
    CGContextAddLineToPoint(ctx,tw-10,10);
    CGContextAddLineToPoint(ctx,tw-10,th-10);
    CGContextAddLineToPoint(ctx,10,th-10);
    CGContextClosePath(ctx);
    CGContextFillPath(ctx);
    
       
    
   //CGContextRestoreGState(ctx);// 恢复到之前的context
 
   
}


//重写绘图，调用刚才绘图的方法

-(void)drawRect:(CGRect)rect
{
   // CGRect frame = rect;
 
    [self drawArrowRectangleTwo:rect];
    self.layer.shadowColor =[ [UIColor grayColor] CGColor];;
    self.layer.shadowOffset = CGSizeZero; //[水平偏移, 垂直偏移]
    self.layer.shadowOpacity = 0.5; // 0.0 ~ 1.0 的值
    self.layer.shadowRadius = 1.0; // 阴影发散的程度
}
 

@end
