//
//  SceneView.m
//  iosgl
//
//  Created by zhao on 2/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "SceneView.h"
#import "CtxUIView.h"
#import "MathCore.h"
#import <UIKit/UIKit.h>
#define kIsiPhoneX_series (iPhoneX==YES || iPhoneX_R ==YES || iPhoneX_Max==YES)
@interface SceneView ()

@end

@implementation SceneView

- (void)viewDidLoad {
    [super viewDidLoad];
   self.view.backgroundColor=[UIColor whiteColor];
//   self.view.frame=CGRectMake(0, 0, 375, 667);
   self.edgesForExtendedLayout = UIRectEdgeNone;
 
 //   self.navigationController.navigationBar.translucent = NO;
   self.tabBarController.tabBar.backgroundColor = [UIColor whiteColor];
  self.edgesForExtendedLayout = UIRectEdgeNone;
       self.edgesForExtendedLayout = UIRectEdgeTop;
 
    self.title=@"场次名称";
    
    
 // _baseViewBg.autoresizingMask = UIViewAutoresizingFlexibleHeight | UIViewAutoresizingFlexibleWidth;

    
    _baseViewBg.frame=CGRectMake(0, 43,kScreenW, kScreenH-320);
  [  self.view addSubview:_baseViewBg];
    
    CtxUIView *ctxUI=[[CtxUIView alloc] initWithFrame:_baseViewBg.bounds];
    ctxUI.backgroundColor=[UIColor clearColor];
    [_baseViewBg addSubview:ctxUI];
    
  ctxUI.autoresizingMask = UIViewAutoresizingFlexibleHeight ;
    
    
 
    
  //  if(kIsiPhoneX_series){  }
    
    if(!self.statusBarView){
                self.statusBarView = [[UIView alloc] initWithFrame:CGRectMake(0, 0, kScreenW, 42)];
                [self.statusBarView setBackgroundColor:RGB(0, 255, 0)];
                [self.view addSubview:self.statusBarView];
            }
    
} 

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
