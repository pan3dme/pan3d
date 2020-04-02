//
//  DynamicMainView.m
//  动态
//
//  Created by zhao on 16/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Header.h"
#import "UIView+XBZKeyBoard.h"
#import "Dt_DynamicMainView.h"
#import "Dt_TabTittlView.h"
#import "Dt_ListPage.h"
#import "DynamicBaseVo.h"
#import "NetHttpsManager.h"
#import "Dt_DynamicModel.h"
#import "Dt_UserInfoVo.h"
#import "Dt_MsgPanelController.h"
#import "Dt_AddPanelController.h"


@interface Dt_DynamicMainView ()
<
Dt_ListPageDelegate,
UIImagePickerControllerDelegate,
UINavigationControllerDelegate,
TabTittlViewDelegate,
UIScrollViewDelegate
>

@property(nonatomic,strong)Dt_TabTittlView* tabTittlView;
@property(nonatomic,strong)UIScrollView* pageScrollView;
@property(nonatomic,strong)NSMutableArray< Dt_ListPage*>* pageItem;

@property(nonatomic,strong)Dt_ListPage* selectListPage;
@end

@implementation Dt_DynamicMainView

- (void)viewDidLoad {
    [super viewDidLoad];
    self.title=@"动态";
    
    self.view.backgroundColor=[UIColor whiteColor];
    
    
    self.pageScrollView=[[UIScrollView alloc]initWithFrame:self.view.bounds];
    self.pageScrollView.pagingEnabled=YES;
    self.pageScrollView.delegate=self;
    self.pageScrollView.showsHorizontalScrollIndicator = NO;//水平滚动条
    self.pageScrollView.showsVerticalScrollIndicator = NO;//
    [self.view addSubview:self.pageScrollView];
    
    self.tabTittlView=[[Dt_TabTittlView alloc]init];
    self.tabTittlView.delegate=self;
    [self.view addSubview:self.tabTittlView];
    
    self.navigationController.navigationBar.hidden = NO;  //显示头部
    [self.navigationController setNavigationBarHidden:NO];
    
    
     self.hidesBottomBarWhenPushed=YES;
 
    [self initBaseUi ];
    [self addEvents];
    
    [[ Dt_DynamicModel default] userImport:^(NSDictionary *responseJson) {
         NSLog(@"成功");
          [self initFristData:0];
     }];
}
-(void)addEvents;
{
     [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(refrishCurrentList:) name:@"refrishCurrentList" object:nil];
}
-(void)refrishCurrentList:(NSNotification *)notification
{
 
    NSLog(@"---");
    [self.selectListPage refrishAddNewMsg];
    
}
- (void)clikOpenMsgPanel:(DynamicBaseVo *)value
{
    [Dt_MsgPanelController default].dynamicBaseVo=value;
    [Dt_MsgPanelController default].hidesBottomBarWhenPushed=YES;
    [self.navigationController pushViewController:[Dt_MsgPanelController default]  animated:YES];
    
   
}


- (void)clikAddViewEvent;
{
 
    UIImagePickerController *imagePicker = [[UIImagePickerController alloc] init];
      imagePicker.delegate = self;
      imagePicker.sourceType = UIImagePickerControllerSourceTypePhotoLibrary;
       imagePicker.mediaTypes = [NSArray arrayWithObjects:@"public.movie", @"public.image", nil];
      [self presentViewController:imagePicker animated:YES completion:NULL];
    
 
}
 
#pragma mark - UIImagePickerControllerDelegate
- (void)imagePickerController:(UIImagePickerController *)picker didFinishPickingMediaWithInfo:(NSDictionary *)info{
    [picker dismissViewControllerAnimated:YES completion:^{
 
            
            [[Dt_DynamicModel default] imagePickerController:picker didFinishPickingMediaWithInfo:info bfun:^(NSString* value) {
                           
         
                [[Dt_AddPanelController default] setFristtUrl:value];
                   [self.navigationController pushViewController:[Dt_AddPanelController default]  animated:YES];
                         } progressfun:^(float num) {
                             NSLog(@"dd%f",num);
                         }];
                         [picker dismissViewControllerAnimated:YES completion:NULL];
            
        
        
    
    }];
}
- (void)selectTabIdx:(int)value
{
    [self.pageScrollView setContentOffset:CGPointMake(CGRectGetWidth(self.pageScrollView.bounds)*value, 0) animated:YES];
    [self initFristData:value];
}
-(void)initFristData:(int)idx;
{
    self.selectListPage=self.pageItem[idx];
    [self.selectListPage initFristData];
    
    
}
- (void)scrollViewDidEndDecelerating:(UIScrollView *)scrollView {
    BOOL scrollToScrollStop = !scrollView.tracking && !scrollView.dragging && !scrollView.decelerating;
    if (scrollToScrollStop) {
        int idx= self.pageScrollView.contentOffset.x/self.pageScrollView.width;
        [self.tabTittlView selectTabByIndex:idx  ];
        [self initFristData:idx];
        
    }
}

-(void)initBaseUi;
{
    self.pageItem= [[NSMutableArray alloc]init];
    [self addTempPage:0];
    [self addTempPage:1];
    [self addTempPage:2];
    [self addTempPage:3];
    
   

}

-(void)addTempPage:(NSInteger)tabIdx;
{
    Dt_ListPage*   listPage=[[Dt_ListPage alloc] initWithFrame:self.view.bounds];
    [self.pageScrollView addSubview: listPage];
    listPage.tabidx=tabIdx;
    listPage.delegate=self;
    [self.pageItem addObject:listPage];
 
}

- (void)viewDidLayoutSubviews;
{
    self.tabTittlView.frame=CGRectMake(0, 50*kScaleHeight, kScreenW, 50*kScaleHeight);
    UIScrollView*  sc=self.pageScrollView;
    
    sc.frame=CGRectMake(0, CGRectGetMaxY(self.tabTittlView .frame) , self.view.width, self.view.height-CGRectGetMaxY(self.tabTittlView .frame));
    for(int i=0;i<self.pageItem.count;i++){
        self.pageItem[i].frame=CGRectMake(i*sc.width,0,sc.width,sc.height );
    }
    sc.contentSize= CGSizeMake(self.pageItem.count * sc.width, sc.width );
    
}



@end
