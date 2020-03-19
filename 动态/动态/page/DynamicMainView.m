//
//  DynamicMainView.m
//  动态
//
//  Created by zhao on 16/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Header.h"
#import "UIView+XBZKeyBoard.h"
#import "DynamicMainView.h"
#import "TabTittlView.h"
#import "ListPage.h"
#import "MathClass.h"
#import "DynamicBaseVo.h"
#import "NetHttpsManager.h"
#import "DynamicModel.h"
#import "UserInfoVo.h"
#import "AddPanelController.h"


@interface DynamicMainView ()
<
UIImagePickerControllerDelegate,
UINavigationControllerDelegate,
TabTittlViewDelegate,
UIScrollViewDelegate
>

@property(nonatomic,strong)TabTittlView* tabTittlView;
@property(nonatomic,strong)UIScrollView* pageScrollView;
@property(nonatomic,strong)NSMutableArray< ListPage*>* pageItem;


@end

@implementation DynamicMainView

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
    
    self.tabTittlView=[[TabTittlView alloc]init];
    self.tabTittlView.delegate=self;
    [self.view addSubview:self.tabTittlView];
    
    self.navigationController.navigationBar.hidden = NO;  //显示头部
    [self.navigationController setNavigationBarHidden:NO];
    
    
    
 
    [self initBaseUi ];
    
    [[ DynamicModel default] userImport:^(NSDictionary *responseJson) {
         NSLog(@"成功");
          [self initFristData:0];
     }];
}

- (void)clikAddViewEvent;
{

    
    UIImagePickerController *imagePicker = [[UIImagePickerController alloc] init];
      imagePicker.delegate = self;
      imagePicker.sourceType = UIImagePickerControllerSourceTypePhotoLibrary;
      imagePicker.allowsEditing = YES;
      [self presentViewController:imagePicker animated:YES completion:NULL];
    
    
  
}
#pragma mark - UIImagePickerControllerDelegate
- (void)imagePickerController:(UIImagePickerController *)picker didFinishPickingMediaWithInfo:(NSDictionary *)info{
    [picker dismissViewControllerAnimated:YES completion:^{
        NSString *mediaType = [info objectForKey:UIImagePickerControllerMediaType];
        if([mediaType isEqualToString:@"public.movie"]) {
           // [RedBagRoomModel videoPickerController:picker didFinishPickingMediaWithInfo:info redBagRoomVo:self.join_room_id];
        }else{
         [[DynamicModel default] imagePickerController:picker didFinishPickingMediaWithInfo:info bfun:^(NSString* value) {
               [[AddPanelController default] setFristtUrl:value];
               [self.navigationController pushViewController:[AddPanelController default]  animated:YES];
         } progressfun:^(float num) {
             NSLog(@"dd%f",num);
         }];
            [picker dismissViewControllerAnimated:YES completion:NULL];
        }
    }];
}
- (void)selectTabIdx:(int)value
{
    [self.pageScrollView setContentOffset:CGPointMake(CGRectGetWidth(self.pageScrollView.bounds)*value, 0) animated:YES];
    [self initFristData:value];
}
-(void)initFristData:(int)idx;
{
      [self.pageItem[idx] initFristData];
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
    ListPage*   listPage=[[ListPage alloc] initWithFrame:self.view.bounds];
    [self.pageScrollView addSubview: listPage];
    listPage.tabidx=tabIdx;
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
