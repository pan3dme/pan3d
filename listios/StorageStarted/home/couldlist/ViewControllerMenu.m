//
//  ViewController.m
//  XLBasePage
//
//  Created by apple on 17/3/24.
//  Copyright © 2017年 ZXL. All rights reserved.
//

#import "ViewControllerMenu.h"
#import "SDCycleScrollView.h"
#import "Pan3dListViewController.h"
 
@interface ViewControllerMenu () <XLBasePageControllerDelegate,XLBasePageControllerDataSource,SDCycleScrollViewDelegate>

@property (nonatomic,strong) NSArray *titleArray;
@property (nonatomic,strong) UIView *headerView;

@end

@implementation ViewControllerMenu

- (void)viewDidLoad {
    [super viewDidLoad];
    
    self.view.backgroundColor = [UIColor colorWithWhite:0.2 alpha:0.2];
    self.view.backgroundColor = [UIColor whiteColor];
    
    _titleArray = @[@"全部",@"场景",@"角色",@"特效",@"技能",@"MD5",@"动画",@"其它",@"更多"];

    
    self.delegate = self;
    self.dataSource = self;
    
    //self.lineWidth = 2.0;//选中下划线宽度
    self.titleFont = [UIFont systemFontOfSize:16.0];
    self.defaultColor = [UIColor blackColor];//默认字体颜色
    self.chooseColor = [UIColor redColor];//选中字体颜色
    self.selectIndex = 0;//默认选中第几页
    
    [self reloadScrollPage];
}
-(void)reloadScrollPage
{
    [super reloadScrollPage];
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
//        UILabel *label = [[UILabel alloc] initWithFrame:CGRectMake(0, 10, self.view.bounds.size.width, 40)];
//        label.textColor = [UIColor grayColor];
//        label.font = [UIFont systemFontOfSize:12.0];
//        label.text = @"固定的头View,不可跟随滑动,可不显示";
//        label.textAlignment = NSTextAlignmentCenter;
//        [_headerView addSubview:label];
        
       
        
        // 情景二：采用网络图片实现
        NSArray *imagesURLStrings = @[
                               @"https://ss2.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/super/whfpf%3D425%2C260%2C50/sign=a4b3d7085dee3d6d2293d48b252b5910/0e2442a7d933c89524cd5cd4d51373f0830200ea.jpg",
                               @"https://ss0.baidu.com/-Po3dSag_xI4khGko9WTAnF6hhy/super/whfpf%3D425%2C260%2C50/sign=a41eb338dd33c895a62bcb3bb72e47c2/5fdf8db1cb134954a2192ccb524e9258d1094a1e.jpg",
                               @"http://c.hiphotos.baidu.com/image/w%3D400/sign=c2318ff84334970a4773112fa5c8d1c0/b7fd5266d0160924c1fae5ccd60735fae7cd340d.jpg"
                               ];
       
        
        // 情景三：图片配文字
        NSArray *titles = @[@"新建交流QQ群：185534916 ",
                            @"disableScrollGesture可以设置禁止拖动",
                            @"感谢您的支持，如果下载的",
                            @"如果代码在使用过程中出现问题",
                            @"您可以发邮件到gsdios@126.com"
                            ];
        
        CGFloat w = self.view.bounds.size.width;
        
        

     
        
    // >>>>>>>>>>>>>>>>>>>>>>>>> demo轮播图2 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        
        // 网络加载 --- 创建带标题的图片轮播器
        SDCycleScrollView *cycleScrollView2 = [SDCycleScrollView cycleScrollViewWithFrame:CGRectMake(0, 0, w, 150) delegate:self placeholderImage:[UIImage imageNamed:@"placeholder"]];
        
        cycleScrollView2.pageControlAliment = SDCycleScrollViewPageContolAlimentRight;
        cycleScrollView2.titlesGroup = titles;
        cycleScrollView2.currentPageDotColor = [UIColor whiteColor]; // 自定义分页控件小圆标颜色
        [_headerView addSubview:cycleScrollView2];
        
        //         --- 模拟加载延迟
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.3 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
            cycleScrollView2.imageURLStringsGroup = imagesURLStrings;
        });
        
        
    }
    return _headerView;
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
