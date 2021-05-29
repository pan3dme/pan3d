//
//  ViewController.m
//  XLBasePage
//
//  Created by apple on 17/3/24.
//  Copyright © 2017年 ZXL. All rights reserved.
//

#import "ViewControllerMenu.h"
#import "SDCycleScrollView.h"
#import "Pan3dListVo.h"
#import <AVOSCloud/AVOSCloud.h>
#import "Pan3dListViewController.h"
#import "HomeSceneBaseViewController.h"
 
@interface ViewControllerMenu () <XLBasePageControllerDelegate,XLBasePageControllerDataSource,SDCycleScrollViewDelegate>

@property (nonatomic,strong) NSMutableArray *titleArray;
@property (nonatomic,strong) UIView *headerView;
@property (nonatomic,strong) NSMutableArray <Pan3dListVo *> *productArr;

@end

 
@implementation ViewControllerMenu
 
- (void)viewDidLoad {
    [super viewDidLoad];
    
    self.view.backgroundColor = [UIColor colorWithWhite:0.2 alpha:0.2];
    self.view.backgroundColor = [UIColor whiteColor];
 
    self.delegate = self;
    self.dataSource = self;
 
    self.titleFont = [UIFont systemFontOfSize:16.0];
    self.defaultColor = [UIColor blackColor];//默认字体颜色
    self.chooseColor = [UIColor redColor];//选中字体颜色
    self.selectIndex = 0;//默认选中第几页
 
    
    [self readColudTags];
  
}
 
-(void)readColudTags
{
    _titleArray=[[NSMutableArray alloc]init];
    [_titleArray addObject:@"全部"];
    AVQuery *query = [AVQuery queryWithClassName:@"tags"];
    [query orderBySortDescriptor:[[NSSortDescriptor alloc]initWithKey:@"sort" ascending:YES selector:nil]];
    [query findObjectsInBackgroundWithBlock:^(NSArray *objects, NSError *error) {
        if (!error) {
            for (NSDictionary *object in objects) {
              NSString* str=  [object objectForKey:@"name"];
                [_titleArray addObject:str];
                [self reloadScrollPage];
            }
            
        }
    }];
}
 
-(NSInteger)numberViewControllersInViewPager:(XLBasePageController *)viewPager
{
    return _titleArray.count;
}

-(UIViewController *)viewPager:(XLBasePageController *)viewPager indexViewControllers:(NSInteger)index
{
   
   
    Pan3dListViewController *detailVC = [[Pan3dListViewController alloc] init:_titleArray[index]];
    detailVC.index = index;
    return detailVC;
    
}

-(CGFloat)heightForTitleViewPager:(XLBasePageController *)viewPager
{
    return 50;
}

-(NSString *)viewPager:(XLBasePageController *)viewPager titleWithIndexViewControllers:(NSInteger)index
{
    return self.titleArray[index];
}

-(void)viewPagerViewController:(XLBasePageController *)viewPager didFinishScrollWithCurrentViewController:(UIViewController *)viewController
{
    self.title = viewController.title;
}

#pragma mark 预留--可不实现

-(UIView *)headerViewForInViewPager:(XLBasePageController *)viewPager
{
    return self.headerView;
}

-(CGFloat)heightForHeaderViewPager:(XLBasePageController *)viewPager
{
    return 150;
}

-(UIView *)headerView
{
    if (_headerView == nil) {
        _headerView = [[UIView alloc] init];
        _headerView.backgroundColor = [UIColor colorWithRed:120/255.0f green:210/255.0f blue:249/255.0f alpha:1];
 
        CGFloat w = self.view.bounds.size.width;
        SDCycleScrollView *cycleScrollView2 = [SDCycleScrollView cycleScrollViewWithFrame:CGRectMake(0, 0, w, 150) delegate:self placeholderImage:[UIImage imageNamed:@"placeholder"]];
        
        cycleScrollView2.pageControlAliment = SDCycleScrollViewPageContolAlimentRight;
        cycleScrollView2.currentPageDotColor = [UIColor whiteColor]; // 自定义分页控件小圆标颜色
        [_headerView addSubview:cycleScrollView2];
        [self loadBanerData:cycleScrollView2];

 
    }
    return _headerView;
}
-(void)loadBanerData :(SDCycleScrollView*)cycleScrollView{
  
    _productArr=[[NSMutableArray alloc]init];
    AVQuery *query = [AVQuery queryWithClassName:@"pan3dlist002"];
    [query whereKey:@"bannerimage" notEqualTo:@""];
    query.limit = 5;
    NSSortDescriptor* d=[[NSSortDescriptor alloc]initWithKey:@"createdAt" ascending:NO selector:nil];
    [query orderBySortDescriptor:d];
    [query findObjectsInBackgroundWithBlock:^(NSArray *objects, NSError *error) {
        if (!error) {
            NSMutableArray* picArr= [[NSMutableArray alloc] init];
            NSMutableArray* tittleArr= [[NSMutableArray alloc] init];
            for (NSDictionary *object in objects) {
                Pan3dListVo * product = [Pan3dListVo initWithObject:object];
                [_productArr addObject:product];
                NSString* url=   [NSString stringWithFormat:@"%@%@", @"https://webpan.oss-cn-shanghai.aliyuncs.com/pan/leancloud/",product.bannerimage];
                [picArr addObject:url];
                [tittleArr addObject:product.title];
         
            }
            cycleScrollView.imageURLStringsGroup = picArr;
            cycleScrollView.titlesGroup = tittleArr;
        }
     
        
    }];
    
}
#pragma mark - SDCycleScrollViewDelegate

- (void)cycleScrollView:(SDCycleScrollView *)cycleScrollView didSelectItemAtIndex:(NSInteger)index
{
    NSLog(@"---点击了第%ld张图片", (long)index);
  
    [self.navigationController pushViewController:[[HomeSceneBaseViewController alloc]init:[_productArr objectAtIndex:index].sceneinfo] animated:YES];
 
}
 

@end
