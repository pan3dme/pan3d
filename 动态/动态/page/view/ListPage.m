//
//  ListPage.m
//  动态
//
//  Created by zhao on 16/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "ListPage.h"
#import "DynamicBaseCell.h"
#import "DynamicBaseVo.h"
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
     [self.cellItemArr addObject:[self makeTempVo]];
//    [self.cellItemArr addObject:[self makeTempVo]];
//    [self.cellItemArr addObject:[self makeTempVo]];
//    [self.cellItemArr addObject:[self makeTempVo]];
    
    
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
-(DynamicBaseVo*)makeTempVo;
{
    DynamicBaseVo *vo=[[DynamicBaseVo alloc]init];
    
    return vo;
}
//重置CELL的高度
-(CGFloat) tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath
{
    DynamicBaseVo *vo=self.cellItemArr[indexPath.section];
    
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
    DynamicBaseVo * vo=self.cellItemArr[indexPath.section];
    
    DynamicBaseCell *cell=[tableView dequeueReusableCellWithIdentifier:DynamicBaseCell.CELL_STR];
    if(cell==nil){
        cell=[[DynamicBaseCell alloc]initWithStyle:UITableViewCellStyleSubtitle reuseIdentifier:DynamicBaseCell.CELL_STR];
    }
    cell.delegate=self;
    [cell setDatavo:vo];
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
