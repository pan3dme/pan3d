//
//  ListViewController.m
//  iosgl
//
//  Created by pan3dme on 2021/3/12.
//  Copyright © 2021 zhao. All rights reserved.
//

#import "ListViewController.h"
#import "WeiboCell.h"
#import "LoadManager.h"
#import "WeiboFrameVo.h"
#import "HomeSceneBaseViewController.h"

#define NavigationBar_H 65.f
#define TabBar_H 100.f
@interface ListViewController ()
 
 
@property (nonatomic, strong) UITableView *uiTableView;
@property (nonatomic, strong) NSMutableArray* userList;
 
@end

@implementation ListViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    [self addUiTableView];
//    [self setupStatusBarColor:[UIColor whiteColor]];
    [self loadXmlByUrl];
}
-(void)addUiTableView
{
    self.uiTableView=[[UITableView alloc]initWithFrame:self.view.bounds];
    [self.view addSubview:self.uiTableView];
    self.view.backgroundColor=[UIColor yellowColor];
    self.uiTableView.delegate=self;
    self.uiTableView.dataSource=self;
    
}
-(void)loadXmlByUrl
{
    NSString* netUrl = @"https://webpan.oss-cn-shanghai.aliyuncs.com/res/pan/test/iosmetia/jason10.xml";
 
    [[LoadManager default] loadUrl:netUrl type:LoadManager.XML_TYPE fun:^(NSString* value) {
        NSDictionary* dic=(NSDictionary*)value;
     
        NSString *jsonString=[NSString stringWithContentsOfFile:  dic[@"data"] encoding:NSUTF8StringEncoding error:nil];
         
        [self makeDicByString:jsonString];
 
    }];
    
    
    
}
-(void)makeDicByString:(NSString*)val
{
    NSData *jsonData = [val dataUsingEncoding:NSUTF8StringEncoding];
      NSError *err;
      NSArray *arr = [NSJSONSerialization JSONObjectWithData:jsonData
                                                          options:NSJSONReadingMutableContainers
                                                            error:&err];
   
    self.userList=[[NSMutableArray alloc]init];
    for (NSUInteger i=0; i<arr.count; i++) {
        WeiboFrameVo *wbF=[[WeiboFrameVo alloc] init];
        [wbF setWeiboInfo:[arr objectAtIndex:i]];
        [self.userList addObject:wbF];
        
    }
 
    [self.uiTableView reloadData];
}
 


- (void)viewDidLayoutSubviews
{
    
//    self.uiTableView.frame=CGRectMake(0, 0, 200, 200);
 
}

- (void)setupStatusBarColor:(UIColor *)color
{
    /*
    if (!_statusBar) {
        UIWindow *keyWindow = [UIApplication sharedApplication].windows[0];
        CGRect rect=CGRectMake(0, 0, [UIScreen mainScreen].bounds.size.width, NavigationBar_H);
        _statusBar = [[UIView alloc] initWithFrame:rect];
        [keyWindow addSubview:_statusBar];
    }
    if ([_statusBar respondsToSelector:@selector(setBackgroundColor:)]) {
        _statusBar.backgroundColor = color;
    }
    */
}


 

#pragma mark--
#pragma mark  UITableViewDataSource
- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    return self.userList.count;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    WeiboCell *cell = [WeiboCell cellWithTableView:tableView];
    cell.weiboFramedelegate=self;
    //设置数据
    cell.weiboFrame = self.self.userList[indexPath.row];
 
    
    return cell;
}
-(void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
     
    WeiboFrameVo *wbF = [self.userList objectAtIndex:indexPath.row];
    
    HomeSceneBaseViewController *vc=[[HomeSceneBaseViewController alloc]init:wbF.sceneinfo]   ;
    [self.navigationController pushViewController:vc animated:YES];
 
 
}


 
 
- (CGFloat)tableView:(UITableView *)tableView heightForHeaderInSection:(NSInteger)section{
    return 10;
}
 
//- (CGFloat)tableView:(UITableView *)tableView heightForFooterInSection:(NSInteger)section{
//    return 0.00001;
//}
 
- (UIView *)tableView:(UITableView *)tableView viewForHeaderInSection:(NSInteger)section{
    UIView *headView = [[UIView alloc]init];
    headView.backgroundColor = [UIColor redColor];
    return headView;
}
 
 
#pragma mark--
#pragma mark  UITableViewDelegate
- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath{
    //取出对应行的frame模型
    WeiboFrameVo *wbF = [self.userList objectAtIndex:indexPath.row];
    NSLog(@"height = %f",wbF.cellHeight);
 
    return wbF.cellHeight;
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}
- (void)myViewClik:(WeiboFrameVo *)val
{
    NSLog(@"ccav%@",val.text);
    

}

@end
