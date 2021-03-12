//
//  ListViewController.m
//  iosgl
//
//  Created by pan3dme on 2021/3/12.
//  Copyright © 2021 zhao. All rights reserved.
//

#import "ListViewController.h"

@interface ListViewController ()
@property (nonatomic ,strong) UIView *baseBoxSprite;
 
@property (nonatomic ,strong) UIView *statusBar;
@end

@implementation ListViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    self.baseBoxSprite=[[UIView alloc]init];
    self.baseBoxSprite.backgroundColor=[UIColor grayColor];
    [self.view addSubview: self.baseBoxSprite];
    
    
    [self setupStatusBarColor:[UIColor whiteColor]];

}
- (void)viewDidLayoutSubviews
{
 
    CGFloat   th = [UIApplication sharedApplication].windows.firstObject.windowScene.statusBarManager.statusBarFrame.size.height;
    
    
    self.baseBoxSprite.frame=CGRectMake(0.f, th, self.view.bounds.size.width-0.f, self.view.bounds.size.height-th*2);
    
 
}

- (void)setupStatusBarColor:(UIColor *)color
{
    if (@available(iOS 13.0, *)) {
          if (!_statusBar) {
              UIWindow *keyWindow = [UIApplication sharedApplication].windows[0];
              _statusBar = [[UIView alloc] initWithFrame:keyWindow.windowScene.statusBarManager.statusBarFrame];
              [keyWindow addSubview:_statusBar];
          }
      } else {
        _statusBar = [[[UIApplication sharedApplication] valueForKey:@"statusBarWindow"] valueForKey:@"statusBar"];
     }
      if ([_statusBar respondsToSelector:@selector(setBackgroundColor:)]) {
          _statusBar.backgroundColor = color;
      }
}



  
@end
