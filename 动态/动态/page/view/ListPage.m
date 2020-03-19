//
//  ListPage.m
//  动态
//
//  Created by zhao on 16/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//
#import "Header.h"
#import "ListPage.h"
#import "DynamicBaseCell.h"
#import "DynamicBaseVo.h"
#import "TableImageViewCell.h"
#import "TabelVideoViewCell.h"
#import "NetHttpsManager.h"
#import "DynamicModel.h"
#import "RedBagRefreshGifHeader.h"
#import "YBImageBrowser.h"
#import <SDWebImage/UIImageView+WebCache.h>
 

@interface ListPage ()
<
 
DynamicBaseCellDelegate,
UITableViewDelegate,
UITableViewDataSource
>
@property(nonatomic,strong)UITableView *tabelListView;
@property (nonatomic, strong)  NSMutableArray<DynamicBaseVo*>* cellItemArr;
 
@end
@implementation ListPage

- (instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        [self initBaseUi];
    }
    return self;
}

  
  

  
-(void)initBaseUi;
{
    
  
    UITableView* temp=[[UITableView alloc]initWithFrame:self.bounds style:UITableViewStylePlain];
    temp.autoresizingMask = UIViewAutoresizingFlexibleHeight | UIViewAutoresizingFlexibleWidth;
    temp.backgroundColor=[UIColor whiteColor];
    
    temp.delegate=self;
    temp.dataSource=self;
    self.tabelListView=temp;
    [self addSubview:temp];
    [self makeRefreshHeaderGf];
    self.backgroundColor=[UIColor clearColor];
    
     
 
}

/*
 初始化t第一次的数据
 */
-(void)initFristData;
{
 
    if(!self.cellItemArr){
        self.cellItemArr =[[NSMutableArray alloc]init];
        [self refrishNextUrl];
    }
    
}
-(void)refrishNextUrl;
{
        ListPage* that=self;
       NSMutableDictionary* dic=[[NSMutableDictionary alloc]init];
     if(self.tabidx==3){
               [dic setObject:@"1" forKey:@"idx_begin"];
               [dic setObject:@"10" forKey:@"idx_end"];
               [dic setObject: [DynamicModel default].selfUserInfoVo.username forKey:@"username"];
               [[ DynamicModel default] GetDynamicSelfBlog:PLATFORM_GAME_BLOG_SELF paramDict:dic  PostSuccess:^(NSDictionary *responseJson) {
                   
                   NSMutableArray<DynamicBaseVo*>* arr= [DynamicBaseVo makeListArr:   [responseJson objectForKey:@"result"]];
                   [that pusDataToTabel:arr];
                   dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (ino64_t)(0.1 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
                       [that.tabelListView reloadData];
                   });
               }];
    
           }else{
               [[ DynamicModel default] GetDynamicByValue:[self dataLinkUrl] paramDict:dic  PostSuccess:^(NSDictionary *responseJson) {
                   self.cellItemArr=   [DynamicBaseVo makeListArr:   [responseJson objectForKey:@"blogs"]];
                   [self.tabelListView reloadData];
               }];
           }
}
-(void)pusDataToTabel:(NSArray*)arr
{
    for(int i=0;i<arr.count;i++){
        [self.cellItemArr addObject:arr[0]];
    }
            
}

-(NSString*)dataLinkUrl;
{
   
    switch (self.tabidx) {
        case 0:
            return PLATFORM_GAME_BLOG_LIST_ALL;
            break;
        case 1:
            return PLATFORM_GAME_BLOG_LIST_FOLLOWS;
            break;
        case 2:
            return PLATFORM_GAME_BLOG_LIST_TUIJIAN;
            break;
        case 3:
            return PLATFORM_GAME_BLOG_SELF;
            break;
        default:
            return PLATFORM_GAME_BLOG_LIST_ALL;
            break;
    }
   
    
   // return  PLATFORM_GAME_BLOG_SELF;
    
}
 
 
//重置CELL的高度
-(CGFloat) tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath
{
    DynamicBaseVo *vo=self.cellItemArr[indexPath.row];
    
    return   vo.cellHeight;
    
    
}
 

-(NSInteger) numberOfSectionsInTableView:(UITableView *)tableView{
    return 1;
}
-(NSInteger) tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section{
    
    
    return self.cellItemArr.count;
}

-(UITableViewCell*) tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    DynamicBaseVo * vo=self.cellItemArr[indexPath.row];

    DynamicBaseCell *cell;
    if(vo.tabelVo.vidio_url.length){
        cell= [TabelVideoViewCell makeViewCell:tableView dataVo:vo];
    }else{
        cell= [TableImageViewCell makeViewCell:tableView dataVo:vo];
    }
        cell.delegate=self;
    return cell;
    
    
}
  
/*
 点击发大图片
 */
- (void)imglistClik:(UITableViewCell *)value idx:(NSInteger)idx
{
    TableImageViewCell *cell = (TableImageViewCell *)value;
    NSMutableArray* browserDataArr=[[NSMutableArray alloc]init];
    NSMutableArray*  imagesArr =cell.datavo.images;
    for(int i=0;i<imagesArr.count;i++){
        YBImageBrowseCellData *data = [YBImageBrowseCellData new];
        data.url =     [NSURL URLWithString:imagesArr[i]];
        if(i==0){
            data.sourceObject = cell.img00;
        }
        if(i==1){
            data.sourceObject = cell.img01;
        }
        if(i==2){
            data.sourceObject = cell.img02;
        }
        if(i==3){
            data.sourceObject = cell.img03;
        }
        [browserDataArr addObject:data];
    }
    YBImageBrowser *browser = [YBImageBrowser new];
    browser.dataSourceArray = browserDataArr;
    browser.currentIndex = idx;
    [browser show];
 
}
 
- (void)selectUseHead:(DynamicBaseVo *)value
{
    NSLog(@"selectUseHead");
}
//使用红圈加载
-(void)makeRefreshHeaderGf;
{
    RedBagRefreshGifHeader *header = [RedBagRefreshGifHeader headerWithRefreshingBlock:^{
        
        [self.tabelListView.mj_header endRefreshing];
 
//        self.cellItemArr=nil;
//        [self initFristData];
        
         [self.tabelListView reloadData];
      
        
    }];
    // 设置普通状态的动画图片
    NSMutableArray *idleImages = [NSMutableArray array];
    for (NSUInteger i = 1; i<=24; i++) {
        UIImage *image = [UIImage imageNamed:[NSString stringWithFormat:@"refresh_header_%zd", i]];
        [idleImages addObject:image];
    }
    [header setImages:idleImages forState:MJRefreshStateIdle];
    
    // 设置即将刷新状态的动画图片（一松开就会刷新的状态）
    NSMutableArray *refreshingImages = [NSMutableArray array];
    for (NSUInteger i = 1; i<=24; i++) {
        UIImage *image = [UIImage imageNamed:[NSString stringWithFormat:@"refresh_header_%zd", i]];
        [refreshingImages addObject:image];
    }
    [header setImages:refreshingImages forState:MJRefreshStatePulling];
    [header setTitle:@"" forState:MJRefreshStateRefreshing];
    self.tabelListView.mj_header = header;
    
}

@end
