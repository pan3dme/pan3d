//
//  ListViewController.m
//  iosgl
//
//  Created by pan3dme on 2021/3/12.
//  Copyright © 2021 zhao. All rights reserved.
//

#import "ListViewController.h"

@interface ListViewController ()<UITableViewDelegate,UITableViewDataSource>
@property (nonatomic ,strong) UITableView *tableView;
//有几组
@property (nonatomic ,strong) NSMutableArray *sectionArr;
//标记有多少组section和对应的展开或者合并的状态
@property (nonatomic ,strong) NSMutableArray *indexRowArr;
@end

@implementation ListViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.tableView = [[UITableView alloc] initWithFrame:self.view.bounds];
    self.tableView.backgroundColor = [UIColor whiteColor];
    self.tableView.delegate = self;
    self.tableView.dataSource = self;
    [self.view addSubview:self.tableView];
    [self makeSuoreArray];
}
-(void)layoutSubviews
{
    
    self.tableView.frame = self.view.bounds;
}



#pragma  数据源数组
-(void)makeSuoreArray
{
    self.sectionArr = [NSMutableArray array];
    self.indexRowArr = [NSMutableArray array];
    for (int i = 0; i < 6; i++) {
        //添加每一组cell
        NSMutableArray *cellArr = [NSMutableArray array];
        for(int j = 0; j < arc4random()%10 + 1; j ++){
            NSString * cellStr = [NSString stringWithFormat:@"第%d行cell",j];
            [cellArr addObject:cellStr];
        }
        [self.sectionArr addObject:cellArr];
        [self.indexRowArr addObject:@"0"];
    }
    NSLog(@"%@",self.sectionArr);
}



#pragma arguments datasource
-(NSInteger)numberOfSectionsInTableView:(UITableView *)tableView
{
    return self.sectionArr.count;
}

- (NSInteger)tableView:(nonnull UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    NSArray *array = self.sectionArr[section];
    return array.count;
}
-(UIView *)tableView:(UITableView *)tableView viewForHeaderInSection:(NSInteger)section
{
    UILabel *sectionHeardLabel = [[UILabel alloc] init];//WithFrame:CGRectMake(0, 0, self.view.frame.size.width,(self.view.frame.size.height - 2 * 64)/6)];
    sectionHeardLabel.text = [NSString stringWithFormat:@"第%ld组",(long)section];
    sectionHeardLabel.backgroundColor = [UIColor orangeColor];
    sectionHeardLabel.textAlignment = NSTextAlignmentCenter;
    sectionHeardLabel.textColor = [UIColor redColor];
    sectionHeardLabel.tag = section + 10;
    sectionHeardLabel.userInteractionEnabled = YES;
    
    //圆角
    sectionHeardLabel.layer.cornerRadius = 10;
    sectionHeardLabel.layer.borderWidth = 1;
    sectionHeardLabel.layer.masksToBounds = YES;
    //添加手势
    UITapGestureRecognizer *tap = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(openlist:)];
    [sectionHeardLabel addGestureRecognizer:tap];
    return sectionHeardLabel;
    
    
}
- (nonnull UITableViewCell *)tableView:(nonnull UITableView *)tableView cellForRowAtIndexPath:(nonnull NSIndexPath *)indexPath {
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"lxy"];
    if (cell == nil) {
        cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleValue1 reuseIdentifier:@"lxy"];
    }
    cell.textLabel.text = [NSString stringWithFormat:@"第%ld组的第%ld行",(long)indexPath.section,(long)indexPath.row];
    cell.clipsToBounds = YES;
    return cell;
}



#pragma 手势
-(void)openlist:(UITapGestureRecognizer *)tap
{
    NSLog(@"我点击了%ld行",tap.view.tag);
    int index = tap.view.tag % 10;
    NSMutableArray *indexArray = [NSMutableArray array];
    NSArray *arr = self.sectionArr[index];
    for (int i = 0; i < arr.count; i++) {
        NSIndexPath *indexPath = [NSIndexPath indexPathForRow:i inSection:index];
        [indexArray addObject:indexPath];
    }
    if ([self.indexRowArr[index] isEqualToString:@"0"]) {
        self.indexRowArr[index] = @"1";
        [self.tableView reloadRowsAtIndexPaths:indexArray withRowAnimation:UITableViewRowAnimationBottom];
    }else
    {
        self.indexRowArr[index] = @"0";
        [self.tableView reloadRowsAtIndexPaths:indexArray withRowAnimation:UITableViewRowAnimationTop];
    }
}

-(CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath
{
    if([self.indexRowArr[indexPath.section] isEqualToString:@"0"])
    {
        return 0;
    }else{
        return 120;
    }
}

-(CGFloat)tableView:(UITableView *)tableView heightForHeaderInSection:(NSInteger)section
{
    return self.view.frame.size.height /6;
}
-(CGFloat)tableView:(UITableView *)tableView heightForFooterInSection:(NSInteger)section
{
    return 150;
}

@end
