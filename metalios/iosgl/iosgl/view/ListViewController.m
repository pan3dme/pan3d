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
#import "ParticleUiViewController.h"

#define NavigationBar_H 65.f
#define TabBar_H 100.f
@interface ListViewController ()
 
 
@property (nonatomic, strong) UITableView *uiTableView;
@property (nonatomic, strong) NSMutableArray* userList;
@property (nonatomic, strong) WeiboFrameVo* userVo;
@property (nonatomic, strong) NSString* curelementName;
@property (nonatomic, strong) NSArray* elementToParse;
@property (nonatomic, assign) BOOL storingFlag;
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
    NSString* netUrl=@"https://webpan.oss-cn-shanghai.aliyuncs.com/res/assets/list.xml";
    netUrl=@"https://webpan.oss-cn-shanghai.aliyuncs.com/res/pan/test/iosmetia/list001.xml";
    [[LoadManager default] loadUrl:netUrl type:LoadManager.XML_TYPE fun:^(NSString* value) {
        NSDictionary* dic=(NSDictionary*)value;
     
        NSString *str=[NSString stringWithContentsOfFile:  dic[@"data"] encoding:NSUTF8StringEncoding error:nil];
        [self meshXmlInfo:str];
    }];
    
    
    
}
-(void)meshXmlInfo:(NSString*)str
{
    //4.解析数据
    //4.1 创建XML解析器:SAX
    self.elementToParse = [[NSArray alloc] initWithObjects: @"text",@"title",@"url", nil];
    NSXMLParser *parser = [[NSXMLParser alloc]initWithData:[str dataUsingEncoding:NSUTF8StringEncoding]];
    
    //4.2 设置代理
    parser.delegate = self;
    
    //4.3 开始解析,阻塞
    [parser parse];
    
}
#pragma mark -
#pragma mark NSXMLParserDelegate

/* 开始解析xml文件，在开始解析xml节点前，通过该方法可以做一些初始化工作 */
- (void)parserDidStartDocument:(NSXMLParser *)parser
{
    NSLog(@"开始解析xml文件");
}

/* 当解析器对象遇到xml的开始标记时，调用这个方法开始解析该节点 */
- (void)parser:(NSXMLParser *)parser didStartElement:(NSString *)elementName namespaceURI:(NSString *)namespaceURI qualifiedName:(NSString *)qName
    attributes:(NSDictionary *)attributeDict
{
    NSLog(@"发现节点");
    //userList
    
    if([elementName isEqualToString:@"Users"])
    {
        self.userList = [[NSMutableArray alloc] init];
    }
    else   if([elementName isEqualToString:@"User"])
    {
        self.userVo = [[WeiboFrameVo alloc] init];
    
//        self.userVo.text=@"显示内容001";

        [self.userList addObject:self.userVo];
    }
    self.curelementName=elementName;
    self.storingFlag= [self.elementToParse containsObject:elementName];
   
    
    
}

/* 当解析器找到开始标记和结束标记之间的字符时，调用这个方法解析当前节点的所有字符 */
- (void)parser:(NSXMLParser *)parser foundCharacters:(NSString *)string
{
    if(self.storingFlag){
        NSLog(@"正在解析节点内容%@-%@",  self.curelementName,string);
        NSLog(@"正在解析节点内容%@-%@",  self.curelementName,string);
        
        
        NSString* b=[self.userVo valueForKey:self.curelementName];
        if([self.userVo valueForKey:self.curelementName]==nil){
            [self.userVo setValue: string forKey:self.curelementName];
        
        }else{
//            [self.userVo setValue: [b stringByAppendingString:string] forKey:self.curelementName];
           
        }
            [self.userVo setWeiboInfo];
       
        
        
        
    }
    
}

/* 当解析器对象遇到xml的结束标记时，调用这个方法完成解析该节点 */
- (void)parser:(NSXMLParser *)parser didEndElement:(NSString *)elementName namespaceURI:(NSString *)namespaceURI qualifiedName:(NSString *)qName
{
    NSLog(@"解析节点结束");
   
}



/* 解析xml文件结束 */
- (void)parserDidEndDocument:(NSXMLParser *)parser
{
    NSLog(@"解析xml文件结束");
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
    [self.navigationController pushViewController:[[ParticleUiViewController alloc]init] animated:YES];
 
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
