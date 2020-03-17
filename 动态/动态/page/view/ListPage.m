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
#import "RedBagRefreshGifHeader.h"
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
    
    self.cellItemArr=[[NSMutableArray alloc]init];
    UITableView* temp=[[UITableView alloc]initWithFrame:self.bounds style:UITableViewStylePlain];
    temp.autoresizingMask = UIViewAutoresizingFlexibleHeight | UIViewAutoresizingFlexibleWidth;
    temp.backgroundColor=[UIColor whiteColor];
    
    temp.delegate=self;
    temp.dataSource=self;
    self.tabelListView=temp;
    [self addSubview:temp];
    [self makeRefreshHeaderGf];
    self.backgroundColor=[UIColor clearColor];
    
    [self loadWebData];
}
-(void)loadWebData;
{
    NSMutableDictionary* dic=[[NSMutableDictionary alloc]init];
    [dic setObject:@"0" forKey:@"begin_id"];
    [dic setObject:@"10" forKey:@"count"];
    NSString *URL= [ NSString stringWithFormat:@"http://34.87.12.20:20080/%@",PLATFORM_GAME_BLOG_LIST_ALL ];
    [[NetHttpsManager default] POSTWithUrl:URL paramDict:dic OverTime:100 successBlock:^(NSDictionary *responseJson) {
        
        self.cellItemArr=       [DynamicBaseVo makeListArr:   [responseJson objectForKey:@"blogs"]];
        [self.tabelListView reloadData];
        
    } FailureBlock:^(NSError *error) {
        
    }];
}
-(DynamicBaseVo*)makeTempVo;
{
    DynamicBaseVo *vo=[[DynamicBaseVo alloc]init];
    
    return vo;
}
//重置CELL的高度
-(CGFloat) tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath
{
    DynamicBaseVo *vo=self.cellItemArr[indexPath.row];
    
    return   vo.cellHeight;
    
    
}

-(NSInteger) numberOfSectionsInTableView:(UITableView *)tableView{
    return _cellItemArr.count;
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
- (void)selectUseHead:(DynamicBaseVo *)value
{
    NSLog(@"selectUseHead");
}
//使用红圈加载
-(void)makeRefreshHeaderGf;
{
    RedBagRefreshGifHeader *header = [RedBagRefreshGifHeader headerWithRefreshingBlock:^{
        
        [self.tabelListView.mj_header endRefreshing];
        
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
