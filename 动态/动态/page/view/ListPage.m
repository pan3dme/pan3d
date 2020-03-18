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
@interface ListPage ()
<
DynamicBaseCellDelegate,
UITableViewDelegate,
UITableViewDataSource
>
@property(nonatomic,strong)UITableView *tabelListView;
@property (nonatomic, strong)  NSMutableArray<DynamicBaseVo*>* cellItemArr;
@property (nonatomic, assign) CGRect fristFrame; // 存储每次要展示的图片frame, 方便缩小时使用
@property (nonatomic, strong) UIImageView *fullImageView; // 全屏展示的视图
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

 
// 懒加载全屏视图
- (UIImageView *)fullImageView
{
    if (_fullImageView == nil) {
          
        // 视图和屏幕一样大
        _fullImageView = [[UIImageView alloc] initWithFrame:[UIScreen mainScreen].bounds];
          
        // 设置为可交互, 不然, 后面的手势根本不能用
        _fullImageView.userInteractionEnabled = YES;
          
        // 添加点击手势 ( 缩小图片时使用 )
        [_fullImageView addGestureRecognizer:[[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(actionTap2:)]];
          
        // 设置视图内容填充模式.
        _fullImageView.contentMode = UIViewContentModeScaleAspectFit;
          
    }
    return _fullImageView;
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
        [[ DynamicModel default] GetDynamicByValue:[self dataLinkUrl] beginId:@"0" count:@"10" PostSuccess:^(NSDictionary *responseJson) {
             self.cellItemArr=   [DynamicBaseVo makeListArr:   [responseJson objectForKey:@"blogs"]];
             [self.tabelListView reloadData];
         }];
    }
 
}
-(NSString*)dataLinkUrl;
{
    
    switch (self.tabidx) {
        case 0:
            return PLATFORM_GAME_BLOG_LIST_TUIJIAN;
            break;
        case 1:
            return PLATFORM_GAME_BLOG_LIST_FOLLOWS;
            break;
        case 2:
            return PLATFORM_GAME_BLOG_LIST_ALL;
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
- (void)imglistClik:(UITableViewCell *)value img:(nonnull UIImageView *)img pos:(CGPoint)pos;
{

    NSLog(@"---%f",img.frame.origin.y);
    TableImageViewCell *cell = (TableImageViewCell *)value;
   // UIImageView *imageView = cell.img00;
    CGRect aFrame = [value convertRect:value.bounds toView:self];
    CGRect bewFrame = [img convertRect:img.bounds toView:cell];
    self.fristFrame = CGRectMake(bewFrame.origin.x+aFrame.origin.x, bewFrame.origin.y+aFrame.origin.y+80.0f, bewFrame.size.width, bewFrame.size.height);
    
    
    self.fullImageView.image = img.image;
    self.fullImageView.frame = self.fristFrame;
    self.fullImageView.backgroundColor = [UIColor blackColor];
    UIWindow * currentwindow = [[UIApplication sharedApplication] keyWindow];
    [currentwindow addSubview:self.fullImageView];
    [UIView animateWithDuration:0.2 animations:^{
        self.fullImageView.frame = [UIScreen mainScreen].bounds;
    }];
}
-(void)actionTap2:(UITapGestureRecognizer *)sender{
    self.fullImageView.backgroundColor = [UIColor clearColor];
    [UIView animateWithDuration:0.2 animations:^{
        self.fullImageView.frame = self.fristFrame; // 动画缩小到初始位置
    } completion:^(BOOL finished) {
        [self.fullImageView removeFromSuperview];// 从父视图中移除全屏视图
    }];
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
