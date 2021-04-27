//
//  Pan3dListViewController.m
//  StorageStarted
//
//  Created by pan3dme on 2021/4/14.
//  Copyright © 2021 cuiyiran. All rights reserved.
//

#import "Pan3dListViewController.h"
#import "Pan3dListVo.h"
#import "Pan3dListCell.h"
#import "HomeSceneBaseViewController.h"
#import "EditViewController.h"
#import <AVOSCloud/AVOSCloud.h>

 
@interface Pan3dListViewController () <Pan3dListCellDelegate>
@property (nonatomic,strong) NSMutableArray <Pan3dListVo *> *productArr;
@end

@implementation Pan3dListViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.navigationItem.title = @"LeanCloud";
    self.tableView.delegate =self;
    self.tableView.dataSource =self;
}
-(void)viewWillAppear:(BOOL)animated{
    [super viewWillAppear:YES];
    [self.productArr removeAllObjects];
    [self queryProduct];
 
    [AVAnalytics beginLogPageView:@"Pan3dListCell"];
    
}

- (void)viewWillDisappear:(BOOL)animated {
    [super viewWillDisappear:YES];
    [AVAnalytics endLogPageView:@"Pan3dListCell"];
}

#pragma mark -  Private Methods
// LeanCloud - 查询 https://leancloud.cn/docs/leanstorage_guide-objc.html#hash860317
-(void)queryProduct{
 
    _productArr =[[NSMutableArray alloc]init];
    AVQuery *query = [AVQuery queryWithClassName:@"pan3dlist002"];
    query.limit = 20;
    NSSortDescriptor* d=[[NSSortDescriptor alloc]initWithKey:@"createdAt" ascending:NO selector:nil];
    [query orderBySortDescriptor:d];
    [query findObjectsInBackgroundWithBlock:^(NSArray *objects, NSError *error) {
        if (!error) {
            for (NSDictionary *object in objects) {
                Pan3dListVo * product = [Pan3dListVo initWithObject:object];
                [self.productArr addObject:product];
            }
            [self.tableView reloadData];
        }
     
        
    }];
    
}
#pragma mark -  UITableViewDelegate
- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section{
    return self.productArr.count;
}
- (UITableViewCell *)tableView:(UITableView *)tableView  cellForRowAtIndexPath:(NSIndexPath *)indexPath{
    
    Pan3dListCell * cell = [Pan3dListCell cellWithTableView:tableView];
    cell.product = self.productArr[indexPath.row];
    cell.delegate=self;
    return cell;
    
}
- (void)editByCell:(Pan3dListVo *)val
{
    EditViewController* vc=[[EditViewController alloc] init];
       [self.navigationController pushViewController:vc animated:YES];
}
- (void)deleByCell:(Pan3dListVo *)val
{
    UIAlertController *alertController = [UIAlertController alertControllerWithTitle:@"提示" message:@"确定是否删除记录" preferredStyle:UIAlertControllerStyleAlert];
    
    [alertController addAction:[UIAlertAction actionWithTitle:@"确定" style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
     
        AVObject *todo = [AVObject objectWithClassName:@"pan3dlist002" objectId:val.objectId];
        [todo deleteInBackground];
        
        [self queryProduct];
        
    }]];
    [alertController addAction:[UIAlertAction actionWithTitle:@"取消" style:UIAlertActionStyleDefault handler:nil]];

 

    [self presentViewController:alertController animated:true completion:nil];

}


- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath{
    return self.productArr[indexPath.row].cellHeight;
}
-(void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
     
    Pan3dListVo *wbF = [self.productArr objectAtIndex:indexPath.row];
 
    [self.navigationController pushViewController:[[HomeSceneBaseViewController alloc]init:wbF.sceneinfo] animated:YES];
 
 
}

-(NSMutableArray<Pan3dListVo *> *)productArr{
    if (!_productArr) {
        _productArr =[NSMutableArray array];
    }
    return _productArr;
}
 
@end

