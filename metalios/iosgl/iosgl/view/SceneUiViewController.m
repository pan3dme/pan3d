//
//  SceneUiViewController.m
//  iosgl
//
//  Created by pan3dme on 2021/3/1.
//  Copyright © 2021 zhao. All rights reserved.
//

#import "SceneUiViewController.h"
#import "Scene3D.h"
#import "MtkBaseLine.h"

@interface SceneUiViewController ()
 
@property (nonatomic, strong)Scene3D* scene3D;
@property (nonatomic, strong) NSMutableArray<UIButton*>* butItems;
@end

@implementation SceneUiViewController

 
- (void)viewDidLoad {
    [super viewDidLoad];
    
    self.scene3D=[[Scene3D alloc]init:self.view];
    [self.scene3D showFpsLabel];
    
    [self.scene3D addDisplay: [[MtkBaseLine alloc]init:self.scene3D]];
    [self.scene3D loadSceneByUrl:@"2014"];
    
    [self addMenuList];
    
}
-(void)addMenuList;
{
    self.butItems=[[NSMutableArray alloc]init];
    NSMutableArray* arr=[[NSMutableArray alloc]init];
    [arr addObject:@"1001"];
    [arr addObject:@"1002"];
    [arr addObject:@"1003"];
 
 
    [self addButsByArr:arr  action: @selector(addMenuListClikEvent:)];
    
 
    [self viewDidLayoutSubviews];
  
}
- (void) addMenuListClikEvent:(UIButton *) btn
{
    NSString* titleStr=btn.titleLabel.text;
 
    if([titleStr isEqualToString:@"特效"]){
         
 
        [btn setTintColor:UIColor.yellowColor];
       
    }
    
}
-(void)addButsByArr:(NSMutableArray*)arr action:(SEL)action
{
      
    for(int i=0;i<arr.count;i++){
        UIButton* oneBut=[self makeButtion];
        [oneBut setTitle:arr[i] forState:UIControlStateNormal];
        [oneBut setTitle:arr[i] forState:UIControlStateHighlighted];
        [oneBut addTarget:self action:action forControlEvents:UIControlEventTouchUpInside] ;
        [self.butItems addObject:oneBut];
    }
    
}
- (void)viewDidLayoutSubviews
{
    for (int i=0; i< self.butItems.count; i++) {
        double tx=    fmod (i, 5);
        int ty= float2int(i/5.0f);
        
        self.butItems[i].frame=CGRectMake(tx*75+10,  CGRectGetMaxY(self.view.frame)/1.5+55+ty*50, 60, 30);
    }
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
