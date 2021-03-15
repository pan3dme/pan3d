//
//  ListViewController.m
//  iosgl
//
//  Created by pan3dme on 2021/3/12.
//  Copyright © 2021 zhao. All rights reserved.
//

#import "ListViewController.h"
#import "WeiboCell.h"
 
#import "WeiboFrame.h"

#define NavigationBar_H 65.f
#define TabBar_H 100.f
@interface ListViewController ()
@property (nonatomic ,strong) UIView *bgBaseUiView;
@property (nonatomic ,strong) UIView *statusBar;
@property (nonatomic, strong) NSArray *statusFrames;
@property (nonatomic, strong) UITableView *uiTableView;
@end

@implementation ListViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    [self addViews];
    [self addUiTableView];
    [self setupStatusBarColor:[UIColor whiteColor]];
    
}
-(void)addViews
{
    [self statusFrames];
    self.bgBaseUiView=[[UIView alloc]init];
    self.bgBaseUiView.backgroundColor=[UIColor grayColor];
    [self.view addSubview: self.bgBaseUiView];
    
    UIView* tempUi=[[UIView alloc]initWithFrame:CGRectMake(10, 10, 100, 100)];
    tempUi.backgroundColor=[UIColor redColor];
    [self.bgBaseUiView addSubview:tempUi];
}
-(void)addUiTableView
{
    self.uiTableView=[[UITableView alloc]init];
    [self.bgBaseUiView addSubview:self.uiTableView];
    
    self.uiTableView.delegate=self;
    self.uiTableView.dataSource=self;
    
    
}
- (void)viewDidLayoutSubviews
{
    self.bgBaseUiView.frame=CGRectMake(0.f, CGRectGetMaxY(_statusBar.frame), self.view.bounds.size.width,[UIScreen mainScreen].bounds.size.height- NavigationBar_H-TabBar_H);
    
    
    self.uiTableView.frame=CGRectMake(0,0,self.bgBaseUiView.frame.size.width,self.bgBaseUiView.frame.size.height);
    
    self.uiTableView.backgroundColor=[UIColor redColor];
}

- (void)setupStatusBarColor:(UIColor *)color
{
    if (!_statusBar) {
        UIWindow *keyWindow = [UIApplication sharedApplication].windows[0];
        CGRect rect=CGRectMake(0, 0, [UIScreen mainScreen].bounds.size.width, NavigationBar_H);
        _statusBar = [[UIView alloc] initWithFrame:rect];
        [keyWindow addSubview:_statusBar];
    }
    if ([_statusBar respondsToSelector:@selector(setBackgroundColor:)]) {
        _statusBar.backgroundColor = color;
    }
}


#pragma mark--
#pragma mark  懒加载
-(NSArray *)statusFrames{
    if (_statusFrames==nil) {
 
      
        NSMutableArray *models = [NSMutableArray arrayWithCapacity:10];
        for (int i=0;i<10;i++) {
       
            WeiboFrame *wbF = [[WeiboFrame alloc] init];
            [wbF setWeiboInfo];
    
            [models addObject:wbF];
        }
        self.statusFrames = [models copy];
    }
    return _statusFrames;
}

#pragma mark--
#pragma mark  UITableViewDataSource
- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    return self.statusFrames.count;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    WeiboCell *cell = [WeiboCell cellWithTableView:tableView];
    //设置数据
    cell.weiboFrame = self.statusFrames[indexPath.row];
    
    return cell;
}

#pragma mark--
#pragma mark  UITableViewDelegate
- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath{
    //取出对应行的frame模型
    WeiboFrame *wbF = [_statusFrames objectAtIndex:indexPath.row];
    NSLog(@"height = %f",wbF.cellHeight);
    return wbF.cellHeight;
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
