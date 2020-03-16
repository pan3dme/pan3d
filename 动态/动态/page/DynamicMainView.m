//
//  DynamicMainView.m
//  动态
//
//  Created by zhao on 16/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Header.h"
#import "UIView+XBZKeyBoard.h"
#import "DynamicMainView.h"
#import "TabTittlView.h"
#import "ListPage.h"
#import "MathClass.h"
#import "NetHttpsManager.h"


@interface DynamicMainView ()

@property(nonatomic,strong)TabTittlView* tabTittlView;
@property(nonatomic,strong)UIScrollView* pageScrollView;
@property(nonatomic,strong)NSMutableArray< ListPage*>* pageItem;


@end

@implementation DynamicMainView

- (void)viewDidLoad {
    [super viewDidLoad];
    self.title=@"动态";
    
    self.view.backgroundColor=[UIColor whiteColor];
 
    
    self.pageScrollView=[[UIScrollView alloc]initWithFrame:self.view.bounds];
     self.pageScrollView.pagingEnabled=YES;
     self.pageScrollView.showsHorizontalScrollIndicator = NO;//水平滚动条
     self.pageScrollView.showsVerticalScrollIndicator = NO;//
    [self.view addSubview:self.pageScrollView];
    
    self.tabTittlView=[[TabTittlView alloc]init];
    [self.view addSubview:self.tabTittlView];
    
    
    self.navigationController.navigationBar.hidden = NO;  //显示头部
    [self.navigationController setNavigationBarHidden:NO];
    
    [self initBaseUi ];
    
}
-(void)aaaaaaa;
{
     NSMutableDictionary* dic=[[NSMutableDictionary alloc]init];
         [dic setObject:@"0" forKey:@"begin_id"];
           [dic setObject:@"10" forKey:@"count"];
           NSString *URL= [ NSString stringWithFormat:@"http://34.87.12.20:20080/%@",PLATFORM_GAME_BLOG_LIST_ALL ];
     
        
        [[NetHttpsManager default] POSTWithUrl:URL paramDict:dic OverTime:100 successBlock:^(NSDictionary *responseJson) {
            NSLog(@"-------");
        } FailureBlock:^(NSError *error) {
            NSLog(@"-------");
        }];
}
-(void)bbbbb;
{
     NSMutableDictionary* dic=[[NSMutableDictionary alloc]init];
     [dic setObject:@"ef53387a1af39b7fd95c00cfdae73da8#/" forKey:@"key"];
     
 
}
-(void)initBaseUi;
{
    self.pageItem= [[NSMutableArray alloc]init];
    
    [self addTempPage];
    [self addTempPage];
    [self addTempPage];
    

    [self aaaaaaa];
    
}
-(void)addTempPage;
{
    ListPage*   listPage=[[ListPage alloc] initWithFrame:self.view.bounds];
    [self.pageScrollView addSubview: listPage];
    [self.pageItem addObject:listPage];
}

- (void)viewDidLayoutSubviews;
{
    self.tabTittlView.frame=CGRectMake(0, 50*kScaleHeight, kScreenW, 50*kScaleHeight);
    UIScrollView*  sc=self.pageScrollView;
    
    sc.frame=CGRectMake(0, CGRectGetMaxY(self.tabTittlView .frame) , self.view.width, self.view.height-CGRectGetMaxY(self.tabTittlView .frame));
    for(int i=0;i<self.pageItem.count;i++){
        self.pageItem[i].frame=CGRectMake(i*sc.width,0,sc.width,sc.height );
    }
    sc.contentSize= CGSizeMake(self.pageItem.count * sc.width, sc.width );
    
}



@end
