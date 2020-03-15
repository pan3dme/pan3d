//
//  ViewController.m
//  DynamicPoject
//
//  Created by zhao on 15/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "ViewController.h"
#import "Header.h"
#import "DynamicMainView.h"

@interface ViewController ()
@property(nonatomic,strong)UIButton* toDynamicBut;
@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
 
    self.toDynamicBut=[self makeTempBut];
   [ self.toDynamicBut addTarget:self action:@selector(pressBtn:) forControlEvents:UIControlEventTouchUpInside];
    
    [self.view addSubview:self.toDynamicBut];
    
}
- (void) pressBtn:(UIButton *) btn
{
 
    DynamicMainView* dynamicMainView=[[DynamicMainView alloc] init];
    [self .navigationController pushViewController:dynamicMainView animated:YES]; //从右t向左
  
}

-(UIButton*)makeTempBut;
{
    UIButton *btn =[UIButton buttonWithType:UIButtonTypeRoundedRect];
        //设置button按钮的位置
        btn.frame = CGRectMake(100, 100, 100, 40);
        //设置按钮的文字内容
        //@parameter
        //P1:字符串类型，显示到按钮上的文字
        //P2:设置文字显示的状态类型
        [btn setTitle:@"按钮01" forState:UIControlStateNormal];//正常状态
        [btn setTitle:@"按钮按下" forState:UIControlStateHighlighted];//正常状态高亮控制
        //灰色背景颜色
        btn.backgroundColor = [UIColor grayColor];
        //设置按钮文字颜色P1:颜色  P2:状态
        [btn setTitleColor:[UIColor redColor] forState:UIControlStateNormal];
        //设置按下状态的颜色
        [btn setTitleColor:[UIColor orangeColor] forState:UIControlStateHighlighted];
        //设置按钮的风格颜色
        [btn setTintColor:[UIColor whiteColor]];
        //titilelabel:UIlabel空间
        btn .titleLabel.font = [UIFont systemFontOfSize:24];
 
    return btn;
}
- (void)viewWillLayoutSubviews
{
  
     self.toDynamicBut.frame=CGRectMake((kScreenW-100)/2, (kScreenH-50)/2,100, 50)   ;
    
}

@end
