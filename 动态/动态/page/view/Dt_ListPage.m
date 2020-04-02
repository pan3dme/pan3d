//
//  ListPage.m
//  动态
//
//  Created by zhao on 16/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//
#import "Header.h"
#import "Dt_ListPage.h"
#import "Dt_DynamicBaseCell.h"
#import "DynamicBaseVo.h"
#import "Dt_TableImageViewCell.h"
#import "Dt_TabelVideoViewCell.h"
#import "NetHttpsManager.h"
#import "Dt_DynamicModel.h"
#import "Dt_RefreshGifHeader.h"
#import "YBImageBrowser.h"
#import <SDWebImage/UIImageView+WebCache.h>


@interface Dt_ListPage ()
<

DynamicBaseCellDelegate,
UITableViewDelegate,
UITableViewDataSource
>
@property(nonatomic,strong)UITableView *tabelListView;
@property(nonatomic,strong)UIImageView *listBgimgView;
@property (nonatomic, strong)  NSMutableArray<DynamicBaseVo*>* cellItemArr;
//blank_img
@end
@implementation Dt_ListPage

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
    temp.separatorStyle = UITableViewCellSeparatorStyleNone;
    temp.delegate=self;
    temp.dataSource=self;
    self.tabelListView=temp;
    [self addSubview:temp];
    [self makeRefreshHeaderGf];
    self.backgroundColor=[UIColor clearColor];
    
      
    
    self.listBgimgView=[[UIImageView alloc]initWithImage:[UIImage imageNamed:@"blank_img"]];
    self.listBgimgView.frame=CGRectMake(0, 0, 200, 200);
    self.listBgimgView.userInteractionEnabled=NO;
   // [self.tabelListView addSubview:  self.listBgimgView];
    self.listBgimgView.hidden=YES;
    
}
- (void)layoutSubviews
{
    self.listBgimgView.frame=CGRectMake((self.width-200)/2, (self.height-200)/2, 200, 200);
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
    Dt_ListPage* that=self;
    NSMutableDictionary* dic=[[NSMutableDictionary alloc]init];
    if(self.tabidx==3){
        [dic setObject:@"1" forKey:@"idx_begin"];
        [dic setObject:@"10" forKey:@"idx_end"];
        [dic setObject: [Dt_DynamicModel default].selfUserInfoVo.username forKey:@"username"];
        [[ Dt_DynamicModel default] GetDynamicSelfBlog:PLATFORM_GAME_BLOG_SELF paramDict:dic  PostSuccess:^(NSDictionary *responseJson) {
            
            NSMutableArray<DynamicBaseVo*>* arr= [DynamicBaseVo makeListArr:   [responseJson objectForKey:@"result"]];
            dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (ino64_t)(0.1 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
                
                
                [that.cellItemArr removeAllObjects];
                [that pusDataToTabel:arr];
                [that.tabelListView reloadData];
                
            });
        }];
        
    }else{
        [[ Dt_DynamicModel default] GetDynamicByValue:[self dataLinkUrl] paramDict:dic  PostSuccess:^(NSDictionary *responseJson) {
            
            [that pusDataToTabel:[DynamicBaseVo makeListArr:   [responseJson objectForKey:@"blogs"]]];
            [self.tabelListView reloadData];
        }];
    }
}
-(void)pusDataToTabel:(NSArray*)arr
{
    for(int i=0;i<arr.count;i++){
        [self.cellItemArr addObject:arr[i]];
    }
    
    if(self.cellItemArr.count){
        self.listBgimgView.hidden=YES;
    }else{
        self.listBgimgView.hidden=NO;
    }
    
}

- (void)clikOpenMsgPanel:(DynamicBaseVo *)value
{
    [_delegate clikOpenMsgPanel:value];
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
    
    Dt_DynamicBaseCell *cell;
    if(vo.tabelVo.vidio_url.length){
        cell= [Dt_TabelVideoViewCell makeViewCell:tableView dataVo:vo];
    }else{
        cell= [Dt_TableImageViewCell makeViewCell:tableView dataVo:vo];
    }
    cell.delegate=self;
    return cell;
    
    
}

/*
 点击发大图片
 */
- (void)imglistClik:(UITableViewCell *)value idx:(NSInteger)idx
{
    Dt_TableImageViewCell *cell = (Dt_TableImageViewCell *)value;
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
    Dt_RefreshGifHeader *header = [Dt_RefreshGifHeader headerWithRefreshingBlock:^{
        [self.tabelListView.mj_header endRefreshing];
        [self refrishNextUrl];
 
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
- (void)listReloadData;
{
        [self.tabelListView reloadData];
}
- (void)deleSelectCell:(DynamicBaseVo *)value
{
    [self.cellItemArr removeObject:value];
    [self.tabelListView reloadData];
}
-(void)refrishAddNewMsg;
{
    [self refrishNextUrl];
}
@end
