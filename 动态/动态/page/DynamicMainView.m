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
#import "DynamicBaseVo.h"
#import "NetHttpsManager.h"
#import "DynamicModel.h"
#import "UserInfoVo.h"


@interface DynamicMainView ()
<
TabTittlViewDelegate,
UIScrollViewDelegate
>

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
    self.pageScrollView.delegate=self;
     self.pageScrollView.showsHorizontalScrollIndicator = NO;//水平滚动条
     self.pageScrollView.showsVerticalScrollIndicator = NO;//
    [self.view addSubview:self.pageScrollView];
    
    self.tabTittlView=[[TabTittlView alloc]init];
    self.tabTittlView.delegate=self;
    [self.view addSubview:self.tabTittlView];
     
    self.navigationController.navigationBar.hidden = NO;  //显示头部
    [self.navigationController setNavigationBarHidden:NO];
    
    [self initBaseUi ];
    
    [self userImport];
}
-(void)userImport;
{
 
    NSString* key=@"eyJleHRyYV9ibG9nIjoie1widmlwX2x2XCI6MSxcInVzZXJfbGV2ZWxcIjpcIjZcIixcImF1dGhfYW5jaG9yXCI6MCxcImRpc2Nlcm5fdHlwZVwiOlwidHVpMVwifSIsIm5pY2tuYW1lIjoiXHU1NGM4XHU1NGM4bGV2ZWwiLCJoZWFkIjoiaHR0cDpcL1wvb3NzLmlwaWd3ZWIuY29tXC9wdWJsaWNcL2F0dGFjaG1lbnRcLzIwMTkwN1wvMjZcLzE3XC81ZDNhYzYzMDFkYTQ2LnBuZz94LW9zcy1wcm9jZXNzPWltYWdlXC9yZXNpemUsbV9tZml0LGhfMjYwLHdfMjYwIiwidXNlcm5hbWUiOiIyOTg5NDYzMSIsInRpbWUiOjE1ODQ0ODk5MTcsInNpZ24iOiJhMzJmYzkzZWQ0MWVmOWZmNTU4ZmEzMzVlNzhiNjExYiJ9";
 
    NSString *path= [ NSString stringWithFormat:@"http://34.87.12.20:20080/%@?key=%@",PLATFORM_GAME_USER_IMPORT,key];
    NSURL *url = [NSURL URLWithString:path];
    NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:url];
    NSURLSession *session = [NSURLSession sharedSession];
    NSURLSessionDataTask *dataTask = [session dataTaskWithRequest:request completionHandler:^(NSData * _Nullable data, NSURLResponse * _Nullable response, NSError * _Nullable error) {
        NSDictionary *dic = [NSJSONSerialization JSONObjectWithData:data options:0 error:nil];
        //[0]    (null)    @"info" : 12 key/value pairs
        
        int codenum=  [[dic valueForKey:@"code"]intValue] ;
        if(codenum==0){
            [DynamicModel default].selfUserInfoVo=[[UserInfoVo alloc]init];
            [[DynamicModel default].selfUserInfoVo refrishData:[dic valueForKey:@"info"]];
        }
        
    }];
    
    [dataTask resume];
    

}
//PLATFORM_GAME_USER_IMPORT
 - (void)selectTabIdx:(int)value
{
      [self.pageScrollView setContentOffset:CGPointMake(CGRectGetWidth(self.pageScrollView.bounds)*value, 0) animated:YES];
}
- (void)scrollViewDidEndDecelerating:(UIScrollView *)scrollView {
    BOOL scrollToScrollStop = !scrollView.tracking && !scrollView.dragging && !scrollView.decelerating;
    if (scrollToScrollStop) {
        int idx= self.pageScrollView.contentOffset.x/self.pageScrollView.width;
        [self.tabTittlView selectTabByIndex:idx  ];
   
    }
}
 
-(void)initBaseUi;
{
    self.pageItem= [[NSMutableArray alloc]init];
    
    [self addTempPage];
    [self addTempPage];
    [self addTempPage];
     
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
