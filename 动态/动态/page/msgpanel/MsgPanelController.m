//
//  MsgPanelController.m
//  动态
//
//  Created by zhao on 20/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "MsgPanelController.h"
#import "DynamicBaseCell.h"
#import "TabelVideoViewCell.h"
#import "TableImageViewCell.h"
#import "DynamicBaseCell.h"
#import "RedBagRefreshGifHeader.h"

@interface MsgPanelController ()
<
UITableViewDelegate,
UITableViewDataSource,
DynamicBaseCellDelegate,
UIScrollViewDelegate
>

@property(nonatomic,strong)UITableView *tabelListView;


@end
static MsgPanelController *msgPanelController = nil;
@implementation MsgPanelController
+ (instancetype)default;
{
    if (msgPanelController == nil) {
        msgPanelController = [[MsgPanelController alloc] init];
    }
    return msgPanelController;
}
- (void)viewDidLoad {
    [super viewDidLoad];
    
    [self initBaseUi];
}
-(void)initBaseUi;
{

    UITableView* temp=[[UITableView alloc]initWithFrame:self.view.bounds style:UITableViewStylePlain];
    temp.autoresizingMask = UIViewAutoresizingFlexibleHeight | UIViewAutoresizingFlexibleWidth;
    temp.backgroundColor=[UIColor whiteColor];
    temp.separatorStyle = UITableViewCellSeparatorStyleNone;
    temp.delegate=self;
    temp.dataSource=self;
    self.tabelListView=temp;
    [self.view addSubview:temp];
    [self makeRefreshHeaderGf];
    self.view.backgroundColor=[UIColor clearColor];
}
- (void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
    
    [self.tabelListView reloadData];
}

//重置CELL的高度
-(CGFloat) tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath
{
    return   self.dynamicBaseVo.cellHeight;
}
-(NSInteger) numberOfSectionsInTableView:(UITableView *)tableView{
    return 1;
}
-(NSInteger) tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section{
    return 1; //数量
}

-(UITableViewCell*) tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    DynamicBaseVo * vo=self.dynamicBaseVo;
    
    DynamicBaseCell *cell;
    if(vo.tabelVo.vidio_url.length){
        cell= [TabelVideoViewCell makeViewCell:tableView dataVo:vo];
    }else{
        cell= [TableImageViewCell makeViewCell:tableView dataVo:vo];
    }
    cell.delegate=self;
    return cell;
    
    
}
 //使用红圈加载
 -(void)makeRefreshHeaderGf;
 {
     RedBagRefreshGifHeader *header = [RedBagRefreshGifHeader headerWithRefreshingBlock:^{
         [self.tabelListView.mj_header endRefreshing];
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
