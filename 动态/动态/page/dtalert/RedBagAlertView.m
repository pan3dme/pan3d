//
//  RedBagAlertView.m
//  RedbagApp
//
//  Created by zhao on 26/12/2019.
//  Copyright © 2019 xfg. All rights reserved.
//

#import "RedBagAlertView.h"
#import "Header.h"
@implementation RedBagAlertVo

@end

@interface RedBagAlertView ()
@property (nonatomic, strong)  RedBagAlertView *redBagAlertView;

@property (nonatomic, strong)  RedBagAlertVo *redBagAlertVo;

@end
@implementation RedBagAlertView


- (instancetype)init {
    if ([super init]) {
        //self.frame = CGRectMake(0, 0, 375, 667 );
        self.frame = CGRectMake(0, 0, kScreenW, kScreenH);
        self.backgroundColor =  RGBA(0, 0, 0, 0.4);
        //self.autoresizingMask = UIViewAutoresizingFlexibleHeight | UIViewAutoresizingFlexibleWidth;
        self.userInteractionEnabled = YES;
           [self addGestureRecognizer:[[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(winbgClikEvet)]];
        
        
        self.redBagAlertView=[[[UINib nibWithNibName:@"RedBagAlertViewUi" bundle:nil] instantiateWithOwner:self options:nil] objectAtIndex:0];
        
        self.redBagAlertView.backgroundColor =  RGBA(0, 0, 0, 0.4);
        self.redBagAlertView.height = kScreenH;
        self.redBagAlertView.width = kScreenW;
        [self addSubview: self.redBagAlertView];
        
 //       [ColorType MakeUiViewYelloGrad:  self.redBagAlertView.submitBut];
 //       [ColorType MakeUiViewYelloGrad:  self.winTittleBg];

        self.redBagAlertView.canelBut.layer.borderWidth=1.00001;
        self.redBagAlertView.canelBut.backgroundColor=[UIColor whiteColor];
        self.redBagAlertView.canelBut.layer.borderColor= [[UIColor lightGrayColor] CGColor];
        
        self.alertBgView.userInteractionEnabled=YES;
          [self.alertBgView addGestureRecognizer:[[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(clikNull)]];
        
    }
    return self;
}
- (void)winbgClikEvet {
    if(self.redBagAlertVo.bgClikExit){
        [self dismiss];
    }
 
}
- (void)dismiss {
 
    [self removeFromSuperview];
    
}

-(void)clikNull{
}
- (IBAction)canelButClik:(id)sender {
    NSLog(@"canelButClik");
    [self dismiss];
    self.canelBlock([[NSDictionary alloc]init]);
}

- (IBAction)submitButClik:(id)sender {
    NSLog(@"submitButClik");
    self.submitBlock([[NSDictionary alloc]init]);
    [self dismiss];
    
}

- (void)show{
  
    [[[UIApplication sharedApplication] keyWindow] addSubview:self];
    self.frame=self.window.bounds;
}
  
 
- (void)layoutSubviews
{
    if(self.redBagAlertView.canelBut.hidden){//只有一个确定按钮的时候
           UIButton *a= self.redBagAlertView.submitBut;
           a.frame=CGRectMake((self.alertBgView.bounds.size.width-CGRectGetWidth( a.bounds))/2, CGRectGetMinY( a.frame), CGRectGetWidth( a.bounds), CGRectGetHeight( a.bounds));
       }
}
@end
