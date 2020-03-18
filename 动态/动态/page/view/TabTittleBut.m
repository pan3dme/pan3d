//
//  RechargeTopMenuBut.m
//  RedbagApp
//
//  Created by zhao on 13/3/2020.
//  Copyright © 2020 xfg. All rights reserved.
//

#import "ColorHeader.h"
#import "TabTittleBut.h"
#import "UIView+XBZKeyBoard.h"
#import "UIColor+XBZKeyBoard.h"
 

@interface TabTittleBut()
@property(strong,nonatomic) UILabel*  tabLabel;
@property(strong,nonatomic) UIImageView*  iconImgview;
@property(nonatomic,strong) UIView*  baseBgA;
@property(nonatomic,strong) UIView*  baseBgB;
@property(nonatomic,assign) BOOL   selectData;
@end
@implementation TabTittleBut

/*
 // Only override drawRect: if you perform custom drawing.
 // An empty implementation adversely affects performance during animation.
 - (void)drawRect:(CGRect)rect {
 // Drawing code
 }
 */

- (instancetype)init
{
    self = [super init];
    if (self) {
        self.backgroundColor=[UIColor clearColor];
        self.baseBgA=[[UIView alloc]initWithFrame:self.bounds];
        self.baseBgA.autoresizingMask = UIViewAutoresizingFlexibleHeight | UIViewAutoresizingFlexibleWidth;
        [self addSubview:self.baseBgA];
        
        
        self.baseBgB=[[UIView alloc]initWithFrame:self.bounds];
        self.baseBgB.autoresizingMask = UIViewAutoresizingFlexibleHeight | UIViewAutoresizingFlexibleWidth;
        [self addSubview:self.baseBgB];
        
        
        self.iconImgview=[[UIImageView alloc]initWithFrame:CGRectMake(0, 0, 20, 20)];
        [self addSubview:self.iconImgview];
        
        self.tabLabel=[[UILabel alloc]initWithFrame:self.bounds];
        //self.tabLabel.textAlignment=NSTextAlignmentCenter;
        self.tabLabel.font = [UIFont systemFontOfSize:14];
      
        [self addSubview:self.tabLabel];
    }
    return self;
}
 
-(void)setData:(NSString*)value;
{
    self.tabLabel.text=value ;
 
    [self layoutSubviews];

}
-(void)selectBut:(BOOL)value;
{
    self.selectData=value;
    
    self.baseBgB.hidden=self.selectData;
    self.baseBgA.hidden=!self.baseBgB.hidden;
  
}
- (void)layoutSubviews;
{
  
    
      CGSize rectSize = [self.tabLabel.text boundingRectWithSize:CGSizeMake(self.width, 100) options:NSStringDrawingUsesLineFragmentOrigin attributes:@{NSFontAttributeName: self.tabLabel.font}  context:nil].size;
    
   
    CGFloat tw=  rectSize.width+30;
  
    self.iconImgview.frame=CGRectMake( (self.width-tw)/2, (self.height-25)/2, 25, 25);
    self.tabLabel.frame=CGRectMake(CGRectGetMaxX( self.iconImgview.frame)+5, 0,self.width- CGRectGetMaxX( self.iconImgview.frame)-5, self.height);
    
    [self MakeUiViewGrad:self.baseBgA A:RGBOF(0xffdbaf) B:RGB(255, 255, 255) Horizontal:NO];
     [self MakeUiViewGrad:self.baseBgB A:RGB(255, 255, 255) B:RGB(255, 255, 255) Horizontal:NO];
    
}
//给按钮加渐变
-(void)MakeUiViewGrad:(UIView *)value A:(UIColor *)a B:(UIColor *)b Horizontal:(BOOL )horizontal  {
    UIView *myView= value;
        myView.backgroundColor=[UIColor clearColor];
    myView.layer.masksToBounds = YES;
    
    CAGradientLayer *gradient = [CAGradientLayer layer];
    gradient.frame = myView.bounds;
    if(horizontal){
        gradient.startPoint=CGPointMake(0, 0);
        gradient.endPoint=CGPointMake(1, 0);
    }else{
        gradient.startPoint=CGPointMake(0, 0.0);
        gradient.endPoint=CGPointMake(0, 1.0);
    }
    
    gradient.colors = [NSArray arrayWithObjects:(id)[a CGColor], (id)[b CGColor], nil];
    [myView.layer insertSublayer:gradient atIndex:1];
     [myView setNeedsDisplay];
 
};
@end
