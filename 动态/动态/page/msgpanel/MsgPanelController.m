//
//  MsgPanelController.m
//  动态
//
//  Created by zhao on 20/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//
#import "Header.h"
#import "DynamicModel.h"
#import "MsgPanelController.h"
#import "DynamicBaseCell.h"
#import "TabelVideoViewCell.h"
#import "TableImageViewCell.h"
#import "DynamicBaseCell.h"
#import "RedBagRefreshGifHeader.h"

@interface MsgPanelController ()
<
UITextFieldDelegate,
UITableViewDelegate,
UITableViewDataSource,
DynamicBaseCellDelegate,
UIScrollViewDelegate
>
@property(nonatomic,strong)UITableView *tabelListView;
@property(nonatomic,strong)UIView *inputViewBg;
@property(nonatomic,strong)UITextField *inputTextField;
@property(nonatomic,strong)UIButton *sendMsgBut;

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
    
    
    self.inputViewBg=[[UIView alloc]init];
    [self.view addSubview:self.inputViewBg];
    
    self.inputTextField=[[UITextField alloc]init];
    self.inputTextField.delegate=self;
    self.inputTextField.placeholder=@"学评论~";
    self.inputTextField.backgroundColor=[UIColor whiteColor];
    [self.inputViewBg addSubview: self.inputTextField];
    
    self.sendMsgBut=[[UIButton alloc]init];
    self.sendMsgBut.backgroundColor=[UIColor blueColor];
    [self.sendMsgBut setTitle:@"发送" forState:UIControlStateNormal];
    [self.inputViewBg addSubview: self.sendMsgBut];
    
    self.inputViewBg.layer.shadowOffset = CGSizeMake(0, 0);
    self.inputViewBg.layer.shadowOpacity = 0.501;
    self.inputViewBg.backgroundColor=RGBOF(0xf1f1f1);
    self.inputViewBg.layer.shadowColor= [ RGBOF(0xbfbfbf) CGColor];
    
    [self.sendMsgBut addGestureRecognizer:[[UITapGestureRecognizer alloc]initWithTarget:self action:@selector(sendMsgButClikEvent:)]];
    
  
}
-(void)sendMsgButClikEvent:(UITapGestureRecognizer *)sender;
{
  
    if( self.inputTextField.text.length){
        NSMutableDictionary* dic=[[NSMutableDictionary alloc]init];
        [dic setObject: [NSString stringWithFormat:@"%d",(int)self.dynamicBaseVo.tabelVo.id] forKey:@"id"];
        [dic setObject:self.inputTextField.text forKey:@"content"];
        [dic setObject:@"0" forKey:@"quote"];
     
        [[ DynamicModel default] basePostToUrl:PLATFORM_GAME_BLOG_COMMENTS paramDict:dic  PostSuccess:^(NSDictionary *responseJson) {
            int codeNum=   [[responseJson valueForKey:@"code"]intValue];
            if(codeNum==0){
                NSLog(@"发送成功");
            }else{
                NSLog(@"发送失败");
              
            }
        }];
       
  
    }
   
    
}
- (void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
    
    [self.tabelListView reloadData];
    
    self.hidesBottomBarWhenPushed=YES;
}
-(void) selectUseHead :(DynamicBaseVo*)value ;
{
    
}
-(void) clikOpenMsgPanel :(DynamicBaseVo*)value ;
{
    
}
-(void) imglistClik :(UITableViewCell*)value idx:(NSInteger)idx;
{
    
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

- (void)viewDidLayoutSubviews;
{
    self.inputViewBg.frame=CGRectMake(0, kScreenH-75, kScreenW, 75);
    self.sendMsgBut.frame=CGRectMake(self.inputViewBg.width-85,  (self.inputViewBg.height-40)/2-5, 70, 40);
    self.inputTextField.frame=CGRectMake(20,  (self.inputViewBg.height-40)/2-5, self.inputViewBg.width-130, 40);
}

@end
