//
//  SceneBaseViewController.m
//  iosgl
//
//  Created by pan3dme on 2021/3/1.
//  Copyright © 2021 zhao. All rights reserved.
//

#import "SceneBaseViewController.h"
#import "GridLineSprite.h"

@interface SceneBaseViewController ()

@end

@implementation SceneBaseViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.sceneUiView= [[UIView alloc]initWithFrame:self.view.bounds];
    self.sceneUiView.backgroundColor=[UIColor redColor];
    [self.view addSubview: self.sceneUiView];
    
    self.scene3D=[[Scene3D alloc]init: self.sceneUiView];
    [self.scene3D addDisplay: [[GridLineSprite alloc]init:self.scene3D]];
    [self addMenuList];
}
-(void)addMenuList;
{
    
}
-(void)addButsByArr:(NSMutableArray*)arr ;
{
    [arr addObject:@"清理"];
    [arr addObject:@"网格"];
    [arr addObject:@"拉+"];
    [arr addObject:@"推-"];
    for(int i=0;i<arr.count;i++){
        UIButton* oneBut=[self makeButtion];
        
        [oneBut setTitle:arr[i] forState:UIControlStateNormal];
        [oneBut setTitle:arr[i] forState:UIControlStateHighlighted];
        [oneBut addTarget:self action:@selector(addMenuListClikEvent:) forControlEvents:UIControlEventTouchUpInside] ;
        [self.butItems addObject:oneBut];
    }
    
}
- (BOOL) addMenuListClikEvent:(UIButton *) btn;
{
    NSString* titleStr=btn.titleLabel.text;
    if([titleStr isEqualToString:@"清理"]){
        
        [self.scene3D clearAll];
        return  false;
    }
    if([titleStr isEqualToString:@"网格"]){
        [self.scene3D addDisplay: [[GridLineSprite alloc]init:self.scene3D]];
        return  false;
    }
    if([titleStr isEqualToString:@"拉+"]){
        self.scene3D.camera3D.distance*=0.8;
        [self.scene3D.camera3D upFrame];
        return  false;
    }
    if([titleStr isEqualToString:@"推-"]){
        self.scene3D.camera3D.distance/=0.8;
        [self.scene3D.camera3D upFrame];
        return  false;
    }
 
    
    return true;
    
}

-(UIButton*)makeButtion;
{
    UIButton* but=[[UIButton alloc]initWithFrame:CGRectMake(0, 50, 50, 30)];
    [but setTitle:@"1" forState:UIControlStateNormal];
    but.backgroundColor=[UIColor redColor];
    but.layer.cornerRadius = 15; // 圆角的弧度
    but.layer.masksToBounds = YES;
    [self.view addSubview:but];
    
    return but;
}
- (void)viewDidLayoutSubviews
{
    for (int i=0; i< self.butItems.count; i++) {
        double tx=    fmod (i, 5);
        int ty= float2int(i/5.0f);
        
        self.butItems[i].frame=CGRectMake(tx*75+10,  CGRectGetMaxY(self.view.frame)/1.5+55+ty*50, 60, 30);
    }
    
 
    CGFloat sizeWH=  MIN( CGRectGetWidth(self.view.bounds),     CGRectGetHeight(self.view.bounds));
      
    
    CGSize winSize=   CGSizeMake(  CGRectGetWidth(self.view.bounds),     CGRectGetHeight(self.view.bounds));
 
    
    [self.scene3D resieSize:winSize];
    

}
- (void)touchesMoved:(NSSet *)touches withEvent:(UIEvent *)event {
    
    if(self.scene3D){
        UITouch *touch = [touches anyObject];
        CGPoint currentPoint = [touch locationInView:self.view];
        CGPoint prePoint = [touch previousLocationInView:self.view];
        CGFloat offsetX = currentPoint.x - prePoint.x;
        CGFloat offsetY = currentPoint.y - prePoint.y;
        
        self.scene3D.camera3D.rotationX +=offsetY*0.1;
        self.scene3D.camera3D.rotationY -=offsetX;
        [self.scene3D.camera3D upFrame];
        
    
    }
}
@end
