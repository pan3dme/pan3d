//
//  MsgPanelController.m
//  动态
//
//  Created by zhao on 20/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//
#import "Header.h"
#import "Dt_DynamicModel.h"
#import "Dt_MsgPanelController.h"
#import "Dt_DynamicBaseCell.h"
#import "Dt_TabelVideoViewCell.h"
#import "Dt_TableImageViewCell.h"
#import "Dt_DynamicBaseCell.h"
#import "Dt_CommentsCell.h"
#import "Dt_CommentsTabelVo.h"
#import "Dt_RefreshGifHeader.h"

@interface Dt_MsgPanelController ()
<
Dt_CommentsCellDelegate,
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
@property(nonatomic,strong)NSMutableArray *cellItem;

@end
static Dt_MsgPanelController *msgPanelController = nil;
@implementation Dt_MsgPanelController
+ (instancetype)default;
{
    if (msgPanelController == nil) {
        msgPanelController = [[Dt_MsgPanelController alloc] init];
    }
    return msgPanelController;
}
- (void)viewDidLoad {
    [super viewDidLoad];
    
    [self initBaseUi];
}
-(void)initBaseUi;
{
    self.cellItem=[[NSMutableArray alloc] init];
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
    self.inputTextField.placeholder=@"写评论~";
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
-(void) clikCellHear:(Dt_CommentsTabelVo*)value ;
{
    NSLog(@"clikHear");
}
-(void) clikCellMessage:(Dt_CommentsTabelVo*)value ;
{
     NSLog(@"clikMessage");
     self.inputTextField.text=[NSString stringWithFormat:@"@%@ ",value.nick_name];
}
-(void)sendMsgButClikEvent:(UITapGestureRecognizer *)sender;
{
  
    if( self.inputTextField.text.length){
        NSMutableDictionary* dic=[[NSMutableDictionary alloc]init];
        [dic setObject: [NSString stringWithFormat:@"%d",(int)self.dynamicBaseVo.tabelVo.id] forKey:@"id"];
        [dic setObject:self.inputTextField.text forKey:@"content"];
        [dic setObject:@"0" forKey:@"quote"];
     
        [[ Dt_DynamicModel default] basePostToUrl:PLATFORM_GAME_BLOG_COMMENTS paramDict:dic  PostSuccess:^(NSDictionary *responseJson) {
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
       self.hidesBottomBarWhenPushed=YES;
    
    [self.cellItem removeAllObjects];
    [self.cellItem  addObject: self.dynamicBaseVo];
    [self.cellItem  addObject:@"评论"];
   
    [self.tabelListView reloadData];
 
    
     [self getAllComments];
}
-(void)getAllComments;
{
    NSMutableDictionary* dic=[[NSMutableDictionary alloc]init];
       [dic setObject: [NSString stringWithFormat:@"%d",(int)self.dynamicBaseVo.tabelVo.id] forKey:@"id"];
       [dic setObject:@"1" forKey:@"idx_begin"];
       [dic setObject:@"250" forKey:@"idx_end"];
 
    
       [[ Dt_DynamicModel default] basePostToUrl:PLATFORM_GAME_BLOG_GET_COMMENTS paramDict:dic  PostSuccess:^(NSDictionary *responseJson) {
           int codeNum=   [[responseJson valueForKey:@"code"]intValue];
           if(codeNum==0){
               NSMutableArray<Dt_CommentsTabelVo*>* bitem= [Dt_CommentsTabelVo makeListArr:[responseJson valueForKey:@"comments"]];
               for (int i=0; i<bitem.count; i++) {
                   if([bitem[i].quote intValue]==0){
                        [self.cellItem addObject:bitem[i]];
                        [self makeCommentSonList:bitem  temp:bitem[i]];
                   }
               }
               
               [self.tabelListView reloadData];
          
           }else{
               NSLog(@"发送失败");
           }
       }];
   
}
-( void)makeCommentSonList:(NSMutableArray<Dt_CommentsTabelVo*>*)items temp:(Dt_CommentsTabelVo*)temp
{
    temp.sonitem=[[NSMutableArray alloc]init];
    for (int i=0; i<items.count; i++) {
        if(items[i].quote==temp.id){
            [temp.sonitem addObject:items[i]];
        }
    }
    [temp resetreplyContent];
    
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
    if( [self.cellItem[indexPath.row] isKindOfClass:[DynamicBaseVo class]] )
    {
        DynamicBaseVo* dynamicBaseVo=(DynamicBaseVo*)self.cellItem[indexPath.row];
        return  dynamicBaseVo.cellHeight;
    }
    if( [self.cellItem[indexPath.row] isKindOfClass:[Dt_CommentsTabelVo class]] )
      {
           Dt_CommentsTabelVo* commentsTabelVo=(Dt_CommentsTabelVo*)self.cellItem[indexPath.row];
            return  commentsTabelVo.cellHeight;
      }
    if( [self.cellItem[indexPath.row] isKindOfClass:[NSString class]] )
    {
        return 35;
      }
    
    return   200;
}
-(NSInteger) numberOfSectionsInTableView:(UITableView *)tableView{
    return 1;
}
-(NSInteger) tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section{
    return self.cellItem.count; //数量
}

- (void)touchesBegan:(NSSet *)touches withEvent:(UIEvent *)event
{
    [self.inputTextField resignFirstResponder];
}
-(UITableViewCell*) tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    UITableViewCell *cell;
    if( [self.cellItem[indexPath.row] isKindOfClass:[DynamicBaseVo class]] )
    {
        DynamicBaseVo* dynamicBaseVo=(DynamicBaseVo*)self.cellItem[indexPath.row];
        Dt_DynamicBaseCell* dynamicBaseCell;
        if(dynamicBaseVo.tabelVo.vidio_url.length){
            dynamicBaseCell= [Dt_TabelVideoViewCell makeViewCell:tableView dataVo:dynamicBaseVo];
        }else{
            dynamicBaseCell= [Dt_TableImageViewCell makeViewCell:tableView dataVo:dynamicBaseVo];
        }
        dynamicBaseCell.delegate=self;
        
        cell=dynamicBaseCell;
        
    }
    if( [self.cellItem[indexPath.row] isKindOfClass:[Dt_CommentsTabelVo class]] )
    {
        Dt_CommentsCell*   commentsCell= [Dt_CommentsCell makeViewCell:tableView dataVo:self.cellItem[indexPath.row]];
        
        commentsCell.delegate=self;
        cell=commentsCell;
        
    }
    if( [self.cellItem[indexPath.row] isKindOfClass:[NSString class]] )
    {
        cell=[[UITableViewCell alloc]init];
        cell.backgroundColor=RGBOF(0xf1f1f1);
        cell.textLabel.text=@"评论";
            cell.selectionStyle = UITableViewCellSelectionStyleNone;
        
    }
    
    return cell;
    
}




//使用红圈加载
-(void)makeRefreshHeaderGf;
{
    Dt_RefreshGifHeader *header = [Dt_RefreshGifHeader headerWithRefreshingBlock:^{
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
