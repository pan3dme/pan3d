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
    
    
    
    [[UIColor yellowColor] set];
    
    CGFloat ttht65=70;
    
    
    CGFloat tx = frameRect.origin.x+10;
    CGFloat ty = frameRect.origin.y+2;
    CGFloat tw = frameRect.size.width-20;
    CGFloat th = frameRect.size.height-50;
    
    
    [[UIColor whiteColor] set];
    CGContextMoveToPoint(ctx,tw-10-2,ty+ttht65);
    CGContextAddArc(ctx, tw-20, th, 8, 0, 0+M_PI_2, 0);
    CGContextAddArc(ctx, tx+10, th, 8, M_PI_4+M_PI_4, M_PI_4+M_PI_4+M_PI_2, 0);
    CGContextAddLineToPoint(ctx,tx+2,ty+ttht65);
    CGContextClosePath(ctx);
    CGContextFillPath(ctx);
    
       
    
    
    CGContextMoveToPoint(ctx,tx+2,ty+10);
    CGContextAddArc(ctx, tx+10, 10, 8, M_PI, M_PI+M_PI_2, 0);
    CGContextAddArc(ctx, tw-20, 10, 8, M_PI+M_PI_2, M_PI+M_PI_2+M_PI_2, 0);
    CGContextAddLineToPoint(ctx,tw-10-2,ty+ttht65);
    CGContextAddLineToPoint(ctx,tx+2,ty+ttht65);
    CGContextAddLineToPoint(ctx,tx+2,ty+20);
    CGContextAddLineToPoint(ctx,tx-8,ty+15);
    CGContextAddLineToPoint(ctx,tx+2,ty+10);
    
    
    
    CGContextClip(ctx);
    
    CGColorSpaceRef rgb = CGColorSpaceCreateDeviceRGB();
    CGFloat colors[] =
    {
        247 / 255.0f,174 / 255.0f ,79 / 255.0f, 1.00,
        235 / 255.0f,145 / 255.0f,10 / 255.0f, 1.00,
    };
    CGGradientRef gradient = CGGradientCreateWithColorComponents
    (rgb, colors, NULL, sizeof(colors)/(sizeof(colors[0])*4));//形成梯形，渐变的效果
    CGColorSpaceRelease(rgb);
    CGContextDrawLinearGradient(ctx, gradient,CGPointMake
                                (0,0) ,CGPointMake(tw,0),
                                kCGGradientDrawsAfterEndLocation);
    
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
