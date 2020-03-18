//
//  TabTittlView.m
//  动态
//
//  Created by zhao on 16/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//
#import "UIView+XBZKeyBoard.h"
#import "ColorHeader.h"
#import "TabTittlView.h"
#import "TabTittleBut.h"


@interface TabTittlView ()

@property(nonatomic,strong)NSMutableArray<NSString*>* tabstr;
@property(nonatomic,strong)NSMutableArray<UIButton*>* tabUiItem;
@property(nonatomic,strong)UIButton* camBut;
@property(nonatomic,assign)CGFloat butWeiht;
@property(nonatomic,assign)int  tabIdx;

@end

@implementation TabTittlView

- (instancetype)init
{
    self = [super init];
    if (self) {
        self.tabstr=[[NSMutableArray alloc]init];
        self.tabUiItem=[[NSMutableArray alloc]init];
        self.butWeiht=60;
        [self.tabstr addObject:@"推荐"];
        [self.tabstr addObject:@"关注"];
        [self.tabstr addObject:@"全部"];
        [self.tabstr addObject:@"我的"];
        [self initBaseUi];
        
        
    }
    return self;
}

-(void)initBaseUi;
{
    self.backgroundColor=[UIColor redColor];
    for(int i=0;i<self.tabstr.count;i++)
    {
        UIButton *tab=[self makeBaseBut:self.tabstr[i]];
        tab.tag=100+i;
        [tab addTarget:self action:@selector(pressBtn:) forControlEvents:UIControlEventTouchUpInside] ;
        [self addSubview:tab];
        [self.tabUiItem addObject:tab];
    }
    self.layer.shadowOffset = CGSizeMake(0, 0);
    self.layer.shadowOpacity = 1.101;
    self.backgroundColor=[UIColor whiteColor];
    self.layer.shadowColor= [ RGBOF(0xbfbfbf) CGColor];
    [self selectTabByIndex:0];
    

    self.camBut =[[UIButton alloc]initWithFrame:CGRectMake(0, 5, 40, 40)];
    [self.camBut  setImage:[UIImage imageNamed:@"camicon"] forState:UIControlStateNormal];
    [self.camBut addTarget:self action:@selector(camButClikEvent:) forControlEvents:UIControlEventTouchUpInside] ;
    [self addSubview:self.camBut];
    
}
- (void) camButClikEvent:(UIButton *) btn
{
    [_delegate clikAddViewEvent];
       
}
- (void) pressBtn:(UIButton *) btn
{
    int idx= (int)btn.tag-100;
    
    [self selectTabByIndex: idx];
    
    [_delegate selectTabIdx:idx];
    
}

-(void)selectTabByIndex:(int)value;
{
    self.tabIdx=value;
    for(int i=0;i<self.tabUiItem.count;i++)
    {
        if(self.tabIdx==i){
            [self.tabUiItem[i] setTitleColor:[UIColor redColor] forState:UIControlStateNormal];
        }else{
            [self.tabUiItem[i] setTitleColor:[UIColor blackColor] forState:UIControlStateNormal];
        }
        
    }
}
-(UIButton*)makeBaseBut:(NSString*)value;
{
    UIButton *btn =[UIButton buttonWithType:UIButtonTypeRoundedRect];
    [btn setTitle:value forState:UIControlStateNormal];//正常状态
    [btn setTitle:value forState:UIControlStateHighlighted];//正常状态高亮控制
    //灰色背景颜色
    btn.backgroundColor = [UIColor whiteColor];
    //设置按钮文字颜色P1:颜色  P2:状态
    [btn setTitleColor:[UIColor blackColor] forState:UIControlStateNormal];
    //设置按下状态的颜色
    [btn setTitleColor:[UIColor orangeColor] forState:UIControlStateHighlighted];
    //设置按钮的风格颜色
    [btn setTintColor:[UIColor whiteColor]];
    //titilelabel:UIlabel空间
    btn .titleLabel.font = [UIFont systemFontOfSize:18];
    return btn;
    
}
- (void)layoutSubviews
{
    [super layoutSubviews];
    for(int i=0;i<self.tabUiItem.count;i++)
    {
        self.tabUiItem[i].frame=CGRectMake(i*self.butWeiht+20,5 , self.butWeiht-1, self.height-5);
    }
    self.camBut.frame=CGRectMake(self.width-60, 20, 32, 32);
}

@end
