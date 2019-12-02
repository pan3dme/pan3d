//
//  SceneView.m
//  iosgl
//
//  Created by zhao on 2/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "SceneView.h"
#import "CtxUIView.h"
#import <UIKit/UIKit.h>

@interface SceneView ()

@end

@implementation SceneView

- (void)viewDidLoad {
    [super viewDidLoad];
 self.view.backgroundColor=[UIColor whiteColor];
//   self.view.frame=CGRectMake(0, 0, 375, 667);
 //    self.edgesForExtendedLayout = UIRectEdgeNone;

    
 //   self.navigationController.navigationBar.translucent = NO;
 //   self.tabBarController.tabBar.backgroundColor = [UIColor whiteColor];
   // self.edgesForExtendedLayout = UIRectEdgeNone;
       self.edgesForExtendedLayout = UIRectEdgeTop;
 
    self.title=@"场次名称";
    
    CtxUIView *ctxUI=[[CtxUIView alloc] initWithFrame:_viewbg.bounds];
  //  ctxUI.backgroundColor=[UIColor clearColor];
    [_viewbg addSubview:ctxUI];
    
   ctxUI.autoresizingMask = UIViewAutoresizingFlexibleHeight | UIViewAutoresizingFlexibleWidth;
    
    
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
